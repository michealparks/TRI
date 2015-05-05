const scaleFactor = window.devicePixelRatio;

export default function one(ctx, size, done = () => 0) {

  const time = 900;
  const size = size || 150;

  let start;
  let progress;

  let oneFourth = size / 4 * scaleFactor;
  let threeFourth = size * 3 / 4 * scaleFactor;
  let oneHalf = size * 1 / 2 * scaleFactor;
  
  let lines = [{ 
    x1: 20,
    y1: oneFourth - 20, 
    x2: 0, 
    y2: oneFourth,
    x3: oneFourth,
    y3: 0,
  }, { 
    x1: oneFourth, 
    y1: threeFourth, 
    x2: oneFourth, 
    y2: threeFourth,
    x3: oneFourth,
    y3: 0,
  }, { 
    x1: 0, 
    y1: threeFourth, 
    x2: 0,
    y2: threeFourth,
    x3: oneHalf,
    y3: threeFourth,
  }];
  
  for (let i = 0, line; line = lines[i]; i++) {
    line.dx = (line.x3 - line.x1) / time;
    line.dy = (line.y3 - line.y1) / time;
  }

  function frame(stamp) {

    start = start || stamp;
    progress = stamp - start;

    for (let i = 0, line; line = lines[i]; i++) {
      line.x2 = Math.round( line.x1 + ( line.dx * progress ) );
      line.y2 = Math.round( line.y1 + ( line.dy * progress ) );

      if (progress > time) {
        line.x2 = line.x3;
        line.y2 = line.y3;
      }

      ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

      ctx.save();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#555555';
      ctx.translate(300, 500);
      
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    return progress > time? done(): window.requestAnimationFrame(frame);
  }
  
  return window.requestAnimationFrame(frame);
}