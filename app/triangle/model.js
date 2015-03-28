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

import Color from 'color/model';

export default class Triangle {
  constructor( x = [0,0,0], y = [0,0,0], color) {
    this.x = new Uint16Array(3);
    this.y = new Uint16Array(3);

    this.color = color || '#555';
    
    const rgb  = Color.hexToRgb(this.color);
    this.red   = rgb.r;
    this.green = rgb.g;
    this.blue  = rgb.b;
    this.alpha = 1;

    for (let i = 0; i < 3; i++) {
      this.x[i] = x[i];
      this.y[i] = y[i];
    }
  }

  render( ctx ) {
    const color = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha}`;

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

  fadeIn(ctx) {
    this.alpha = 0;

    let frame = () => {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      this.render(ctx);
      ctx.restore();
      this.alpha += 0.025

      if (this.alpha >= 1) this.alpha = 1;
      else window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  fadeOut() {
    let timeout = () => {
      this.alpha -= 0.05;
      if (this.alpha <= 0) this.alpha = 0;
      else (window.setTimeout(timeout, 20));
    }

    window.setTimeout(timeout, 20);
  }

  setPointsFromRightAngle( col, row, dx, dy, tileSize ) {
    const half = tileSize / 2;

    this.x[0] = (col * tileSize) + half;
    this.x[1] = this.x[0] + (half * (dx != 0? dx: -dy));
    this.x[2] = this.x[0] + (half * (dx != 0? dx:  dy));

    this.y[0] = (row * tileSize) + half;
    this.y[1] = this.y[0] + (half * (dy != 0? dy: -dx));
    this.y[2] = this.y[0] + (half * (dy != 0? dy:  dx));
  }
}