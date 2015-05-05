let audioContext = new window.AudioContext();
let audioBuffer;
let source;

function base64ToBuffer(base64) {
    var binary = window.atob(base64);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0, l = buffer.byteLength; i < l; i++) {
        bytes[i] = binary.charCodeAt(i) & 0xFF;
    }
    return buffer;
};


function initSound(base64String, done) {
  const buff = base64ToBuffer(base64String);

  audioContext.decodeAudioData(buff, function (buffer) {
      audioBuffer = buffer;

      done();

  }, function (e) {
      console.log('Error decoding file', e);
  });
}

function playSound() {
  source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = false;
  source.connect(audioContext.destination);
  source.start(0);
}

initSound(document.querySelector('#song-intro').getAttribute('data-audio'), playSound);

