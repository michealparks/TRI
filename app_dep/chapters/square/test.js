/*

1D grid is a flattened 3D array.

*/

import GLOBAL from 'global';
import Grid   from 'grid/model';

const cols = GLOBAL.columns;
const rows = GLOBAL.rows;

export default function test( n ) {
  const grid = Grid.getGrid();

  let squares = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let last = grid[ i + cols * j ];
      let cur;
      let matches = { x: i, y: j, n: 1, color: last };

      for (let k = 1; k < 4; k++) {

        cur = grid[ i + cols * (j + rows * k) ];

        if (cur === last && cur > 0) { matches.n += 1; }

        last = cur;
      }

      if (matches.n === 4) {
        squares.push(matches);
        console.log(matches)
      }

      if (squares.length >= n) {
        return squares;
      }
    }
  }

  return squares;
}



