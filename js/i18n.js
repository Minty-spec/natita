/* ============================================================================
 *  i18n.js  —  Language layer (EN ⇄ RU)
 * ----------------------------------------------------------------------------
 *  Reads CONFIG.i18n[lang] and writes the active strings into the live CONFIG
 *  fields that the renderers already read. That way nothing else has to know
 *  about languages — we just rebuild the desktop after switching.
 *
 *    Lang.apply("ru")   -> fill CONFIG with Russian text (no re-render)
 *    Lang.toggle()      -> flip language + rebuild everything on screen
 *    Lang.other()       -> label for the OTHER language (for the button)
 * ========================================================================== */

const Lang = {
  current: "en",

  /** Copy ONLY the interface strings for `lang` into live CONFIG.
   *  Personal content (bio, tagline, facts values, projects, handles,
   *  contact values) is never touched. */
  apply(lang){
    const cfg = window.CONFIG;
    const T = cfg.i18n[lang] || cfg.i18n.en;
    this.current = cfg.i18n[lang] ? lang : "en";

    /* app labels (navigation) */
    cfg.apps.forEach(app => {
      if(T.apps[app.id]) app.label = T.apps[app.id];
      if(app.id === "discord" && T.discord) this._fillLink(app, T.discord);
      if(app.id === "roblox"  && T.roblox)  this._fillLink(app, T.roblox);
    });

    /* About Me: window title + the fact LABELS (values stay) */
    cfg.about.title = T.aboutTitle;
    cfg.about.facts.forEach((f, i) => { if(T.factLabels[i] != null) f.label = T.factLabels[i]; });

    /* section headings */
    cfg.projectsHead = { ...T.projectsHead };
    cfg.socialsHead  = { ...T.socialsHead };

    /* Contact: title/intro + method LABELS (values stay) */
    cfg.contact.title = T.contact.title;
    cfg.contact.intro = T.contact.intro;
    cfg.contact.methods.forEach((m, i) => { if(T.contact.methodLabels[i] != null) m.label = T.contact.methodLabels[i]; });

    /* static chrome text */
    this._setText(".miniscreen__hint", T.ui.powerHint);
    this._setText(".step-back__label", T.ui.stepBack);
    this._setText(".topbar__os", T.ui.os);
    document.querySelectorAll(".lang-toggle").forEach(b => b.textContent = T.ui.toggle);
    document.querySelectorAll(".langchip__text").forEach(b => b.textContent = T.ui.toggle);
    document.documentElement.setAttribute("lang", this.current);
  },

  /** Only the interface bits of a link app — handles/urls stay content. */
  _fillLink(app, t){
    const d = app.data || (app.data = {});
    d.subtitle = t.subtitle;
    d.button   = t.button;
    if(d.primary)   d.primary.detail   = t.primaryDetail;
    if(d.secondary) d.secondary.detail = t.secondaryDetail;
  },

  /** Label shown on the toggle = the language you'd switch TO. */
  other(){
    const T = window.CONFIG.i18n[this.current] || window.CONFIG.i18n.en;
    return T.ui.toggle;
  },

  /** Flip language and refresh everything already on screen. */
  toggle(){
    this.apply(this.current === "en" ? "ru" : "en");
    if(window.Desktop) Desktop.build();   // profile, icons, dock
    if(window.WM && WM.rerender) WM.rerender(); // any open windows
  },

  _setText(sel, text){
    const el = document.querySelector(sel);
    if(el) el.textContent = text;
  },
};

window.Lang = Lang;
