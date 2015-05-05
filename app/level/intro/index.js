//import Numbers from 'number/model';

import { publish } from 'util/mediator';

const ctx = document.querySelector( '#main-canvas' ).getContext( '2d' );

const introNode = document.querySelector( '#intro' );
const descriptionNode = document.querySelector( '#description' );
const specificContentNode = document.querySelector( '#specific' );

function open( config, start, stop ) {

  Numbers[ config.title ]( ctx, 150 );

  descriptionNode.innerHTML = config.description;
  specificContentNode.innerHTML = config.specific;

  window.addEventListener( 'touchend', startStage );

  introNode.classList.add( 'active' );
}

function startStage(e) {
  e.stopPropagation();

  window.removeEventListener( 'touchend', startStage );
  
  publish( 'GLOBAL.state.inGame', true );

  introNode.classList.remove( 'active' );
}

export default {
  open
}




