import Level from 'level/index';

const chapterContainer = document.querySelector( '#chapters' );

const state = chapterContainer.dataset;

let section = 'square';

let height = 550

chapterContainer.addEventListener( 'touchmove', onTouchMove );
chapterContainer.addEventListener( 'touchend', onTouchEnd );

function onTouchMove( e ) {
  const scroll = this.scrollTop;

  console.log( scroll )

  if ( scroll > 0 && scroll < height && section !== 'square' ) {
    state.section = section = 'square';
  } else if ( scroll > height && scroll < height*2 && section !== 'triangle' ) {
    state.section = section = 'triangle';
  } else if ( scroll > height*2 && scroll < height*3 && section !== 'diamond' ) {
    state.section = section = 'diamond';
  } else if ( scroll > height*3 && scroll < height*4 && section !== 'shade' ) {
    state.section = section = 'shade';
  }

}

function onTouchEnd( e ) {
  const scroll = this.scrollTop;
  const px = Math.round( scroll / 600 ) * 600;

  scrollToPixel( px, ( px - scroll > 0 )? 10: -10 );
}

function frame() {

}

function scrollToPixel( px, dir ) {


  function frame() {

    chapterContainer.scrollTop += dir;

    if ( Math.abs( chapterContainer.scrollTop - px ) < 15 ) {
      return chapterContainer.scrollTop = px;
    } else {
      return window.requestAnimationFrame( frame );
    }
  }

  return window.requestAnimationFrame( frame );

}

export default {}