/*

Dependency Chain:


---triangle---
|            | 
|           grid  
|            |
game-controller
|
user-input------------
|               
app

*/

import Input  from 'user-input/model';
import Render from 'render/model';
import Timer  from 'timer/model';

function startLevel() {
  Input.resume();
  Render.resume();
  Timer.start(5000, stopLevel);
}

function stopLevel() {
  Input.pause();
  Render.pause();
}

startLevel();


