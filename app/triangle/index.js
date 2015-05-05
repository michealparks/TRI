/*

vertex key:

x,y [1] | \
        |   \
        |     \
x,y [0] |_______\ x,y [2]

      0
      /\
    /    \
2 /________\ 1

*/

import Color from 'color/index';
import {easeOutQuint} from 'util/easing-curves';

export default class Triangle {

  constructor( x = [0,0,0], y = [0,0,0], color = '#555', alpha = 1, col, row, type ) {

    // The first three indices store rendering coordinates.
    // The last three store a cache of the position while animating.
    this.x = new Int16Array(6);
    this.y = new Int16Array(6);

    this.col = col;
    this.row = row;

    this.type = type;

    this.color = color;
    this.alpha = alpha;
    
    this.setColor( this.color );

    this.neighbors = {
      '0,1': undefined,
      '0,2': undefined,
      '1,2': undefined
    };

    for (let i = 0; i < 3; i++) {
      this.x[i] = this.x[i+3] = x[i];
      this.y[i] = this.y[i+3] = y[i];
    }
  }

  setColor( hex, alpha = 1 ) {
    const rgb  = Color.hexToRgb( hex );
    this.red   = rgb.r;
    this.green = rgb.g;
    this.blue  = rgb.b;
    this.alpha = alpha;
  }

  render( ctx ) {
    const color = `rgba( ${this.red}, ${this.green}, ${this.blue}, ${this.alpha} )`;

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo( this.x[0], this.y[0] );
    ctx.lineTo( this.x[1], this.y[1] );
    ctx.lineTo( this.x[2], this.y[2] );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  fadeIn( end = 1 ) {

    let increment = () => {
      this.alpha += 0.02;
      if (this.alpha >= end) { this.alpha = end; }
      else window.setTimeout(increment, 1000/60);
    }

    increment();
  }

  fadeOut( end = 0 ) {

    let increment = () => {
      this.alpha -= 0.02;
      if (this.alpha <= end) this.alpha = end;
      else window.setTimeout(increment, 1000/60);
    }

    increment();
  }

  grow() {

    let start = Date.now();

    let lowestIndex = 0;
    let lowestX = 0;
    let lowestY = 0;
    let time = 300;
    let xStep = [];
    let yStep = [];

    for (let i = 1; i < 3; i++) {
      if (this.y[i] > this.y[lowestIndex]) lowestIndex = i;
    }

    lowestX = this.x[lowestIndex];
    lowestY = this.y[lowestIndex];

    for (let i = 0; i < 3; i++) {
      this.x[i] = this.x[lowestIndex];
      this.y[i] = this.y[lowestIndex];

      xStep[i] = (this.x[i+3] - this.x[i]) / time;
      yStep[i] = (this.y[i+3] - this.y[i]) / time;

    }

    let increment = () => {
      const progress = Date.now() - start;
      const coef = easeOutQuint( progress / time );

      for (let i = 0; i < 3; i++) {
        this.x[i] = lowestX + (xStep[i] * progress * coef);
        this.y[i] = lowestY + (yStep[i] * progress * coef);

        if (xStep[i] > 0 && this.x[i] > this.x[i+3]) this.x[i] = this.x[i+3];
        if (xStep[i] < 0 && this.x[i] < this.x[i+3]) this.x[i] = this.x[i+3];
        if (yStep[i] > 0 && this.y[i] > this.y[i+3]) this.y[i] = this.y[i+3];
        if (yStep[i] < 0 && this.y[i] < this.y[i+3]) this.y[i] = this.y[i+3];
      }

      if (progress >= time) return;
      else window.setTimeout(increment, 1000/60);
    }

    increment();
  }

  setPointsFromRightAngle( col, row, dx, dy, tileSize ) {
    const half = tileSize / 2;

    this.col = col;
    this.row = row;

    this.x[0] = this.x[3] = (col * tileSize) + half;
    this.x[1] = this.x[4] = this.x[0] + (half * (dx != 0? dx: -dy));
    this.x[2] = this.x[5] = this.x[0] + (half * (dx != 0? dx:  dy));

    this.y[0] = this.y[3] = (row * tileSize) + half;
    this.y[1] = this.y[4] = this.y[0] + (half * (dy != 0? dy: -dx));
    this.y[2] = this.y[5] = this.y[0] + (half * (dy != 0? dy:  dx));

    this.type = this.x[1] < this.x[0] && this.x[2] > this.x[0]? 0:
                this.y[2] < this.y[0] && this.y[1] > this.y[0]? 1:
                this.y[1] < this.y[0] && this.y[2] > this.y[0]? 2:
                                                                3;
  }


}