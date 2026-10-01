/* ============================================================================
 *  desktop.js  —  Builds the desktop environment (profile, icons, dock, clock)
 * ----------------------------------------------------------------------------
 *  Reads CONFIG and renders everything into the OS screen. Icon/dock clicks
 *  open windows through the window manager (WM).
 * ========================================================================== */

/** Profile picture markup. Falls back to an initial if the image is missing,
 *  so the real photo can be dropped in later with no code changes. */
function renderPfp(size){
  const o = window.CONFIG.owner;
  const px = size || 66;
  return `
    <span class="pfp" style="width:${px}px;height:${px}px">
      <span class="pfp__initial" style="font-size:${Math.round(px*0.42)}px">${esc(o.imageFallbackInitial||"N")}</span>
      <img src="${esc(o.image)}" alt="${esc(o.name)}" onerror="this.remove()" />
      <span class="pfp__status" data-status="${esc(o.status)}"></span>
    </span>`;
}
window.renderPfp = renderPfp;

const Desktop = {
  build(){
    const cfg = window.CONFIG;

    /* profile widget */
    const prof = document.getElementById("profile");
    prof.innerHTML = `
      ${renderPfp(66)}
      <div class="profile__meta">
        <h2>${esc(cfg.owner.name)}</h2>
        <p>${esc(cfg.owner.tagline)}</p>
      </div>`;

    /* desktop icons */
    const icons = document.getElementById("icons");
    icons.innerHTML = "";
    cfg.apps.forEach((app,i)=>{
      const el = document.createElement("div");
      el.className = "icon";
      el.style.animationDelay = (0.35 + i*0.06) + "s";
      el.style.setProperty("--accent", app.accent);
      el.innerHTML = `
        <span class="icon__badge">${getIcon(app.icon)}</span>
        <span class="icon__label">${esc(app.label)}</span>`;
      el.addEventListener("click", ()=> WM.open(app));
      icons.appendChild(el);
    });

    /* dock */
    const dock = document.getElementById("dock");
    dock.innerHTML = "";
    cfg.apps.forEach(app=>{
      const it = document.createElement("div");
      it.className = "dock__item";
      it.dataset.id = app.id;
      it.style.setProperty("--accent", app.accent);
      it.innerHTML = `${getIcon(app.icon)}<span class="dock__tip">${esc(app.label)}</span>`;
      it.addEventListener("click", ()=> WM.open(app));
      dock.appendChild(it);
    });

    /* keep dock active-dots in sync with open windows */
    WM.onChange = (openIds)=>{
      dock.querySelectorAll(".dock__item").forEach(it=>{
        it.classList.toggle("active", openIds.includes(it.dataset.id));
      });
    };

    /* boot logo = owner avatar (no more "N") */
    const bootLogo = document.querySelector(".boot__logo");
    if(bootLogo){
      bootLogo.innerHTML =
        `<img src="${esc(cfg.owner.image)}" alt="" onerror="this.remove()" />`;
    }

    this._startClock();
  },

  _startClock(){
    const el = document.getElementById("clock");
    const tick = ()=>{
      const d = new Date();
      el.textContent = d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
    };
    tick();
    setInterval(tick, 15000);
  },

  /* play the boot animation once, then reveal the desktop */
  boot(){
    const boot = document.getElementById("boot");
    if(!boot) return;
    setTimeout(()=> boot.classList.add("hidden"), 1500);
  },
};

window.Desktop = Desktop;
