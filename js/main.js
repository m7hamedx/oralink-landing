/* =============================================================================
   OraLink Landing — ENGINE (routing, i18n, motion, UI behaviour)
   Reads its configuration from js/config.js and js/i18n.js.
   No iframes, no API calls to the destination sites — plain hyperlinks only.
   ========================================================================== */

(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var LS_LANG = "oralink-lang";

  /* ==========================================================================
     1) ROUTING — every external link is built from SITES + ROUTES
     ======================================================================= */
  function applyRoutes() {
    $$("[data-route]").forEach(function (el) {
      var key = el.getAttribute("data-route");
      var site = siteFor(key);

      /* "Coming soon" mode: patients card is not a link at all */
      if (PATIENTS_COMING_SOON && key === "patients") {
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-soon");
        var badge = el.querySelector("[data-soon]");
        if (badge) badge.removeAttribute("hidden");
        return;
      }

      if (!site) {                    /* broken config → no dead "#" link */
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        return;
      }

      el.setAttribute("href", site.url);
      el.setAttribute("title", site.name);
      el.setAttribute("data-site", ROUTES[key]);
      el.setAttribute("data-audience", site.audience || "");

      if (OPEN_IN_NEW_TAB) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
        var note = document.createElement("span");
        note.className = "sr-only";
        note.setAttribute("data-i18n", "nav.newTab");
        note.textContent = t("nav.newTab");
        el.appendChild(note);
      }
    });
  }

  /* ==========================================================================
     2) IMAGES — filled from the IMAGES config (one place to swap photos)
     ======================================================================= */
  function applyImages() {
    $$("[data-img]").forEach(function (el) {
      var key = el.getAttribute("data-img");
      var url = IMAGES[key];
      if (!url) { console.warn('[OraLink] No image configured for data-img="' + key + '"'); return; }
      el.addEventListener("error", function () { el.classList.add("img-failed"); }, { once: true });
      el.setAttribute("src", url);
    });
  }

  /* ==========================================================================
     3) SOCIAL — rendered from the SOCIAL config
     ======================================================================= */
  function renderSocial() {
    var list = $("#socialList");
    if (!list || typeof SOCIAL === "undefined") return;
    SOCIAL.forEach(function (item) {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.href = item.url;
      a.className = "grid h-9 w-9 place-items-center rounded-full bg-navy-900/5 text-navy-700 transition hover:bg-medical-500 hover:text-white";
      a.setAttribute("aria-label", item.name);
      a.setAttribute("title", item.name);
      if (OPEN_IN_NEW_TAB) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener noreferrer"); }
      a.innerHTML = '<svg class="h-4 w-4" aria-hidden="true"><use href="#i-' + item.key + '"></use></svg>';
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ==========================================================================
     4) I18N — Arabic (default) is harvested from the inline HTML,
        English comes from I18N.en in js/i18n.js.
     ======================================================================= */
  var harvested = { text: {} };

  function harvestArabic() {
    $$("[data-i18n]").forEach(function (el) {
      harvested.text[el.getAttribute("data-i18n")] = el.textContent.trim();
    });
    $$("[data-i18n-content]").forEach(function (el) {
      harvested.text[el.getAttribute("data-i18n-content")] = el.getAttribute("content");
    });
    $$("[data-i18n-alt]").forEach(function (el) {
      harvested.text[el.getAttribute("data-i18n-alt")] = el.getAttribute("alt");
    });
    $$("[data-i18n-aria]").forEach(function (el) {
      harvested.text[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label");
    });
    I18N.ar = harvested.text;   /* complete Arabic dictionary, sourced from the page */
  }

  var missingWarned = {};
  function t(key, lang) {
    lang = lang || currentLang;
    var dict = I18N[lang] || {};
    if (dict[key] != null && dict[key] !== "") return dict[key];
    if (harvested.text[key] != null) return harvested.text[key];   /* fall back to Arabic */
    if (!missingWarned[key]) {
      missingWarned[key] = true;
      console.warn('[OraLink] Missing translation for key "' + key + '" (' + lang + ")");
    }
    return key;
  }

  var currentLang = "ar";

  function applyLang(lang) {
    if (lang !== "ar" && lang !== "en") lang = "ar";
    currentLang = lang;

    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";

    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-content]").forEach(function (el) { el.setAttribute("content", t(el.getAttribute("data-i18n-content"))); });
    $$("[data-i18n-alt]").forEach(function (el) { el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"))); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });

    $$(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    syncMenuLabel();
    try { localStorage.setItem(LS_LANG, lang); } catch (e) { /* private mode */ }
  }

  function initLang() {
    harvestArabic();
    var saved = "ar";
    try { saved = localStorage.getItem(LS_LANG) || "ar"; } catch (e) { /* ignore */ }
    applyLang(saved);
    $$(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang")); });
    });
  }

  /* ==========================================================================
     5) NAVBAR — scrolled state, mobile menu, "For You" dropdown, active link
     ======================================================================= */
  var header = $("#siteHeader");
  var menuBtn = $("#menuBtn");
  var mobileMenu = $("#mobileMenu");
  var forYouBtn = $("#forYouBtn");
  var forYouMenu = $("#forYouMenu");
  var menuOpen = false;

  function syncMenuLabel() {
    if (!menuBtn) return;
    menuBtn.setAttribute("aria-label", t(menuOpen ? "nav.closeMenu" : "nav.openMenu"));
  }

  function onScroll() {
    var y = window.pageYOffset;
    header.classList.toggle("is-scrolled", y > 12);
    header.classList.toggle("at-top", y <= 12);
    updateActiveNav(y);
  }

  function closeMobileMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    mobileMenu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
    header.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    syncMenuLabel();
  }

  function initNav() {
    if (!header) return;

    menuBtn.addEventListener("click", function () {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle("hidden", !menuOpen);
      menuBtn.setAttribute("aria-expanded", menuOpen ? "true" : "false");
      header.classList.toggle("is-open", menuOpen);
      document.body.classList.toggle("no-scroll", menuOpen);
      syncMenuLabel();
    });

    $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeMobileMenu); });

    /* "For You" dropdown */
    if (forYouBtn && forYouMenu) {
      forYouBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = forYouMenu.classList.toggle("is-open");
        forYouBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (!forYouMenu.classList.contains("is-open")) return;
        if (forYouMenu.contains(e.target) || forYouBtn.contains(e.target)) return;
        forYouMenu.classList.remove("is-open");
        forYouBtn.setAttribute("aria-expanded", "false");
      });
      $$("#forYouMenu a").forEach(function (a) {
        a.addEventListener("click", function () {
          forYouMenu.classList.remove("is-open");
          forYouBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeMobileMenu();
      if (forYouMenu && forYouMenu.classList.contains("is-open")) {
        forYouMenu.classList.remove("is-open");
        forYouBtn.setAttribute("aria-expanded", "false");
        forYouBtn.focus();
      }
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Active nav link while scrolling */
  var SECTION_TO_NAV = {
    home: "home",
    about: "about",
    "for-you": "for-you",
    clinics: "clinics",
    features: "features",
    contact: "contact"
  };
  var lastActive = "";

  function updateActiveNav(y) {
    var key = "home";
    Object.keys(SECTION_TO_NAV).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec && sec.getBoundingClientRect().top <= 110) key = SECTION_TO_NAV[id];
    });
    /* page bottom → footer/contact is active */
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) key = "contact";
    if (key === lastActive) return;
    lastActive = key;
    $$("[data-nav]").forEach(function (el) {
      var keys = el.getAttribute("data-nav").split(/\s+/);
      el.classList.toggle("is-active", keys.indexOf(key) !== -1);
    });
  }

  /* ==========================================================================
     6) MOTION — reveal on scroll + count-up stats (both respect reduced motion)
     ======================================================================= */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || REDUCED_MOTION) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;
    if (REDUCED_MOTION) { el.textContent = target + suffix; return; }
    var duration = 1500, start = null;
    function tick(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var counters = $$("[data-count]");
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================================
     7) AI demo card — expandable "report" (clearly a preliminary preview)
     ======================================================================= */
  function initReportToggle() {
    var btn = $("#reportBtn"), panel = $("#reportPanel");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = panel.hasAttribute("hidden");
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ==========================================================================
     BOOT
     ======================================================================= */
  applyImages();
  renderSocial();
  initLang();          /* harvests Arabic, applies saved/default language */
  applyRoutes();
  initNav();
  initReveal();
  initCounters();
  initReportToggle();
})();
