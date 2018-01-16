const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game() {
  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 8;
  this.asteroids = this.addAsteroids();
  this.ship = new Ship(this);
  this.bullets = [];
}

Game.prototype.addAsteroids = function() {
  const asteroids = [];

  for (let i = 0; i < Game.NUM_ASTEROIDS; ++i) {
    asteroids.push(new Asteroid(this.randomPosition(), this));
  }

  return asteroids;
};

Game.prototype.addBullet = function(bullet) {
  this.bullets.push(bullet);
};

Game.prototype.randomPosition = function() {
  const x = Math.floor(Math.random() * Game.DIM_X);
  const y = Math.random() * Game.DIM_Y;

  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 1000, 700);

  this.allObjects().forEach((item) => {
      item.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach((item) => {
      item.move();
  });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] < 0) {
    pos[0] = Game.DIM_X;
  }

  if (pos[0] > Game.DIM_X) {
    pos[0] = 0;
  }

  if (pos[1] < 0) {
    pos[1] = Game.DIM_Y;
  }

  if (pos[1] > Game.DIM_Y) {
    pos[1] = 0;
  }
  return pos;
};

Game.prototype.isOutOfBounds = function(pos) {
  if (pos[0] < 0) {
    return true;
  }
  if (pos[0] > Game.DIM_X) {
    return true;
  }
  if (pos[1] < 0) {
    return true;
  }
  if (pos[1] > Game.DIM_Y) {
    return true;
  }

  return false;
};

Game.prototype.checkCollisions = function () {
  const objs = this.allObjects();

  for (let i = 0; i < objs.length; ++i) {
    for (let j = i + 1; j < objs.length; ++j) {
      if (objs[i].isCollidedWith(objs[j])) {
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  const idx = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(idx, 1);
};

Game.prototype.removeBullet = function(bullet) {
  const idx = this.bullets.indexOf(bullet);
  this.bullets.splice(idx, 1);
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

module.exports = Game;
