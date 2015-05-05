import Triangle from 'menu/triangle';
import Chapters from 'chapters/model';

import _ from 'util/core';

const ctx  = document.querySelector( '#background-canvas' ).getContext( '2d' );
const menu = document.querySelector( '#menu' );

const titleStyle = menu.querySelector( '#title' ).style;

const playBtn     = menu.querySelector( '#btn-play' );
const settingsBtn = menu.querySelector( '#btn-settings' );

let beta = 0;
let gamma = 0;

let rAFid;
let intervalId1;
let intervalId2;

let isActive = false;

let triangles = [];

window.addEventListener( 'deviceorientation', handleOrientation );

playBtn.addEventListener( 'touchend', selectChapter );

function selectChapter() {
  toggle(false)
  window.setTimeout(() => Chapters.load('square'), 800);
}

function createTriangles() {
  const x = _.randomInt(
    Math.round( window.innerWidth / 6 ),
    Math.round( window.innerWidth * 5 / 6 )
  );

  const y = _.randomInt( 
    Math.round( window.innerHeight / 6 ), 
    Math.round( window.innerHeight * 5 / 6 )
  );

  triangles.push( ( new Array( 10 ) ).fill( 0 ).map( () => new Triangle( x, y ) ) );
}

function shiftTriangles() {
  triangles.shift();
}

function render( stamp ) {
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

  titleStyle.textShadow = `${ gamma }px ${ beta }px 0 #bbb`;

  let i = triangles.length;
  while (i-- > 0) { 
    let t = triangles[i];
    let j = t.length
    while (j-- > 0) { t[j].update( stamp ).render( ctx ); }
  }

  rAFid = window.requestAnimationFrame( render );
}

function toggle( toStart ) {
  if ( toStart ) {
    intervalId1 = window.setInterval( createTriangles, 4000 );
    window.setTimeout(() => intervalId2 = window.setInterval( shiftTriangles, 4000 ), 4000);
    rAFid = window.requestAnimationFrame( render );

    createTriangles();
  } else {
    window.setTimeout(() => {
      window.cancelAnimationFrame( rAFid );
      window.clearInterval( intervalId1 );
      window.clearInterval( intervalId2 );
    }, 800);
  }

  isActive = toStart;
  document.body.classList.toggle( 'in-menu', toStart );
}

function handleOrientation( e ) {
  beta  = e.beta / 10;
  gamma = e.gamma / 10;
}

toggle( true );

export default {
  toggle
};

