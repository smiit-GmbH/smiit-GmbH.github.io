// Client state that must be known before the first paint of the static HTML.
//
// The consent banner and the home intro overlay are part of the exported
// HTML, so they paint immediately instead of popping in after hydration
// (which made the banner text the page's LCP element). This inline script
// runs in <head> before the body is parsed and flags visitors that already
// decided / already saw the intro; globals.css hides the elements for them.

import { CONSENT_STORAGE_KEY } from "@/lib/gtag"

/** sessionStorage flag: the intro overlay has been shown in this tab session. */
export const INTRO_SEEN_KEY = "smiit-intro-seen"

export const FIRST_PAINT_SCRIPT = `(function(){var d=document.documentElement;try{var c=localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});if(c==="granted"||c==="denied")d.setAttribute("data-consent",c)}catch(e){}try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)}))d.setAttribute("data-intro-seen","")}catch(e){}})()`
