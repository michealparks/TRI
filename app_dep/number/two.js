const scaleFactor = window.devicePixelRatio;

export default function two(ctx, size, done) {

  var time = 1200;
  var radius = 75;

  var arc1 = {};
  var arc2 = {};
  var line1 = {};

  arc1.start = arc1.anim = Math.PI;
  arc1.end = 5 * Math.PI / 2;
  arc1.d = (arc1.end - arc1.start) / time;

  arc2.start = arc2.anim = 3 * Math.PI / 2;
  arc2.end = Math.PI - 0.025;
  arc2.d = (arc2.end - arc2.start) / time;

  line1.x1 = line1.animX = 0;
  line1.y1 = line1.animY = radius * 3;
  line1.x2 = radius * 2;
  line1.y2 = radius * 3;
  line1.dx = (line1.x2 - line1.x1) / time;
  line1.dy = (line1.y2 - line1.y1) / time;

  var start;
  var progress;
      
  function frame(stamp) {
    start = start || stamp;
    progress = stamp - start;
    
    if (progress > time) {
      arc1.anim = arc1.end;
      arc2.anim = arc2.end;
      line1.animX = line1.x2;
      line1.animY = line1.y2;
    } else {
      arc1.anim = arc1.start + arc1.d * progress;
      arc2.anim = arc2.start + arc2.d * progress;
      line1.animX = Math.round(line1.x1 + line1.dx * progress);
      line1.animY = Math.round(line1.y1 + line1.dy * progress);
    }
    
    ctx.clearRect(0, 0, 300, 300);

    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#555555';
    ctx.translate(300, 500);
    
    ctx.beginPath();
    ctx.arc(radius, radius + 10, radius - 10, arc1.start, arc1.anim , false);
    ctx.moveTo(radius, radius * 2);
    ctx.arc(radius, radius + radius * 2, radius, arc2.start, arc2.anim , true);
    ctx.moveTo(0, radius + radius * 2);
    ctx.lineTo(line1.animX, line1.animY);
    ctx.stroke();

    return progress > time? done(): window.requestAnimationFrame(frame);
    
  }

  window.requestAnimationFrame(frame);
}