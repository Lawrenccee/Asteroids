/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  inherits: function(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },
  randomVec: function(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale: function(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  distance: function(pos1, pos2) {
    return Math.sqrt((pos1[0] - pos2[0]) * (pos1[0] - pos2[0]) + (pos1[1] - pos2[1]) * (pos1[1] - pos2[1]));
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (!this.isWrappable && this.game.isOutOfBounds(this.pos)) {
    this.game.removeBullet(this);
  }
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
};

MovingObject.prototype.isWrappable = true;

module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const gameView = new GameView(ctx);
  gameView.start();
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();

  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  const moves = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0]
  };

  Object.keys(moves).forEach((el) => {
    key(el, () => {
      this.game.ship.power(moves[el]);
    });
  });

  key("space", () => {
    this.game.ship.fireBullet();
  });
};

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(5);
const Ship = __webpack_require__(6);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);
const Bullet = __webpack_require__(7);

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

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


/***/ })
/******/ ]);