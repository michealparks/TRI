import Intro from 'chapters/intro';
import test from 'chapters/square/test';

const stages = [
  {
    title: 'One',
    description: 'Create a square of any color.',
    specific: `

<style>@keyframes spin {
  0%   { opacity: 0; transform: translate(-100px) rotate(0) }
  20%  { opacity: 1; }
  95%  { transform: translate(0) rotate(360deg) }
  100% { transform: translate(0) rotate(360deg) }
}
#derp {
  position: relative;
  margin: auto;
  background-color: #1ABC9C;
  height: 30px;
  width: 30px;
  animation-name: spin;
  animation-duration: 1400ms;
  animation-iteration-count: 1;
}</style>
<div id="derp"></derp>`,

    requirements: {
      n: 1,
      color: undefined
    },
    nextStage: 1
  },

  {
    title: 'Two',
    description: 'Create three squares of any color',
    specific: '',
    requirements: {
      n: 3,
      color: undefined
    },
    nextStage: undefined
  }
];

let currentStage;
let done;
let start;
let stop;

function onMove() {
  const requirements = currentStage.requirements;

  let squares = test(currentStage.requirements);

  if (squares[0] === undefined) { return; }

  if (currentStage.nextStage === undefined) { return done(); }

  loadStage( currentStage.nextStage );
}

function loadStage(stage) {
  currentStage = stages[stage];
  Intro.open( currentStage, start, stop );
}

function resume(stage, cb, startLevel, stopLevel) {
  done = cb;
  start = startLevel;
  stop = stopLevel;
  loadStage(stage);
}

export default {
  onMove,
  resume,
  nextChapter: 'triangle'
}