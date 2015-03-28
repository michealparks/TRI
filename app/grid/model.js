import GLOBAL   from 'global';
import Triangle from 'triangle/model'

const columns = 4;
const rows = 7;

let tileSize  = Math.floor( GLOBAL.width / columns );

if (tileSize % 2 === 1) tileSize -= 1;

let triangles = [];

function addTriangle( triangle ) {
  triangles.push( triangle );
}

function getTriangles() {
  return triangles;
}

function getTrianglesInTile( column, row, lx, rx, ty, by ) {
  let matches = [];

  for (let i = 0, triangle; triangle = triangles[i]; i++) {

    let match = 
      triangle.x[0] >= lx && triangle.x[0] <= rx &&
      triangle.x[1] >= lx && triangle.x[1] <= rx &&
      triangle.x[2] >= lx && triangle.x[2] <= rx &&
      triangle.y[0] >= ty && triangle.y[0] <= by &&
      triangle.y[1] >= ty && triangle.y[1] <= by &&
      triangle.y[2] >= ty && triangle.y[2] <= by;

    if (match) matches.push(triangle);
  }

  return matches;
}

function getLowestUnfilledTile( column ) {
  let row = rows;

  while (row-- > 0) {
    const lx = column * tileSize;
    const rx = lx + tileSize
    const ty = row * tileSize
    const by = ty + tileSize;

    let triangles = getTrianglesInTile( column, row, lx, rx, ty, by );

    if (triangles.length == 4) continue;

    const left = triangles.filter(t => t.y[2] == ty && t.x[2] == lx)[0];
    const right = triangles.filter(t => t.y[1] == ty && t.x[1] == rx)[0];
    const bottom = triangles.filter(t => t.y[1] == by && t.x[1] == lx)[0];

    return { triangles, row, left, right, bottom };
  }
}

function render( ctx, stamp ) {
  let i = triangles.length;
  while (i-- > 0) {
    triangles[i].render( ctx );
  }
}

export default {
  tileSize,
  addTriangle,
  getLowestUnfilledTile,
  getTrianglesInTile,
  render
};