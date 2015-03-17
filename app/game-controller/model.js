import GLOBAL   from 'global';
import canvas   from 'canvas/model';
import Grid     from 'grid/model';
import Triangle from 'triangle/model';

const scaleFactor = GLOBAL.scaleFactor;
const ctx         = canvas.ctx;


let grid;
let template = new Triangle(0, 0);

function startGame() {
  grid = new Grid();
}

function mapGeneralLocation( e ) {
  console.log(e);
  const x = (e.touches[0]? e.touches[0].pageX: e.pageX) * scaleFactor;
  const y = (e.touches[0]? e.touches[0].pageY: e.pageY) * scaleFactor;

  const tileSize = grid.tileSize;
  const column   = Math.floor( x / tileSize );
  const row      = Math.floor( y / tileSize );
  const tileX    = x % tileSize;
  const tileY    = y % tileSize;
  console.log(x, Math.floor(x/tileSize))

  const area1prox = Math.abs( tileX - ( tileSize * ( column + 1 ) ) );
  const area2prox = Math.abs( tileX - ( ( tileSize / 2 ) * ( column + 1 ) ) )

  mapTileLocation( row, column, tileX, tileY, area1prox < area2prox? 0: grid.tileSize / 2 )
}

/*
_________
|        |
|        |
|________|

point key:

x,y [1] | \
        |   \
        |     \
x,y [0] |_______\ x,y [2]

*/
function mapTileLocation( row, column, tileX, tileY, offSet ) {
  const tileSize   = grid.tileSize;
  const columnData = grid.getLowestUnfilledTile( column );

  row = columnData.row

  const triangles = grid.getTrianglesInTile( row + offSet, column );

  //if (triangles.length == 0) {
    
    template.x[0] = (column * tileSize) + tileSize / 2;
    template.x[1] = column * tileSize;
    template.x[2] = (column * tileSize) + tileSize;
    template.y[0] = (row * tileSize) + tileSize / 2;
    template.y[1] = (row * tileSize) + tileSize;
    template.y[2] = (row * tileSize) + tileSize;

 // }

  for (let i = 0, triangle; triangle = triangles[i]; i++) {
    if (triangle.x[2] == tileX && triangle.x[1] == tileX + tileSize) {

      break;
    }
  }

  renderUpdate()

}

function addTriangle() {
  grid.addTriangle( template );
  renderUpdate();
}

function renderUpdate() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  template.render( ctx );
  grid.render();
}

export default {
  startGame,
  mapGeneralLocation,
  addTriangle
};


