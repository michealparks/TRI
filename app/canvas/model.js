import GLOBAL from 'global';

const canvas = document.querySelector('#main-canvas');

canvas.ctx   = canvas.getContext('2d');
canvas.width = GLOBAL.width * GLOBAL.scaleFactor;
canvas.height = GLOBAL.height * GLOBAL.scaleFactor;

export default canvas;