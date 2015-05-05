import square from 'chapters/square/model';

let chapters = {
  square
};

let currentChapter;

function onMove() {
  currentChapter.onMove();
}

function onChapterCompleted() {
  load( currentChapter.nextChapter );
}

function load(chapter, startLevel, stopLevel) {
  currentChapter = chapters[chapter];
  currentChapter.resume( 0, onChapterCompleted, startLevel, stopLevel );
}

export default {
  onMove,
  load
}