const audioCtx = new window.AudioContext();

function transformToArrayBuffer( response ) {
  return response.arrayBuffer();
}

function decodeAudioDataBuffer( buffer ) {
  return audioCtx.decodeAudioData( buffer );
}

export default class Sound {
  constructor( url ) {
    this.loaded = false;
    this.onload = () => undefined;
    this.source = audioCtx.createBufferSource();
    this.source.connect( audioCtx.destination );

    fetch( url )
      .then( transformToArrayBuffer )
      .then( decodeAudioDataBuffer  )
      .then( ( data ) => {
        this.source.buffer = data;
        this.loaded = true;
        this.onload && this.onload();
      } )
      .then( this.onload );
  }

  ready( callback ) {
    if ( this.loaded ) {
      callback();
    } else {
      this.onload = callback;
    }
  }

  play() {
    this.source.start( 0 );
  }
}
