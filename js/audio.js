/* ============================================================================
 *  audio.js  —  Background music + volume control (lives in the OS top bar)
 * ----------------------------------------------------------------------------
 *  Plays a looping track once the user "enters" the laptop (that click is the
 *  user gesture browsers require before audio can start). Default volume 50%.
 *  The speaker button mutes/unmutes; the slider sets the level.
 * ========================================================================== */

const AudioCtl = {
  started:false,

  init(){
    this.audio  = document.getElementById("bgAudio");
    this.btn    = document.getElementById("volumeBtn");
    this.slider = document.getElementById("volumeSlider");
    this.wrap   = document.getElementById("volume");
    if(!this.audio) return;

    this.audio.loop = true;
    this.audio.volume = 0.5;       // default 50%
    this.last = 0.5;               // remembered level for unmute

    if(this.slider){
      this.slider.value = 50;
      this.slider.addEventListener("input", () => {
        const v = (+this.slider.value) / 100;
        this.audio.volume = v;
        if(v > 0) this.last = v;
        this._reflect();
      });
      // don't let a click on the slider bubble up and trigger scene stuff
      this.slider.addEventListener("click", (e) => e.stopPropagation());
    }

    if(this.btn){
      this.btn.addEventListener("click", (e) => { e.stopPropagation(); this.toggleMute(); });
    }

    this._reflect();
  },

  /* called from Scene.enter() — the entering click is a valid user gesture */
  start(){
    if(this.started || !this.audio) return;
    const p = this.audio.play();
    if(p && typeof p.catch === "function") p.catch(() => {}); // ignore autoplay block
    this.started = true;
  },

  toggleMute(){
    if(!this.audio) return;
    if(this.audio.volume > 0){
      this.last = this.audio.volume || this.last;
      this.audio.volume = 0;
      if(this.slider) this.slider.value = 0;
    } else {
      const v = this.last || 0.5;
      this.audio.volume = v;
      if(this.slider) this.slider.value = Math.round(v * 100);
    }
    this._reflect();
  },

  _reflect(){
    if(this.wrap) this.wrap.classList.toggle("is-muted", this.audio.volume === 0);
    if(this.slider) this.slider.style.backgroundSize = (this.audio.volume * 100) + "% 100%";
  },
};

window.AudioCtl = AudioCtl;
