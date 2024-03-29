window.AudioContext = (function() {
    return window.AudioContext  || 
      window.webkitAudioContext || 
      window.mozAudioContext    || 
      window.oAudioContext;
})();

window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame  || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ) { window.setTimeout(callback, 1000 / 60); };
})();