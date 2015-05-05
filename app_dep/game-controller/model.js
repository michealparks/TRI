import Input  from 'user-input/model';
import Render from 'render/model';
import Timer  from 'timer/model';

import {subscribe} from 'util/mediator';

export function startLevel() {
  Input.resume();
  Render.resume();
  Timer.start(5000, stopLevel);
}

export function resumeLevel() {
  Input.resume();
  Render.resume();
}

export function stopLevel() {
  Input.pause();
  Render.pause();
}

subscribe('GLOBAL.state.inGame', (state) => {
  if (state) {
    startLevel();
  } else {
    stopLevel();
  }
});





