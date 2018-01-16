const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");

function Ship(game) {
  Ship.RADIUS = 15;
  Ship.COLOR = "#3366ff";

  MovingObject.call(this,
    { color: Ship.COLOR,
      pos: game.randomPosition(),
      vel: [0, 0],
      radius: Ship.RADIUS,
      game
    });
}
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function() {
  if (this.vel[0] === 0 && this.vel[1] === 0) {
    return;
  }

  const bulletVel = this.vel.slice(0);

  if (this.vel[0] > 0) {
    bulletVel[0] += Bullet.SPEED;
  }
  if (this.vel[0] < 0) {
    bulletVel[0] -= Bullet.SPEED;
  }
  if (this.vel[1] > 0) {
    bulletVel[1] += Bullet.SPEED;
  }
  if (this.vel[1] < 0) {
    bulletVel[1] -= Bullet.SPEED;
  }

  const bullet = new Bullet({
    game: this.game,
    pos: this.pos.slice(0),
    vel: bulletVel
  });

  this.game.addBullet(bullet);
};

module.exports = Ship;
