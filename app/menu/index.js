import Sound from 'audio/index';

import Chapters from 'menu/chapters/index';

import {toggleBackgroundAnimation} from 'menu/bg-animation/index'

const menuNode = document.querySelector( '#menu' );

let globalState = document.body.dataset;

document
  .querySelector( '#btn-play' )
  .addEventListener( 'touchend', goToChapters );

function goToChapters() {
  globalState.view = 'chapters';
}