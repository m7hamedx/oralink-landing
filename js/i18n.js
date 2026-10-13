/* =============================================================================
   OraLink Landing — TRANSLATIONS
   -----------------------------------------------------------------------------
   • ARABIC is the default language and lives INLINE in index.html (so the page
     paints instantly, works without JavaScript, and is indexable in Arabic).
     At startup, main.js harvests the inline Arabic strings into I18N.ar.
   • ENGLISH lives here. Add / edit any string below — keys must match the
     data-i18n="…" attributes used in index.html.

   Quick map of key prefixes:
     meta.*   → <title> and meta/OG tags      nav.*  → navbar
     hero.*   → hero section                  path.* → "Choose your path"
     academic.* → academic section            clinics.* → clinics section
     ai.*     → AI section                    stats.* → statistics
     cta.*    → final call-to-action box      footer.* → footer
   ========================================================================== */

const I18N = {
  en: {
    /* ---- document metadata ---- */
    "meta.title": "OraLink — Digital Dentistry Platform | Academia & Clinics",
    "meta.description": "OraLink connects patients, students, doctors, supervisors and external clinics through one smarter digital experience — academic portal, clinic management and AI-assisted dentistry.",
    "meta.locale": "en_US",

    /* ---- navbar ---- */
    "nav.main": "Main navigation",
    "nav.logo": "OraLink — home",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.features": "Features",
    "nav.forYou": "For You",
    "nav.contact": "Contact",
    "nav.academicItem": "For Students & Academics",
    "nav.clinicsItem": "For External Clinics",
    "nav.getStarted": "Get Started",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.langSwitch": "Switch language",
    "nav.skip": "Skip to main content",
    "nav.newTab": "(opens in a new tab)",
    "nav.footerNav": "Footer navigation",
    "nav.sections": "Page sections",

    /* ---- hero ---- */
    "hero.eyebrow": "DIGITAL DENTISTRY. REAL IMPACT.",
    "hero.title1": "From Learning",
    "hero.title2": "to Patient Care.",
    "hero.title3": "All in One Platform.",
    "hero.sub": "OraLink connects patients, students, doctors and academic supervisors through a smarter, faster digital experience.",
    "hero.ctaPrimary": "Go to Academic Portal",
    "hero.ctaSecondary": "Go to Clinics Portal",
    "hero.chip1": "AI-Powered Assistant",
    "hero.chip2": "Digital X-rays & Reports",
    "hero.chip3": "Integrated Patient Records",
    "hero.chip4": "Academic & Clinical Management",
    "hero.bgAlt": "Two dentists performing a dental procedure in a modern clinic",
    "hero.ai.title": "AI Assistant",
    "hero.ai.beta": "Beta",
    "hero.ai.message": "Hi! I'm your OraLink assistant. How can I help you today?",
    "hero.ai.row1": "Book an appointment",
    "hero.ai.row2": "Check available slots",
    "hero.ai.row3": "Get X-ray insights",
    "hero.ai.row4": "General dental questions",

    /* ---- choose your path ---- */
    "path.eyebrow": "CHOOSE YOUR PATH",
    "path.title1": "Different Needs.",
    "path.title2": "One Platform.",
    "path.desc": "Whether you're a patient, a student, or part of our academic or clinical team — OraLink gives you the right tools, in one place.",
    "path.explore": "Explore All Services",
    "path.soon": "Coming soon",
    "path.helperTitle": "Which one is for me?",
    "path.helperLine1": "The Academic portal is for students, doctors, supervisors, HODs and admins.",
    "path.helperLine2": "The Clinics portal is for external clinic doctors.",
    "path.patients.title": "Patients",
    "path.patients.b1": "Book appointments",
    "path.patients.b2": "View treatment plans",
    "path.patients.b3": "Track your follow-ups",
    "path.patients.alt": "A patient smiling during a dental examination chairside",
    "path.students.title": "Students & Academic",
    "path.students.b1": "Manage cases",
    "path.students.b2": "Upload treatments",
    "path.students.b3": "Track performance & feedback",
    "path.students.alt": "Medical students reviewing clinical cases together at a table",
    "path.clinics.title": "External Clinics",
    "path.clinics.b1": "Clinic appointments",
    "path.clinics.b2": "Patient management",
    "path.clinics.b3": "Clinical workflow",
    "path.clinics.alt": "A modern, well-equipped dental clinic room",

    /* ---- academic section ---- */
    "academic.eyebrow": "FOR ACADEMIC & STUDENTS",
    "academic.title": "Your Academic Journey, Digitally.",
    "academic.desc": "Access your courses, cases, schedules and get supervisor feedback — all in one place.",
    "academic.cta": "Go to Academic Portal",
    "academic.imageAlt": "Dental students practising a procedure on a training mannequin",
    "academic.t1.title": "Case Management",
    "academic.t1.desc": "Track and submit cases",
    "academic.t2.title": "Schedules & Calendars",
    "academic.t2.desc": "Your daily academic plan",
    "academic.t3.title": "Supervisor Feedback",
    "academic.t3.desc": "Improve. Grow. Succeed.",
    "academic.t4.title": "Course Materials",
    "academic.t4.desc": "Lectures & resources",
    "academic.t5.title": "Student Performance",
    "academic.t5.desc": "Track your progress",

    /* ---- external clinics section ---- */
    "clinics.eyebrow": "FOR EXTERNAL CLINICS",
    "clinics.title1": "Quality Care.",
    "clinics.title2": "Efficiently Managed.",
    "clinics.desc": "Streamline your clinic operations, manage patients, and keep everything organized — from booking to follow-up.",
    "clinics.cta": "Explore Clinic Services",
    "clinics.imageAlt": "Bright modern dental clinic interior with a treatment chair",
    "clinics.r1.title": "Appointment Booking",
    "clinics.r1.desc": "Real-time availability",
    "clinics.r2.title": "Patient Records",
    "clinics.r2.desc": "Secure & centralized",
    "clinics.r3.title": "Treatment Plans",
    "clinics.r3.desc": "Personalized care",
    "clinics.r4.title": "Follow-ups & Reminders",
    "clinics.r4.desc": "Better outcomes",

    /* ---- AI section ---- */
    "ai.eyebrow": "POWERED BY INNOVATION",
    "ai.title1": "AI That Works",
    "ai.title2": "for Better Smiles.",
    "ai.desc": "From preliminary X-ray analysis to smart chat support, OraLink's AI helps patients, students and doctors make faster, better decisions — and focus on what really matters: care.",
    "ai.cta": "Discover Our AI Features",
    "ai.cardTitle": "AI X-ray Analysis",
    "ai.demoBadge": "PRELIMINARY DEMO",
    "ai.prelim": "Preliminary result:",
    "ai.status": "No obvious issues detected",
    "ai.viewReport": "View Report",
    "ai.f1.label": "Caries",
    "ai.f1.value": "Clear",
    "ai.f2.label": "Periodontal bone",
    "ai.f2.value": "Clear",
    "ai.f3.label": "Impacted teeth",
    "ai.f3.value": "None",
    "ai.f4.label": "Other findings",
    "ai.f4.value": "None",
    "ai.disclaimer": "Demo preview with preliminary results — not a substitute for a professional diagnosis.",
    "ai.xrayAlt1": "Panoramic dental X-ray showing teeth and jawbone",
    "ai.xrayAlt2": "Close-up dental X-ray of the teeth",

    /* ---- stats ---- */
    "stats.s1.label": "Patients Served",
    "stats.s2.label": "Students & Faculty",
    "stats.s3.label": "Clinics & Departments",
    "stats.s4.label": "AI Assistant",
    "stats.listLabel": "OraLink in numbers",

    /* ---- final CTA ---- */
    "cta.title": "Ready to get started?",
    "cta.desc": "Join OraLink today and experience a smarter way to manage dental care, education, and clinics.",
    "cta.btnA": "Go to Academic Portal",
    "cta.btnB": "Go to Clinics Portal",

    /* ---- footer ---- */
    "footer.tagline": "Smarter Care · Stronger Connections",
    "footer.rights": "© 2025 OraLink. All rights reserved.",
    "footer.socialLabel": "OraLink on social media"
  }
};
