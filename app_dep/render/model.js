import GLOBAL   from 'global';
import Grid     from 'grid/model';
import Timer    from 'timer/model';
import Template from 'template/model';

const canvas = document.querySelector( '#main-canvas' );
const ctx    = canvas.getContext( '2d' );

const bgCanvas = document.querySelector( '#background-canvas' );

ctx.strokeWidth = 1;

canvas.width  = bgCanvas.width  = GLOBAL.width;
canvas.height = bgCanvas.height = GLOBAL.height;

let rAFid;

function render(stamp) {
  ctx.clearRect( 0, 0, canvas.width, canvas.height );

  Timer.render(ctx, stamp);
  Grid.render(ctx, stamp);
  Template.render(ctx, stamp);

  rAFid = window.requestAnimationFrame(render);
}

function resume() {
  rAFid = window.requestAnimationFrame(render);
}

function pause() {
  window.cancelAnimationFrame(rAFid);
}

export default {
  resume,
  pause
};