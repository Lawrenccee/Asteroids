const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");

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

Asteroid.prototype.isCollidedWith = function(otherObject) {
  if (this.radius + otherObject.radius >= Util.distance(this.pos, otherObject.pos)) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Bullet) {
      this.game.removeBullet(otherObject);
      this.game.remove(this);
    }
  }
};

module.exports = Asteroid;
