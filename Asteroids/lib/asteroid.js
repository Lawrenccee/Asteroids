const Util = require("./util");
const MovingObject = require("./moving_object");

function Asteroid(pos, game) {
  Asteroid.COLOR = "#ff6600";
  Asteroid.RADIUS = (Math.random() * 30) + 20;

  MovingObject.call(this,
    { color: Asteroid.COLOR,
      pos,
      vel: Util.randomVec((Math.random() * 7) + 4),
      radius: Asteroid.RADIUS,
      game
    });

}
Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
