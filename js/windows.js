/* ============================================================================
 *  windows.js  —  Minimal window manager
 * ----------------------------------------------------------------------------
 *  WM.open(app)   open (or focus) a window for a config app object
 *  WM.close(id)   close a window
 *  Windows are draggable by their title bar, closable, and focusable.
 *  Emits dock-sync via a callback set in WM.onChange.
 * ========================================================================== */

const WM = {
  root: null,
  bounds: null,          // element the windows are clamped to (the screen)
  open_: new Map(),      // id -> {el, app}
  z: 100,
  spawnIndex: 0,
  onChange: null,

  init(rootEl, boundsEl){
    this.root = rootEl;
    this.bounds = boundsEl;
  },

  isOpen(id){ return this.open_.has(id); },

  focus(id){
    const w = this.open_.get(id);
    if(!w) return;
    w.el.style.zIndex = ++this.z;
    this.open_.forEach((v,k)=>v.el.classList.toggle("is-focused", k===id));
  },

  open(app){
    if(this.open_.has(app.id)){ this.focus(app.id); return; }

    const win = document.createElement("div");
    win.className = "win";
    win.style.setProperty("--accent", app.accent || "#36e2ff");

    // size + cascading position inside the screen bounds
    const b = this.bounds.getBoundingClientRect();
    const w = Math.min(app.window?.width  || 440, b.width  - 32);
    const h = Math.min(app.window?.height || 400, b.height - 60);
    const offset = (this.spawnIndex++ % 5) * 26;
    const left = Math.max(16, (b.width  - w)/2 + offset - 40);
    const top  = Math.max(44, (b.height - h)/2 + offset - 30);
    win.style.width  = w + "px";
    win.style.height = h + "px";
    win.style.left   = left + "px";
    win.style.top    = top + "px";
    win.style.zIndex = ++this.z;

    win.innerHTML = `
      <div class="win__bar" data-drag>
        <div class="win__dots"><span class="win__dot r"></span><span class="win__dot y"></span><span class="win__dot g"></span></div>
        <div class="win__title">${getIcon(app.icon)}<span>${esc(app.label)}</span></div>
        <button class="win__close" aria-label="Close">${getIcon("close")}</button>
      </div>
      <div class="win__body">${renderApp(app)}</div>`;

    this.root.appendChild(win);
    this.open_.set(app.id, { el: win, app });

    this._mountHook(win, app);

    win.addEventListener("mousedown", () => this.focus(app.id));
    win.querySelector(".win__close").addEventListener("click", (e)=>{ e.stopPropagation(); this.close(app.id); });
    this._makeDraggable(win, win.querySelector("[data-drag]"));
    this.focus(app.id);
    this._changed();
  },

  close(id){
    const w = this.open_.get(id);
    if(!w) return;
    w.el.classList.add("is-closing");
    setTimeout(()=>{ w.el.remove(); }, 240);
    this.open_.delete(id);
    this._changed();
  },

  closeAll(){
    [...this.open_.keys()].forEach(id=>{
      const w=this.open_.get(id); w.el.remove(); this.open_.delete(id);
    });
    this._changed();
  },

  /** Re-render the title + body of every open window (used on language switch). */
  rerender(){
    this.open_.forEach(({el, app})=>{
      const title = el.querySelector(".win__title span");
      if(title) title.textContent = app.label;
      const body = el.querySelector(".win__body");
      if(body){ body.innerHTML = renderApp(app); this._mountHook(el, app); }
    });
  },

  /** Call APPS[app+"Init"] on the window body after its HTML is injected. */
  _mountHook(win, app){
    const init = window.APPS && APPS[app.app + "Init"];
    if(typeof init === "function") init(win.querySelector(".win__body"), app);
  },

  _changed(){ if(this.onChange) this.onChange([...this.open_.keys()]); },

  _makeDraggable(win, handle){
    let sx, sy, ox, oy, dragging=false;
    const down = (e)=>{
      if(e.target.closest(".win__close")) return;
      dragging=true;
      const p = e.touches ? e.touches[0] : e;
      sx=p.clientX; sy=p.clientY;
      ox=parseFloat(win.style.left); oy=parseFloat(win.style.top);
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      document.addEventListener("touchmove", move, {passive:false});
      document.addEventListener("touchend", up);
    };
    const move = (e)=>{
      if(!dragging) return;
      if(e.cancelable) e.preventDefault();
      const p = e.touches ? e.touches[0] : e;
      const b = this.bounds.getBoundingClientRect();
      let nl = ox + (p.clientX - sx);
      let nt = oy + (p.clientY - sy);
      nl = Math.max(4, Math.min(nl, b.width  - win.offsetWidth  - 4));
      nt = Math.max(36, Math.min(nt, b.height - 44));
      win.style.left = nl + "px";
      win.style.top  = nt + "px";
    };
    const up = ()=>{
      dragging=false;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
    };
    handle.addEventListener("mousedown", down);
    handle.addEventListener("touchstart", down, {passive:true});
  },
};

window.WM = WM;
