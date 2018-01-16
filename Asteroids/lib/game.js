const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game() {
  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 9;
  this.asteroids = this.addAsteroids.call(this);
  this.ship = new Ship(this);
}

Game.prototype.addAsteroids = function() {
  const asteroids = [];

  for (let i = 0; i < Game.NUM_ASTEROIDS; ++i) {
    asteroids.push(new Asteroid(this.randomPosition(), this));
  }

  return asteroids;
};

Game.prototype.randomPosition = function() {
  const x = Math.floor(Math.random() * Game.DIM_X);
  const y = Math.random() * Game.DIM_Y;

  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 1000, 700);

  this.ship.draw(ctx);

  this.asteroids.forEach((asteroid) => {
      asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((asteroid) => {
      asteroid.move();
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

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.asteroids.length; ++i) {
    for (let j = i + 1; j < this.asteroids.length; ++j) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        this.remove(this.asteroids[i]);
        this.remove(this.asteroids[j]);
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

module.exports = Game;
