import {randomInt} from 'util/core';

import Triangle from 'menu/triangle/index';

const ctx = document
  .querySelector( '#background-canvas' )
  .getContext( '2d' );

const canvasWidth  = ctx.canvas.width;
const canvasHeight = ctx.canvas.height;

let RAFid;
let intervalId1;
let intervalId2;

let triangles = [];

let animationIsActive = false;

function makeTriangles() {
  const x = randomInt(
    Math.round( window.innerWidth / 6 ),
    Math.round( window.innerWidth * 5 / 6 )
  );

  const y = randomInt( 
    Math.round( window.innerHeight / 6 ), 
    Math.round( window.innerHeight * 5 / 6 )
  );

  return triangles.push( 
    ( new Array ( 10 ) )
      .fill( 0 )
      .map( () => new Triangle( x, y ) )
  );
}

function cleanTriangles() {
  return triangles.shift();
}

function render( stamp ) {
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight );

  let i = triangles.length;

  while ( i-- > 0 ) {
    let t = triangles[ i ];
    let j = t.length;

    while ( j-- > 0 ) {
      t[ j ].update( stamp );
      t[ j ].render( ctx );
    }
  }

  return RAFid = window.requestAnimationFrame( render );
}

function clearAllActivity() {
  window.cancelAnimationFrame( RAFid );
  window.clearInterval( intervalId1 );
  window.clearInterval( intervalId2 );
}

export default function toggleBackgroundAnimation( toStart = ! animationIsActive ) {
  if ( toStart ) {
    intervalId1 = window.setInterval( makeTriangles, 4000 );

    window.setTimeout( () => 
      intervalId2 = window.setInterval( cleanTriangles, 4000 )
    , 4000 )

    RAFid = window.requestAnimationFrame( render );

  } else {
    window.setTimeout( clearAllActivity, 800 );
  }

  animationIsActive = toStart;
}
