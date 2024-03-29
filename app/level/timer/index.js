import GLOBAL from 'global';
import Color  from 'color/index';

const height = GLOBAL.height;
const width  = GLOBAL.width;

let fill = {};
let startTime;
let progress = 0.0;
let duration = 0.0;
let currentStamp = 0.0;
let done;
let isOn = false;
let isAdding = false;

function start( time, callback = () => {} ) {
  fill = Color.current( 'rgb' );
  duration = time;
  done = callback;
  isOn = true;
}

function addTime( ms ) {
  const original = startTime;

  isAdding = true;

  function increment() {
    startTime += 100;

    if ( startTime >= ( original + ms ) ) {
      startTime = original + ms;
    } else if ( ( startTime - currentStamp ) > 0 ) {
      startTime = currentStamp;
    } else {
      window.setTimeout( increment, 1000 / 60 );
    }
  }

  increment();
}

function colorFactory( old, next, type ) {
  const dx = ( next - old === 0 )? 0 : ( next - old > 0 )? 6: -6;

  function increment() {
    fill[type] += dx;

    if ( (dx > 0 && fill[type] > next) ||
         (dx < 0 && fill[type] < next) ) { 
      return fill[type] = next; 
    } else if (dx === 0) { 
      return; 
    } else {
      window.setTimeout( increment, 20 );
    }
  }

  increment();
}

function setColor( color ) {
  color = Color.hexToRgb( color );

  let oldFill = fill;

  if ( isOn ) {
    colorFactory( oldFill.r, color.r, 'r' );
    colorFactory( oldFill.g, color.g, 'g' );
    colorFactory( oldFill.b, color.b, 'b' );
  } else {
    fill = color;
  }
}

function render( ctx, stamp ) {
  if ( ! isOn ) { return; } 

  if ( ! startTime ) { startTime = stamp; }

  progress = stamp - startTime;
  currentStamp = stamp;

  ctx.fillStyle = `rgba( ${ fill.r }, ${ fill.g }, ${ fill.b }, 1 )`;
  ctx.clearRect( 0, height-18, width, 18 );
  ctx.fillRect( 0, height-18, (1 - (progress / duration)) * width, 18 );

  if ( progress >= duration ) {
    isOn = false;
    startTime = undefined;
    done();
  }
}

export default {
  start,
  addTime,
  setColor,
  render
};

