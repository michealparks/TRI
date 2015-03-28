let GLOBAL = {};

GLOBAL.scaleFactor = window.devicePixelRatio || 1;
GLOBAL.width       = window.innerWidth * GLOBAL.scaleFactor;
GLOBAL.height      = window.innerHeight * GLOBAL.scaleFactor;

export default GLOBAL;

