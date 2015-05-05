import {subscribe} from 'util/mediator';

subscribe('GLOBAL.state.inGame', (state) => {
  GLOBAL.state.inGame = state;
  document.body.classList.toggle('in-game', state);
});

let GLOBAL = {};

GLOBAL.scaleFactor = window.devicePixelRatio || 1;
GLOBAL.width       = window.innerWidth * GLOBAL.scaleFactor;
GLOBAL.height      = window.innerHeight * GLOBAL.scaleFactor;

GLOBAL.columns = 4;
GLOBAL.rows    = 7;

GLOBAL.state = {};
GLOBAL.state.inGame = false;

export default GLOBAL;