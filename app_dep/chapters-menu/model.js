const rootNode      = document.querySelector( '#chapters-menu' );
const titleNode     = rootNode.querySelector( '.chapter-title' );
const animationNode = rootNode.querySelector( '.chapter-animation' );
const levelsNode    = rootNode.querySelector( '.levels' );

function load( chapter ) {
  titleNode.innerHTML = chapter.title;

  chapter.animation(animationNode);
}

export default {
  load
}

