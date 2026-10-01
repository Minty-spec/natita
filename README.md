# Natita — Workspace

An interactive personal portfolio built as a 3D desk you can explore.
Click the laptop → the screen powers on, the camera zooms in, and a small
desktop environment appears with clickable apps (About, Projects, Socials,
Contact, Discord, Roblox). Windows open, drag, and close like a real OS.

Open `index.html` in any modern browser. No build step, no dependencies.

## File map

```
index.html        scene markup + OS markup
css/style.css     all styling (sections are labelled 1–10)
js/config.js      ← EDIT THIS: all content lives here
js/icons.js       SVG icon registry
js/apps.js        window content renderers (one per app type)
js/windows.js     window manager (open / drag / close / focus)
js/desktop.js     builds profile widget, icons, dock, clock
js/scene.js       laptop power-on + camera zoom in/out
js/main.js        bootstrap
assets/profile.jpg  profile picture (placeholder — swap this file)
```

## Common edits

Replace the profile picture
: Drop your image at `assets/profile.jpg` (or change `owner.image` in
  `config.js`). If the file is missing, a styled "N" initial shows instead.

Add a project
: Add an object to the `projects` array in `config.js`.

Add a social link
: Add an object to the `socials` array in `config.js`.

Add a new app / icon on the laptop
: Add an entry to the `apps` array in `config.js`. Set `app` to one of the
  existing renderers (`about`, `projects`, `socials`, `contact`, `link`) or
  add a new renderer in `js/apps.js` and reference it. New icons go in
  `js/icons.js`.

Change colors
: Edit the CSS variables under `:root` in `css/style.css`
  (`--cyan` is the main accent).

## Future hooks (left intentionally simple)

Music, extra pages, more desk objects, and new effects can all be added
without touching the core: new apps are data in `config.js`, new desk items
are markup in `index.html` + a block in CSS section 5, new window types are
renderers in `apps.js`.
