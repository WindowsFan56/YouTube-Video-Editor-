window.EditorState = {
  clips: [],
  audio: [],
  texts: [],
  selectedClip: null,
  currentTime: 0,
  zoom: 100,
  duration: 0,
  projectName: "My Edited Video",
  transitionFor: {},
  transitionDefaults: {duration: 1, easing: "linear"}
};
window.MediaStore = new Map();
