import GLOBAL   from 'global';
import canvas   from 'canvas/model';
import Triangle from 'triangle/model'

/**
 *
 *
 *
 */

const ctx = canvas.ctx;

export default class Grid {
  constructor( columns, rows ) {
    this.columns = columns || 4;
    this.rows    = rows    || 7;

    this.tileSize  = Math.floor( GLOBAL.width / this.columns ) * GLOBAL.scaleFactor;

    this.triangles = [];
    this.template  = null;
    this.fillables = [];
  }

  /*

  Copyright (c) 1970-2003, Wm. Randolph Franklin

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimers.
  Redistributions in binary form must reproduce the above copyright notice in the documentation and/or other materials provided with the distribution.
  The name of W. Randolph Franklin may not be used to endorse or promote products derived from this Software without specific prior written permission.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  */
  isInPolygon( nvert, vertx, verty, testx, testy ) {
    let c = false;
    for ( let i = 0, j = nvert-1; i < nvert; j = i++ ) {
      if ( ( ( verty[i] > testy ) != ( verty[j] > testy ) ) &&
        ( testx < ( vertx[j] - vertx[i] ) * ( testy - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
            c = !c;
      }
    }
    return c;
  }

  onPress( x, y ) {
    for (let i = 0, fillable; fillable = this.fillables[i]; i++) {
      if (this.isInPolygon( 3, fillable.x, fillable.y, x, y )) {
        this.makeNewTriangle( this.fillables.splice( i, 1 ) );
      }
    }
  }

  addTriangle( template ) {
    this.triangles.push( new Triangle( template.x, template.y, '#555' ) );
  }

  getLowestUnfilledTile( column ) {
    for (let i = this.rows-1; i > -1; i--) {
      let matches = this.getTrianglesInTile( column, i );
      if (matches.length == 4) continue;
      return { triangles: matches, row: i };
    }
  }

  getTrianglesInTile( row, column ) {
    const x1 = column * this.tileSize;
    const x2 = x1 + this.tileSize
    const y1 = (row * this.tileSize) + this.tileSize;
    const y2 = y1 - this.tileSize;

    return this.triangles.filter((triangle) => ( 
      triangle.x[0] >= x1 && triangle.x[0] <= x2 &&
      triangle.x[1] >= x1 && triangle.x[1] <= x2 &&
      triangle.x[2] >= x1 && triangle.x[2] <= x2 &&
      triangle.y[0] >= y1 && triangle.y[0] <= y2 &&
      triangle.y[1] >= y1 && triangle.y[1] <= y2 &&
      triangle.y[2] >= y1 && triangle.y[2] <= y2
    ));
  }

  render() {
    for (let i = 0, triangle; triangle = this.triangles[i]; i++) {
      triangle.render( ctx );
    }
  }

}