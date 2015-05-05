import Color from 'color/model';

import _ from 'util/core';

const {clamp, randomInt, randomFloat} = _;

/**
 * A stripped down triangle class for title animation
 */
export default class Triangle {
  constructor(x, y) {
    this.x = [0, 100, 0];
    this.y = [0, 0, 100];

    this.color = Color.random();

    this.start    = undefined;
    this.progress = undefined;
    this.switch   = true;

    this.time = 8000;

    this.rotation = randomInt( 0, 360 );

    this.translateX = x;
    this.translateY = y;

    this.dx = randomInt( -3, 3 );
    this.dy = randomInt( -3, 3 );
    this.dr = randomFloat( -0.05, 0.05 );
    this.do = 0.005;

    this.opacity = 0;
  }

  update(stamp) {
    this.start = this.start || stamp;

    this.progress = stamp - this.start;

    this.translateX += this.dx;
    this.translateY += this.dy;
    this.rotation   += this.dr;

    this.opacity = clamp( this.opacity + this.do, 0, 1 );

    if (this.switch && 
        this.progress > this.time / 2) {
      this.do = -this.do;
      this.switch = false;
    }

    return this;
  }

  render(ctx) {
    ctx.save();

    ctx.globalAlpha = this.opacity;
    ctx.translate( this.translateX, this.translateY );
    ctx.rotate( this.rotation );

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo( this.x[0] - 25, this.y[0] - 25 );
    ctx.lineTo( this.x[1] - 25, this.y[1] - 25 );
    ctx.lineTo( this.x[2] - 25, this.y[2] - 25 );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    return this;
  }

}