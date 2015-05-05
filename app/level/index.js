import squareBundle   from 'level/chapters/square/index';
import triangleBundle from 'level/chapters/triangle/index';

import Intro from 'level/intro/index'

let state = {
  active: false
};

function intro( chapter, level ) {

}

function start( chapter, level ) {


  state.active = true;
}

function pause() {

}

function resume() {

}

export default {
  intro,
  start,
  pause,
  resume
}