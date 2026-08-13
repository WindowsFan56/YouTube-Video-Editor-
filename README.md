# 2015 YouTube Video Editor recreation

This is a self-contained HTML/CSS/JS recreation based on the supplied 2015 screenshot.

## Run
Open `index.html` in a browser. No server or dependencies are required.

## Included
- 2015-style Creator Studio sidebar
- YouTube-style top navigation and project bar
- Preview/player area
- Creative Commons asset panel
- Timeline with clips, ruler and draggable playhead
- Transition chooser
- Responsive styling

## Transition archive note
The uploaded file named `OYTVE Transtions [2026 Update].zip` is detected as a **RAR v5 archive despite the `.zip` filename**. The current environment could not extract that archive, so this prototype uses CSS transition previews rather than silently pretending the supplied transition files were imported.

If you provide the transitions as a real ZIP (or extract the RAR and upload the extracted files), they can be wired into the transition chooser.


## Transition assets
The package now includes the **original user-supplied transition archive** under `transitions/OYTVE_Transitions_Original.rar` plus `transitions/manifest.json`, and the transition chooser contains all named transition assets from that archive.

The archive is RAR5 even though its filename ends in `.zip`. Because the current runtime cannot extract RAR5 media, the prototype keeps the original archive intact and uses lightweight CSS previews in the browser. This avoids altering or losing the supplied media.
