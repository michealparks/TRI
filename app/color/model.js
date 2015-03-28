import _ from 'util/core';

const colors = [
  '#1ABC9C',
  '#2ECC71',
  '#3498DB',
  '#9B59B6',
  '#34495E',
  '#E67E22',
  '#E74C3C'
];

let color = randomColor();

function randomColor() {
  return colors[ _.randomInt( 0, colors.length-1 ) ];
}

function hexToRgb( hex ) {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
  return result ? {
    r: parseInt( result[1], 16 ),
    g: parseInt( result[2], 16 ),
    b: parseInt( result[3], 16 )
  } : null;
}

function upcoming() {
  return color;
}

function randomize() {
  color = randomColor()
}

export default {
  hexToRgb,
  upcoming,
  randomize
};