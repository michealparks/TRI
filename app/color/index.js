import {randomInt} from 'util/core';

const regex1 = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const regex2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const colors = [
  '#1ABC9C',
  '#2ECC71',
  '#3498DB',
  '#9B59B6',
  '#34495E',
  '#E67E22',
  '#E74C3C'
];

let currentColor = random();

function random() {
  return colors[ randomInt( 0, colors.length-1 ) ];
}

function hexToRgb( hex ) {
  hex = hex.replace( regex1, ( m, r, g, b ) => r + r + g + g + b + b );

  let result = regex2.exec( hex );
  
  return result ? {
    r: parseInt( result[1], 16 ),
    g: parseInt( result[2], 16 ),
    b: parseInt( result[3], 16 )
  } : undefined;
}

function current( format ) {
  return ( format === 'hex' )? currentColor: hexToRgb( currentColor );
}

function randomize() {
  currentColor = random();
}

export default {
  random,
  hexToRgb,
  current,
  randomize
}