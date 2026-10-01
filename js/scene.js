/* ============================================================================
 *  scene.js  —  Desk interactions & "camera" transitions
 * ----------------------------------------------------------------------------
 *  - Click the laptop  -> screen powers on, camera zooms in, desktop appears
 *  - Step back button  -> camera pulls out, screen powers off
 *  - Subtle parallax tilt that follows the cursor (desk view only)
 * ========================================================================== */

const Scene = {
  entered:false,
  busy:false,

  init(){
    this.body    = document.body;
    this.laptop  = document.getElementById("laptop");
    this.laptopEl= this.laptop.querySelector(".laptop");
    this.monitor = document.getElementById("monitor");
    this.world   = document.getElementById("world");
    this.stepBack= document.getElementById("stepBack");

    this.laptop.addEventListener("click", ()=> this.enter());
    if(this.monitor) this.monitor.addEventListener("click", ()=> this.enter());
    this.stepBack.addEventListener("click", ()=> this.exit());

    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape" && this.entered) this.exit();
    });

    this._parallax();
    this._deskToys();
  },

  /* ---- clickable desk props (fun stuff that isn't the laptop) ---- */
  _deskToys(){
    const stop = (fn) => (e) => { e.stopPropagation(); fn(e); };
    const pulse = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

    /* Lamp — a working light switch (dims the whole room) */
    const lamp = document.querySelector(".obj--lamp");
    if(lamp){
      lamp.style.cursor = "pointer";
      lamp.title = "Light switch";
      lamp.addEventListener("click", stop(() => this.body.classList.toggle("lamp-off")));
    }

    /* Mug — sip the coffee, puff of steam, refills when empty */
    const mug = document.querySelector(".obj--mug");
    if(mug){
      let sips = 4;
      mug.style.cursor = "pointer";
      mug.title = "Coffee";
      mug.addEventListener("click", stop(() => {
        pulse(mug, "steam");
        sips = sips > 0 ? sips - 1 : 4;
        mug.style.setProperty("--coffee", sips / 4);
        mug.classList.toggle("mug-empty", sips === 0);
      }));
    }

    /* Pen — give it a little wiggle */
    const pen = document.querySelector(".obj--pen");
    if(pen){
      pen.style.cursor = "pointer";
      pen.addEventListener("click", stop(() => pulse(pen, "wiggle")));
    }

    /* Mouse — click it, it clicks back */
    const mouse = document.querySelector(".obj--mouse");
    if(mouse){
      mouse.style.cursor = "pointer";
      mouse.addEventListener("click", stop(() => pulse(mouse, "click")));
    }

    /* Notepad — scribbles a random sticky note each click */
    const papers = document.querySelector(".obj--papers");
    const sheet  = papers && papers.querySelector(".paper--1");
    if(sheet){
      const notes = {
        en: ["buy mayo","open the mayo","build something","call mom","water the plant","be cool","nap time","mango 🥭","42","todo: nothing"],
        ru: ["купить майонез","открыть майонез","собрать что-то","позвонить маме","полить цветок","быть крутым","поспать","манго 🥭","42","дела: никаких"],
      };
      let i = 0;
      papers.style.cursor = "pointer";
      papers.addEventListener("click", stop(() => {
        const lang = (window.Lang && Lang.current) || "en";
        const list = notes[lang] || notes.en;
        sheet.innerHTML = `<span class="paper__note">${list[i % list.length]}</span>`;
        i++;
        pulse(sheet, "scribble");
      }));
    }

    /* Plant — rustle the leaves */
    const plant = document.querySelector(".obj--plant");
    if(plant) plant.addEventListener("click", stop(() => pulse(plant, "wiggle")));

    /* Rubber duck — squeak */
    const duck = document.querySelector(".obj--duck");
    if(duck) duck.addEventListener("click", stop(() => pulse(duck, "squeak")));

    /* Phone — screen lights up for a moment */
    const phone = document.querySelector(".obj--phone");
    if(phone) phone.addEventListener("click", stop(() => {
      phone.classList.add("lit");
      clearTimeout(phone._t);
      phone._t = setTimeout(() => phone.classList.remove("lit"), 1400);
    }));

    /* Keyboard — a quick type flicker */
    const kb = document.querySelector(".obj--keyboard");
    if(kb) kb.addEventListener("click", stop(() => pulse(kb, "typing")));
  },

  enter(){
    if(this.entered || this.busy) return;
    this.busy = true;

    // let the CSS state rules control the world transform from here on
    this.world.style.transform = "";

    // 1) power the screen on (small lid screen lights up)
    this.laptopEl.classList.add("is-on");

    // 2) begin the camera push toward the laptop
    this.body.classList.add("is-entering");

    // start the background music (this click is a valid user gesture)
    if(window.AudioCtl) AudioCtl.start();

    // 3) after the screen is on, zoom fully in and reveal the OS
    setTimeout(()=>{
      this.body.classList.add("is-entered");
      Desktop.boot();
      this.entered = true;
      this.busy = false;
    }, 650);
  },

  exit(){
    if(!this.entered || this.busy) return;
    this.busy = true;

    WM.closeAll();

    // reset boot overlay so it plays again next time
    const boot = document.getElementById("boot");
    if(boot) boot.classList.remove("hidden");

    this.body.classList.remove("is-entered");

    setTimeout(()=>{
      this.body.classList.remove("is-entering");
      this.laptopEl.classList.remove("is-on");
      this.entered = false;
      this.busy = false;
    }, 700);
  },

  /* very subtle cursor-follow shift for depth (disabled once entered) */
  _parallax(){
    let raf;
    const stage = document.querySelector(".stage");
    const wall  = document.querySelector(".wall-art");
    window.addEventListener("mousemove", (e)=>{
      if(this.entered || this.busy) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        const dx = (e.clientX / window.innerWidth  - 0.5);
        const dy = (e.clientY / window.innerHeight - 0.5);
        const tilt = getComputedStyle(document.documentElement)
                      .getPropertyValue("--desk-tilt").trim() || "70deg";
        // gentle world shift + a touch of yaw for a 3D feel
        this.world.style.transform =
          `rotateX(${tilt}) rotateZ(${dx*1.1}deg) translateY(${-30 + dy*7}px) translateX(${dx*16}px)`;
        // move the vanishing point so the scene feels volumetric
        if(stage) stage.style.perspectiveOrigin = `${50 + dx*6}% ${34 + dy*5}%`;
        // the wall picture drifts the opposite way (further back = less movement)
        if(wall) wall.style.transform = `translateX(-50%) translate(${-dx*18}px, ${-dy*8}px)`;
      });
    });
  },
};

window.Scene = Scene;
