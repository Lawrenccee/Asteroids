const MovingObject = require("./moving_object");
const Util = require("./util");


function Ship(game) {
  Ship.RADIUS = 15;
  Ship.COLOR = "#3366ff";

  MovingObject.call(this,
    { color: Ship.COLOR,
      pos: game.randomPosition(),
      vel: 0,
      radius: Ship.RADIUS,
      game
    });
}

Util.inherits(Ship, MovingObject);
module.exports = Ship;
