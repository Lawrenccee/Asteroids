const MovingObject = require("./moving_object");
const Util = require("./util");

function Bullet(options) {
  Bullet.RADIUS = 5;
  Bullet.COLOR = "#42f486";

  MovingObject.call(this, options);

  this.color = Bullet.COLOR;
  this.radius = Bullet.RADIUS;
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

Bullet.SPEED = 10;
module.exports = Bullet;
