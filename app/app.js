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

import 'user-input/model'
import GameController from 'game-controller/model';

GameController.startGame();


