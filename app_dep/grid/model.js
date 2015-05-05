/*

vertex key:

x,y [1] | \
        |   \
        |     \
x,y [0] |_______\ x,y [2]

        [0]
        /\
      /    \
[2] /________\ [1]

|\
|  \
|    \
|    /
|  /
|/

*/

import GLOBAL   from 'global';
import Triangle from 'triangle/model';

const columns = GLOBAL.columns;
const rows    = GLOBAL.rows;

let tileSize = Math.floor( GLOBAL.width / columns );

if (tileSize % 2 === 1) { tileSize += 1; }

let triangles = [];

let grid = new Uint32Array(columns * rows * 4);

function addTriangle( t ) {

  const adjacentCol = t.y[4] === t.y[5]? t.col: t.x[0] < t.x[1]? t.col + 1: t.col - 1;
  const adjacentRow = t.x[4] === t.x[5]? t.row: t.y[0] < t.y[1]? t.row + 1: t.row - 1;

  const thisTile     = getTrianglesInTile( t.col, t.row );
  const adjacentTile = getTrianglesInTile( adjacentCol, adjacentRow );

  t.neighbors['1,2'] = adjacentTile.filter( _t => 
    t.x[4] === _t.x[4] && t.y[4] === _t.y[4] && 
    t.x[5] === _t.x[5] && t.y[5] === _t.y[5] )[0];

  t.neighbors['0,1'] = thisTile.filter( _t => 
    t.x[3] === _t.x[3] && t.y[3] === _t.y[3] && 
    t.x[4] === _t.x[4] && t.y[4] === _t.y[4] )[0];

  t.neighbors['0,2'] = thisTile.filter( _t => 
    t.x[3] === _t.x[3] && t.y[3] === _t.y[3] && 
    t.x[5] === _t.x[5] && t.y[5] === _t.y[5] )[0];

  triangles.push( t );

  console.log(t.col, t.row, t.type)
  console.log(t.col + columns * (t.row + rows * t.type))



  grid[ t.col + columns * (t.row + rows * t.type) ] = parseInt(t.color.substr(1), 16);

}

function getTriangles() {
  return triangles;
}

function getGrid() {
  return grid;
}

function getTrianglesInTile( col, row ) {

  return triangles.filter( triangle => triangle.col === col && triangle.row === row );
}

function getLowestUnfilledTile( column ) {

  const lx = column * tileSize;

  let row = rows;

  while (row-- > 0) {

    let triangles = getTrianglesInTile( column, row );

    if (triangles.length === 4) { continue; }

    if (triangles.length === 0) {
      return { row, left: false, right: false, bottom: false };
    } 

    if (triangles.length === 1) { 
      return { row, left: false, right: false, bottom: true };
    }

    if (triangles.length === 2) {
      const left  = triangles.some( t => t.x[5] === t.x[4] && t.x[5] < t.x[3] );
      const right = left? false: true;

      return { row, left, right, bottom: true };
    }

    if (triangles.length === 3) { 
      return { row, left: true, right: true, bottom: true }; 
    }
  }
}

function render( ctx, stamp ) {
  let i = triangles.length;

  while (i-- > 0) { triangles[i].render( ctx ); }
}

export default {
  tileSize,
  getTriangles,
  getGrid,
  addTriangle,
  getLowestUnfilledTile,
  getTrianglesInTile,
  render
};