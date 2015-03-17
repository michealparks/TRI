import GLOBAL         from 'global';
import device         from 'device';
import canvas         from 'canvas/model';
import GameController from 'game-controller/model';

let ptrIsDown = false;

canvas.addEventListener(device.ptrdown, (e) => {
  console.log(e);

  GameController.mapGeneralLocation(e);
  ptrIsDown = true;
});

canvas.addEventListener(device.ptrmove, (e) => {
  if (ptrIsDown) {
    GameController.mapGeneralLocation(e);
  }
})

canvas.addEventListener(device.ptrup, (e) => {
  GameController.addTriangle(e);
  ptrIsDown = false;
});