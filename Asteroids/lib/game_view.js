const Game = require("./game");

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
