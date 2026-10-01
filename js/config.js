/* ============================================================================
 *  config.js  —  SINGLE SOURCE OF TRUTH
 * ----------------------------------------------------------------------------
 *  Two kinds of text live here:
 *    1. CONTENT  — your personal stuff (bio, tagline, facts, projects, handles).
 *                  This NEVER changes when you flip the language. Edit it once.
 *    2. INTERFACE — chrome/labels/buttons/system text. These have EN + RU
 *                   variants under `i18n` and switch with the language toggle.
 *
 *  To replace the profile picture: drop your image at  assets/profile.jpg
 * ========================================================================== */

const CONFIG = {

  /* which interface language to show first:  "en" | "ru"  */
  defaultLang: "ru",

  /* ----- Owner / profile (CONTENT — not translated) --------------------- */
  owner: {
    name: "Natita",
    tagline: "тутор · майонез · манго",
    image: "assets/profile.jpg",
    imageFallbackInitial: "N",
    status: "online", // online | away | dnd | offline
  },

  /* ----- Desktop apps --------------------------------------------------- *
   *  Structural (id/icon/accent/app/window) + CONTENT inside `data`
   *  (handles, urls). `label` and the interface bits of `data` come from i18n.
   * ---------------------------------------------------------------------- */
  apps: [
    { id: "about",    icon: "about",    accent: "#8fb3ad", app: "about",   window: { width: 460, height: 420 } },
    { id: "projects", icon: "projects", accent: "#8fb3ad", app: "projects", window: { width: 620, height: 480 } },
    { id: "socials",  icon: "socials",  accent: "#8fb3ad", app: "socials",  window: { width: 440, height: 400 } },
    {
      id: "discord", icon: "discord", accent: "#8b93c2", app: "link",
      window: { width: 420, height: 360 },
      data: {
        primary:   { label: "real.natita" },      // CONTENT — username
        secondary: { label: "Империя Киселя" },    // CONTENT — server
        url: "https://discord.gg/qcWtpjCcaD",       // CONTENT — server invite
      },
    },
    {
      id: "roblox", icon: "roblox", accent: "#c08a8a", app: "link",
      window: { width: 420, height: 360 },
      data: {
        primary:   { label: "Natita" },            // CONTENT — display name
        secondary: { label: "Pasha_13137" },       // CONTENT — username
        url: "https://www.roblox.com/users/profile",
      },
    },

    /* ----- fun mini-apps (things to do) ----- */
    { id: "mayo",   icon: "mayo",   accent: "#e6c15a", app: "mayo",   window: { width: 420, height: 440 } },
    { id: "oracle", icon: "oracle", accent: "#a98fc2", app: "oracle", window: { width: 430, height: 420 } },
    { id: "paint",  icon: "paint",  accent: "#8fb3ad", app: "paint",  window: { width: 520, height: 480 } },
  ],

  /* ----- About Me ------------------------------------------------------- *
   *  title + fact LABELS are interface (translated). lines + fact VALUES are
   *  CONTENT (fixed).
   * ---------------------------------------------------------------------- */
  about: {
    title: "About Me",                                   // interface
    lines: [ "кароче я научівся откривать майонез" ],    // CONTENT
    facts: [                                             // value = CONTENT, label from i18n
      { value: "Ukraine" },
      { value: "котиков" },
      { value: "ларплю" },
    ],
  },

  /* ----- Projects (names/tags/descriptions = CONTENT) ------------------- */
  projects: [
    { name: "Roblox Builds",  tag: "Game design", description: "A collection of maps and experiences crafted in Roblox Studio.", accent: "#8fb3ad" },
    { name: "Pixel Dreams",   tag: "Art",         description: "Small pixel-art pieces and UI concepts made for fun.",           accent: "#8fb3ad" },
    { name: "This Workspace", tag: "Web",         description: "The interactive desk you're exploring right now.",               accent: "#8fb3ad" },
  ],
  projectsHead: { title: "Projects", subtitle: "" },     // interface (filled from i18n)

  /* ----- Socials (names/handles = CONTENT) ------------------------------ */
  socials: [
    { name: "Discord",   handle: "real.natita",  url: "https://discord.gg/qcWtpjCcaD", icon: "discord" },
    { name: "Roblox",    handle: "@Pasha_13137", url: "#", icon: "roblox" },
  ],
  socialsHead: { title: "Socials", subtitle: "" },       // interface (filled from i18n)

  /* ----- Contact (method VALUES = CONTENT; labels/title/intro = interface) */
  contact: {
    title: "Contact",
    intro: "",
    methods: [
      { value: "hello@natita.me",  icon: "contact" },
      { value: "real.natita",      icon: "discord" },
      { value: "Open for collabs", icon: "about" },
    ],
  },

  /* ======================================================================= *
   *  i18n  —  INTERFACE text only. Content above is never touched.
   * ======================================================================= */
  i18n: {
    en: {
      apps: { about:"About Me", projects:"Projects", socials:"Socials", contact:"Contact", discord:"Discord", roblox:"Roblox", mayo:"Mayo", oracle:"Oracle", paint:"Doodle" },
      aboutTitle: "About Me",
      factLabels: [ "Based in", "Loves", "Currently" ],
      projectsHead: { title: "Projects", subtitle: "Things Natita has been building." },
      socialsHead:  { title: "Socials",  subtitle: "Find Natita around the web." },
      contact: { title: "Contact", intro: "Want to reach out? Here's where to find me.", methodLabels: [ "Email", "Discord", "Business" ] },
      discord: { subtitle: "Let's talk — find me here.", primaryDetail: "username", secondaryDetail: "server", button: "Open Discord" },
      roblox:  { subtitle: "My profile and creations.", primaryDetail: "display name", secondaryDetail: "username", button: "Open Roblox profile" },
      mini: {
        mayoUnit: "jars opened", mayoHint: "Click the jar. That's it. That's the whole thing.", mayoReset: "Reset",
        oracleHint: "Ask the mayo oracle a yes / no question.", oraclePlaceholder: "Type your question…", oracleAsk: "Ask",
        oracleAnswers: [ "Yes.", "No.", "Obviously.", "Not a chance.", "Ask again later.", "The mayo says yes.", "Absolutely not.", "Hmm… maybe.", "Open the mayonnaise first.", "100%." ],
        paintHint: "Draw something with your mouse.", paintClear: "Clear",
      },
      ui: { powerHint: "Click to power on", stepBack: "Step back", os: "Natita OS", toggle: "RU" },
    },

    ru: {
      apps: { about:"Обо мне", projects:"Проекты", socials:"Соцсети", contact:"Контакты", discord:"Discord", roblox:"Roblox", mayo:"Майонез", oracle:"Оракул", paint:"Рисовалка" },
      aboutTitle: "Обо мне",
      factLabels: [ "Откуда", "Люблю", "Сейчас" ],
      projectsHead: { title: "Проекты", subtitle: "Над чем Natita работает." },
      socialsHead:  { title: "Соцсети", subtitle: "Где найти Natita в сети." },
      contact: { title: "Контакты", intro: "Хочешь написать? Вот где меня найти.", methodLabels: [ "Почта", "Discord", "По делу" ] },
      discord: { subtitle: "Давай поболтаем — я тут.", primaryDetail: "ник", secondaryDetail: "сервер", button: "Открыть Discord" },
      roblox:  { subtitle: "Мой профиль и работы.", primaryDetail: "отображаемое имя", secondaryDetail: "ник", button: "Открыть профиль Roblox" },
      mini: {
        mayoUnit: "банок открыто", mayoHint: "Жми на банку. Это всё. В этом вся суть.", mayoReset: "Сброс",
        oracleHint: "Задай оракулу вопрос да / нет.", oraclePlaceholder: "Напиши свой вопрос…", oracleAsk: "Спросить",
        oracleAnswers: [ "Да.", "Нет.", "Очевидно.", "Ни за что.", "Спроси позже.", "Майонез говорит да.", "Абсолютно нет.", "Хм… может быть.", "Сначала открой майонез.", "100%." ],
        paintHint: "Нарисуй что-нибудь мышкой.", paintClear: "Очистить",
      },
      ui: { powerHint: "Нажми, чтобы включить", stepBack: "Назад", os: "Natita OS", toggle: "EN" },
    },
  },
};

/* exposed globally so the plain <script> modules can read it */
window.CONFIG = CONFIG;
