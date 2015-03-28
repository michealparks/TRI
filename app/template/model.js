import Triangle from 'triangle/model';
import Grid     from 'grid/model';

const tileSize = Grid.tileSize;

let template = new Triangle(0, 0, '#555');
let fadeTemplate = new Triangle(0, 0, '#555');

let toShow = false;
let currentColumn = null;

function update( column, row, dx, dy ) {
  template.color = '#555'
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
}

export default {
  update,
  get,
  toggleVisibility,
  render
};