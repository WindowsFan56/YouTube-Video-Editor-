# YouTube Video Editor — 2015 Recreation v2

This version folds the editor UI and editing workflow into one organized project.

## Features
1. Closer 2015 Creator Studio UI
2. Drag/reorder timeline clips
3. Trim left/right and split selected clips
4. Transition library with the 48 transition names from the supplied OYTVE archive
5. Functional HTML5 video preview/playback
6. Audio import and audio-track display
7. Video/image importing
8. Drag-and-drop media into the editor
9. Save/load project JSON
10. Title/text overlay tool
11. Timeline zoom
12. Desktop-first 2015 layout
13. Separate HTML/CSS/JS modules

## Original transition files
`transitions/OYTVE_Transitions_Original.rar` contains the original supplied archive.

The uploaded `.zip` is actually a RAR5 file. Browsers cannot directly use RAR media as transition assets, so the project includes `tools/extract_transitions.py`. After extracting the archive into `transitions/assets/`, the transition records already stored by the editor point at those original filenames.

## Important
This is a local browser recreation, not a connection to YouTube's historical editor. The Create Video button is intentionally a local prototype action.
