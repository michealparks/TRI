import Triangle from 'triangle/model';
import Grid     from 'grid/model';
import Color    from 'color/model';

const tileSize = Grid.tileSize;

let template = new Triangle( 0, 0, '#555' );
let fadeTemplate = new Triangle( 0, 0, '#555', 0 );

let toShow = true;
let currentColumn;

function update( column, row, dx, dy ) {
  const color = Color.upcoming();

  if (currentColumn !== column) {
    currentColumn = column;

    fadeTemplate.x[0] = template.x[0];
    fadeTemplate.x[1] = template.x[1];
    fadeTemplate.x[2] = template.x[2];
    fadeTemplate.y[0] = template.y[0];
    fadeTemplate.y[1] = template.y[1];
    fadeTemplate.y[2] = template.y[2];

    fadeTemplate.setColor( color, 0.5 );
    fadeTemplate.fadeOut();
  }

  template.setColor( color, 0.5 );
  template.setPointsFromRightAngle( column, row, dx, dy, tileSize );
}

function toggleVisibility( bool ) {
  toShow = bool;
}

function get() {
  return template;
}

function render(ctx, stamp) {
  if (toShow) {
    template.render( ctx );
  }

  fadeTemplate.render( ctx );
}

export default {
  update,
  get,
  toggleVisibility,
  render
};