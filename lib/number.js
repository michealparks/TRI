Number.randomFloat = function randomFloat( min, max ) {
  return min + Math.random() * (max - min);
};

Number.randomInt = function randomInt( min, max ) {
  return Math.floor( min + Math.random() * (max - min+1) );
}