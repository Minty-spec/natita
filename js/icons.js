/* ============================================================================
 *  icons.js  —  SVG icon registry
 * ----------------------------------------------------------------------------
 *  Add a new icon by adding a key here, then reference it from config.js
 *  (icon: "yourKey"). Each value is an inline SVG string.
 * ========================================================================== */

const ICONS = {
  about: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg>`,

  projects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>`,

  socials: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.6 10.6 15.4 7.4M8.6 13.4l6.8 3.2"/></svg>`,

  contact: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,

  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.9A19.8 19.8 0 0 0 15.4 3.3a.07.07 0 0 0-.08.04c-.21.38-.44.87-.6 1.26a18.3 18.3 0 0 0-5.44 0 12.6 12.6 0 0 0-.62-1.26.08.08 0 0 0-.08-.04A19.7 19.7 0 0 0 3.7 4.9a.07.07 0 0 0-.03.03C.57 9.5-.28 14 .14 18.4a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13 13 0 0 1-1.87-.9.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .09.04 19.8 19.8 0 0 0 6.01-3.04.08.08 0 0 0 .03-.05c.5-5.18-.84-9.65-3.54-13.47a.06.06 0 0 0-.03-.03ZM8.02 15.7c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.22 0 2.18 1.1 2.16 2.42 0 1.33-.94 2.42-2.16 2.42Z"/></svg>`,

  roblox: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.9 2 2 18.3 19.1 22 22 5.7 4.9 2Zm7.8 12.6-3.9-.84.84-3.9 3.9.84-.84 3.9Z"/></svg>`,

  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.3a3 3 0 0 0-2.1-2.1C19 4.7 12 4.7 12 4.7s-7 0-8.9.5A3 3 0 0 0 1 7.3 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.7a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.3ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>`,

  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>`,

  // mini-app glyphs
  mayo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v2a2 2 0 0 0 1 1.7A4 4 0 0 1 18 10v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8a4 4 0 0 1 2-3.3A2 2 0 0 0 9 5z"/><path d="M6 11h12"/></svg>`,
  oracle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="7"/><path d="M6 19h12"/><path d="M9.3 7.8A3.3 3.3 0 0 1 12.5 6"/></svg>`,
  paint: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 4 5 5L9 20l-5 1 1-5z"/><path d="m12.5 6.5 5 5"/></svg>`,

  // UI glyphs
  power: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v9"/><path d="M6.4 7.4a8 8 0 1 0 11.2 0"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>`,
};

function getIcon(key) {
  return ICONS[key] || ICONS.link;
}

window.ICONS = ICONS;
window.getIcon = getIcon;
