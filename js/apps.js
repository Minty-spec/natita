/* ============================================================================
 *  apps.js  —  App content renderers (modular registry)
 * ----------------------------------------------------------------------------
 *  Each renderer takes the app's `data` + the full CONFIG and returns an
 *  HTML string for the window body.
 *
 *  To add a NEW TYPE of app:
 *    1. add  APPS.myType = (app) => `...html...`
 *    2. reference it from config.js with  app:"myType"
 * ========================================================================== */

const esc = (s) => String(s).replace(/[&<>"]/g, c => (
  { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

const APPS = {

  /* ---------- About Me ---------- */
  about(app, cfg){
    const a = cfg.about;
    const pfp = window.renderPfp(42);
    const lines = a.lines.map(l => `<p class="lead">${esc(l)}</p>`).join("");
    const facts = a.facts.map(f =>
      `<div class="fact"><span>${esc(f.label)}</span><span>${esc(f.value)}</span></div>`).join("");
    return `
      <div class="profile-card">${pfp}
        <div><h3>${esc(cfg.owner.name)}</h3>
        <p class="muted" style="font-size:12px">${esc(cfg.owner.tagline)}</p></div>
      </div>
      ${lines}
      <div class="facts">${facts}</div>`;
  },

  /* ---------- Projects ---------- */
  projects(app, cfg){
    const cards = cfg.projects.map(p => `
      <div class="card" style="--card-accent:${esc(p.accent||'#36e2ff')}">
        <span class="card__tag">${esc(p.tag)}</span>
        <h4>${esc(p.name)}</h4>
        <p>${esc(p.description)}</p>
      </div>`).join("");
    const head = cfg.projectsHead || {};
    return `
      <div class="app-head"><h3>${esc(head.title||"Projects")}</h3><p>${esc(head.subtitle||"")}</p></div>
      <div class="cards">${cards}</div>`;
  },

  /* ---------- Socials ---------- */
  socials(app, cfg){
    const rows = cfg.socials.map(s => `
      <a class="link-row" href="${esc(s.url)}" target="_blank" rel="noopener">
        <span class="link-row__icon">${getIcon(s.icon)}</span>
        <span class="link-row__meta"><b>${esc(s.name)}</b><span>${esc(s.handle)}</span></span>
        <span class="link-row__go">&#8599;</span>
      </a>`).join("");
    const head = cfg.socialsHead || {};
    return `
      <div class="app-head"><h3>${esc(head.title||"Socials")}</h3><p>${esc(head.subtitle||"")}</p></div>
      <div class="links">${rows}</div>`;
  },

  /* ---------- Contact ---------- */
  contact(app, cfg){
    const c = cfg.contact;
    const rows = c.methods.map(m => `
      <div class="link-row">
        <span class="link-row__icon">${getIcon(m.icon)}</span>
        <span class="link-row__meta"><b>${esc(m.label)}</b><span>${esc(m.value)}</span></span>
      </div>`).join("");
    return `
      <div class="app-head"><h3>${esc(c.title)}</h3><p>${esc(c.intro)}</p></div>
      <div class="links">${rows}</div>`;
  },

  /* ---------- Generic link app (Discord, Roblox, …) ---------- */
  link(app){
    const d = app.data || {};
    return `
      <div class="profile-card">
        <span class="badge-big" style="--accent:${esc(app.accent)}">${getIcon(app.icon)}</span>
        <div><h3>${esc(d.heading||app.label)}</h3><p class="muted" style="font-size:12px">${esc(d.subtitle||"")}</p></div>
      </div>
      <div class="links">
        <div class="link-row"><span class="link-row__meta"><b>${esc(d.primary?.label||"")}</b><span>${esc(d.primary?.detail||"")}</span></span></div>
        ${d.secondary ? `<div class="link-row"><span class="link-row__meta"><b>${esc(d.secondary.label)}</b><span>${esc(d.secondary.detail)}</span></span></div>` : ""}
      </div>
      ${d.url ? `<a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener" style="--accent:${esc(app.accent)}">${esc(d.button||"Open")}</a>` : ""}`;
  },

  /* ---------- Mayo clicker ---------- */
  mayo(){
    const t = miniStrings();
    return `
      <div class="mini mini--mayo">
        <p class="mini__hint">${esc(t.mayoHint)}</p>
        <button class="mayo-jar" id="mayoJar" aria-label="jar">${getIcon("mayo")}</button>
        <div class="mini__count"><b id="mayoCount">${MAYO.count}</b> <span>${esc(t.mayoUnit)}</span></div>
        <button class="btn-mini" id="mayoReset">${esc(t.mayoReset)}</button>
      </div>`;
  },

  /* ---------- Oracle (magic mayo-ball) ---------- */
  oracle(){
    const t = miniStrings();
    return `
      <div class="mini mini--oracle">
        <p class="mini__hint">${esc(t.oracleHint)}</p>
        <div class="oracle-ball" id="oracleBall"><span id="oracleAnswer">…</span></div>
        <div class="oracle-ask">
          <input type="text" id="oracleInput" placeholder="${esc(t.oraclePlaceholder)}" />
          <button class="btn-mini" id="oracleAsk">${esc(t.oracleAsk)}</button>
        </div>
      </div>`;
  },

  /* ---------- Paint ---------- */
  paint(){
    const t = miniStrings();
    return `
      <div class="mini mini--paint">
        <p class="mini__hint">${esc(t.paintHint)}</p>
        <canvas id="paintCanvas" width="460" height="300"></canvas>
        <div class="paint-tools">
          <input type="color" id="paintColor" value="#8fb3ad" />
          <button class="btn-mini" id="paintClear">${esc(t.paintClear)}</button>
        </div>
      </div>`;
  },
};

/* ---- module state + interface strings for mini-apps ---- */
const MAYO = { count: 0 };

function miniStrings(){
  const cfg = window.CONFIG;
  const lang = (window.Lang && Lang.current) || cfg.defaultLang || "en";
  return (cfg.i18n[lang] || cfg.i18n.en).mini;
}

/* ---- post-mount interactivity hooks (called after innerHTML is set) ---- */
APPS.mayoInit = (body) => {
  const jar = body.querySelector("#mayoJar");
  const out = body.querySelector("#mayoCount");
  const reset = body.querySelector("#mayoReset");
  if(jar) jar.addEventListener("click", () => {
    MAYO.count++; out.textContent = MAYO.count;
    jar.classList.remove("pop"); void jar.offsetWidth; jar.classList.add("pop");
  });
  if(reset) reset.addEventListener("click", () => { MAYO.count = 0; out.textContent = 0; });
};

APPS.oracleInit = (body) => {
  const ball = body.querySelector("#oracleBall");
  const ans  = body.querySelector("#oracleAnswer");
  const inp  = body.querySelector("#oracleInput");
  const ask  = body.querySelector("#oracleAsk");
  const roll = () => {
    const list = miniStrings().oracleAnswers;
    ball.classList.remove("shake"); void ball.offsetWidth; ball.classList.add("shake");
    ans.textContent = list[Math.floor(Math.random() * list.length)];
  };
  if(ask) ask.addEventListener("click", roll);
  if(inp) inp.addEventListener("keydown", e => { if(e.key === "Enter") roll(); });
};

APPS.paintInit = (body) => {
  const cv = body.querySelector("#paintCanvas");
  if(!cv) return;
  const ctx = cv.getContext("2d");
  const color = body.querySelector("#paintColor");
  const clear = body.querySelector("#paintClear");
  let drawing = false;
  const pos = (e) => {
    const r = cv.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / r.width),
             y: (e.clientY - r.top)  * (cv.height / r.height) };
  };
  cv.addEventListener("mousedown", e => { drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  cv.addEventListener("mousemove", e => {
    if(!drawing) return;
    const p = pos(e);
    ctx.strokeStyle = color.value; ctx.lineWidth = 3; ctx.lineCap = "round";
    ctx.lineTo(p.x, p.y); ctx.stroke();
  });
  window.addEventListener("mouseup", () => { drawing = false; });
  if(clear) clear.addEventListener("click", () => ctx.clearRect(0, 0, cv.width, cv.height));
};

/** Render the body HTML for a given app config object. */
function renderApp(app){
  const fn = APPS[app.app] || APPS.link;
  return fn(app, window.CONFIG);
}

window.APPS = APPS;
window.renderApp = renderApp;
