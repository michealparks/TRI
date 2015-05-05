import GLOBAL   from 'global';
import Color    from 'color/model'
import Grid     from 'grid/model';
import Template from 'template/model';
import Triangle from 'triangle/model';
import Timer    from 'timer/model';
import Chapters from 'chapters/model';

import {subscribe} from 'util/mediator'
import device      from 'util/device';

const scaleFactor = GLOBAL.scaleFactor;
const tileSize    = Grid.tileSize;
const template    = Grid.template;

const canvas = document.querySelector('#main-canvas');

let ptrIsDown = false;

subscribe('GLOBAL.state.inGame', (state) => state? resume(): pause());

window.addEventListener(device.ptrmove, e => e.preventDefault());

canvas.addEventListener(device.ptrdown, e => ptrIsDown = true);
canvas.addEventListener(device.ptrup,   e => ptrIsDown = false);

canvas.addEventListener(device.ptrdown, onPtrDown);
canvas.addEventListener(device.ptrmove, onPtrMove);
canvas.addEventListener(device.ptrup, onPtrUp);

function resume() {
  canvas.classList.remove('no-pointer-events');
}

function pause() {
  canvas.classList.add('no-pointer-events');
}

function mapLocation(e) {
  const x = (e.touches? e.touches[0].pageX: e.pageX) * scaleFactor;
  const y = (e.touches? e.touches[0].pageY: e.pageY) * scaleFactor;

  const column   = Math.floor( x / tileSize );
  const row      = Math.floor( y / tileSize );
  const tileX    = x % tileSize;
  const tileY    = y % tileSize;

  const area1prox = Math.abs( tileX - ( tileSize * ( column + 1 ) ) );
  const area2prox = Math.abs( tileX - ( ( tileSize / 2 ) * ( column + 1 ) ) )

  mapTilePosition( column, row, tileX, tileY, area1prox < area2prox? 0: tileSize / 2 );
}

function mapTilePosition( column, row, tileX, tileY, prox ) {
  const columnData = Grid.getLowestUnfilledTile( column );
  const triangles  = Grid.getTriangles();

  const bottom = columnData.bottom;
  const left   = columnData.left;
  const right  = columnData.right;

  row = columnData.row;

  let dx = 0;
  let dy = 0;

  // right
  if (bottom && ! right && tileX >= tileSize / 2) {
    dx = 1;
  // left
  } else if (bottom && ! left && tileX < tileSize / 2) {
    dx = -1;
  // right
  } else if (bottom && left && ! right) {
    dx = 1;
  // left
  } else if (bottom && right && ! left) {
    dx = -1;
  // bottom
  } else if (! bottom) {
    dy = 1;
  // top
  } else {
    dy = -1;
  }

  Template.update( column, row, dx, dy );
}

function onPtrDown(e) {
  mapLocation(e);

  Template.get().fadeIn(0.5);
}

function onPtrMove(e) {
  if ( ptrIsDown ) { mapLocation(e); }
}

function onPtrUp() {
  const template = Template.get();
  const color = Color.upcoming();
  const triangle = new Triangle( template.x, template.y, color, 1, template.col, template.row, template.type );

  triangle.grow();
  template.fadeOut();

  Grid.addTriangle( triangle );

  Chapters.onMove()

  Color.randomize();
  Timer.addTime( 2000 );
  Timer.setColor( Color.upcoming() );
}

export default {
  resume,
  pause
}