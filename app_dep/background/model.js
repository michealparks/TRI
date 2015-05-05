import GLOBAL   from 'global';
import Triangle from 'triangle/model';

const canvas = document.querySelector( '#background-canvas' );
const ctx    = canvas.getContext( '2d' );

canvas.width  = GLOBAL.width;
canvas.height = GLOBAL.height;

let triangles = [];

function render(grid, light = 50) {
  let tileSize = grid.tileSize;

  for (let row = grid.rows-1; row > -1; row--) {
    for (let col = 0, l = grid.columns; col < l; col++) {

      const dir = [[-1, 0], [1, 0], [0, -1], [0, 1]].shuffle();

      for (let k = 0; k < 4; k++) {
        light += 0.25

        const triangle = new Triangle(undefined, undefined, `hsl(0, 29%, ${light}%`);

        triangle.setPointsFromRightAngle( col, row, dir[k][0], dir[k][1], tileSize);
        triangles.push( triangle );


        window.setTimeout(() => {
          triangle.fadeIn( ctx );
        }, (col*100) + (row*100) + (k*100) );
      }
    }
  }

  window.setTimeout(render.bind(undefined, grid, 100), (grid.rows * 50) + (grid.columns * 50))
}

export default {
  render
};

