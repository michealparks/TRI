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

const columns = 4;
const rows = 7;

let tileSize = Math.floor( GLOBAL.width / columns );

if (tileSize % 2 === 1) { tileSize += 1; }

let triangles = [];

function addTriangle( triangle ) {

  triangle.neighbors['0,1'] = 0;
  triangle.neighbors['0,2'] = 0;
  triangle.neighbors['1,2'] = 0;

  console.log(triangle);

  console.log(triangle.col, triangle.row)

  console.log(triangle.x[3], triangle.x[4], triangle.x[5], triangle.y[3], triangle.y[4], triangle.y[5])

  triangles.push( triangle );
}

function getTriangles() {
  return triangles;
}

function getTrianglesInTile( col, row ) {

  return triangles.filter( triangle => triangle.col === col && triangle.row === row );
}

function getLowestUnfilledTile( column ) {
  let row = rows;

  const lx = column * tileSize;

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
      const left  = triangles.some( t => t.x[4] === lx && t.x[5] === lx );
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
  addTriangle,
  getLowestUnfilledTile,
  getTrianglesInTile,
  render
};