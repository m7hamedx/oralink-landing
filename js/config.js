/* =============================================================================
   OraLink Landing — CENTRAL CONFIGURATION FILE
   -----------------------------------------------------------------------------
   This page is ONLY a gateway. It contains NO code from the two existing sites,
   no iframes, no API calls, no shared auth — just plain <a href> links.
   Everything you may ever need to change lives in THIS file.

   1) SITES    → the real URLs of the two existing websites.
   2) ROUTES   → which site each button / card / audience goes to.
   3) IMAGES   → swap the placeholder photos in one place.
   4) SOCIAL   → footer social links (replace with your real profiles).
   ========================================================================== */

/* --- 1) The two existing websites (change a URL here after deployment) -----
   PUBLIC links (Cloudflare quick tunnels → the dev servers on this PC):
     • Academic → https://belly-cnet-rivers-pharmacology.trycloudflare.com (→ localhost:3000)
     • Clinics  → https://internship-crop-ian-revealed.trycloudflare.com (→ localhost:3001)
   NOTE: quick-tunnel URLs change whenever the tunnels restart — if the buttons
   stop working, restart the tunnels and paste the new URLs here.
   Local dev setup (run each project in its own terminal):
     • Academic → folder: "oralink-master (2)/oralink-master"  → npm run dev     → http://localhost:3000
     • Clinics  → folder: "omniroute/denta-care"               → npm run dev -- -p 3001 → http://localhost:3001
   (The clinics project is started with -p 3001 so it never clashes with 3000;
    the landing page itself runs on 3002.) */
const SITES = {
  academic: {
    name: "OraLink Academic",
    url: "https://belly-cnet-rivers-pharmacology.trycloudflare.com", // local: http://localhost:3000
    audience: "Students, Doctors, HODs, Supervisors, Admins"
  },
  clinics: {
    name: "OraLink Clinics",
    url: "https://internship-crop-ian-revealed.trycloudflare.com", // local: http://localhost:3001
    audience: "External clinic doctors"
  }
};

/* --- 2) Routing map: audience/button → site key ---------------------------
   Change a value only (never the key) to re-route that button instantly.
   Every link on the page is built from SITES + ROUTES — nothing is hardcoded. */
const ROUTES = {
  patients: "clinics",        // TODO: change if patients get their own site
  students: "academic",
  externalClinics: "clinics",
  heroPrimary: "academic",
  heroSecondary: "clinics",
  academicCta: "academic",
  clinicCta: "clinics",
  aiCta: "academic",          // AI/X-ray features live in the academic system
  bookAppointment: "clinics", // spare key — attach via data-route="bookAppointment"
  finalCtaA: "academic",
  finalCtaB: "clinics"
};

/* --- 3) Behaviour flags --------------------------------------------------- */
const OPEN_IN_NEW_TAB = false; // if true → target="_blank" rel="noopener noreferrer"
const PATIENTS_COMING_SOON = false; // if true → patients card shows a "Coming soon"
                                    // badge and is no longer a link

/* --- 4) Images (Unsplash placeholders — replace with your own) ------------
   Tip: keep the same keys, only change the URL. Use ?auto=format&fit=crop&w=…
   for fast, optimised delivery. */
const IMAGES = {
  // Hero: two dentists performing a procedure
  hero: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1920&q=80",
  // "Choose your path" cards
  pathPatients: "https://plus.unsplash.com/premium_photo-1682097288491-7e926a30cd0b?auto=format&fit=crop&w=900&q=80",
  pathStudents: "https://plus.unsplash.com/premium_photo-1733317206347-e6eeea03bf41?auto=format&fit=crop&w=900&q=80",
  pathClinics: "https://plus.unsplash.com/premium_photo-1682145291930-43b73e27446e?auto=format&fit=crop&w=900&q=80",
  // Academic section: students practising on a dental mannequin
  academic: "https://images.unsplash.com/photo-1758205307854-5f0b57c27f17?auto=format&fit=crop&w=1400&q=80",
  // Clinics section: modern dental room
  clinic: "https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=1400&q=80",
  // AI section: x-ray mock thumbnails
  xray1: "https://images.unsplash.com/photo-1777445374290-eedda5be8e5b?auto=format&fit=crop&w=600&q=80",
  xray2: "https://images.unsplash.com/photo-1522849696084-818b29dfe210?auto=format&fit=crop&w=600&q=80"
};

/* --- 5) Social links (placeholders — swap with your real profiles) -------- */
const SOCIAL = [
  { key: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/" },
  { key: "x",        name: "X",       url: "https://x.com/" },
  { key: "youtube",  name: "YouTube", url: "https://www.youtube.com/" }
];

/* =============================================================================
   ENGINE — do not edit below this line unless you know what you are doing.
   ========================================================================== */

/**
 * Resolve a ROUTES key ("heroPrimary", "students", …) into its SITES entry.
 * Returns null (and warns) when the configuration is inconsistent.
 */
function siteFor(routeKey) {
  const siteKey = ROUTES[routeKey];
  const site = SITES[siteKey];
  if (!site) {
    console.error(
      "[OraLink] Routing error: ROUTES." + routeKey + ' → "' + siteKey +
      '" has no matching entry in SITES.'
    );
    return null;
  }
  return site;
}

/** Resolve a ROUTES key into the destination URL string. */
function urlFor(routeKey) {
  const site = siteFor(routeKey);
  return site ? site.url : null;
}
