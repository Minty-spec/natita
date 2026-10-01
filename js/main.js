/* ============================================================================
 *  main.js  —  Bootstrap
 * ----------------------------------------------------------------------------
 *  Wires the modules together once the DOM is ready. Load order (see
 *  index.html): config -> icons -> apps -> windows -> desktop -> scene -> main
 * ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // window manager works inside the OS screen area
  WM.init(
    document.getElementById("windows"),
    document.getElementById("osScreen")
  );

  // fill CONFIG with the default language BEFORE anything renders
  Lang.apply(CONFIG.defaultLang || "en");

  // build the desktop (profile, icons, dock, clock)
  Desktop.build();

  // language toggles — the desk chip + the top-bar button
  document.querySelectorAll(".lang-toggle, #langChip").forEach(btn =>
    btn.addEventListener("click", (e) => { e.stopPropagation(); Lang.toggle(); }));

  // activate the 3D desk + camera transitions
  Scene.init();

  // background music + volume control in the OS top bar
  AudioCtl.init();
});
