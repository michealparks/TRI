/*

point key:

x,y [1] | \
        |   \
        |     \
x,y [0] |_______\ x,y [2]

*/

export default class Triangle {
  constructor( x, y, color ) {
    this.x = new Uint16Array(3);
    this.y = new Uint16Array(3);

    for (let i = 0; i < 3; i++) {
      this.x[i] = x[i];
      this.y[i] = y[i];
    }

    this.color = color || '#555';
  }

  render( ctx ) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo( this.x[0], this.y[0] );
    ctx.lineTo( this.x[1], this.y[1] );
    ctx.lineTo( this.x[2], this.y[2] );
    ctx.closePath();
    ctx.fill();
  }
}