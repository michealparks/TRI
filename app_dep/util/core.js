function randomInt(min, max) {
  return Math.floor(min+Math.random()*(max-min+1))
}

function randomFloat( min, max ) {
  return min + Math.random() * (max - min);
}

function clamp( x, min, max ) {
  return ( x < min ) ? min : ( ( x > max ) ? max : x );
};

export default {
  randomInt,
  randomFloat,
  clamp
}