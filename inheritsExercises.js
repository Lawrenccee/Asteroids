Function.prototype.inherits = function(Parent) {
  function Surrogate() {}
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject() {
  this.name = "airplane";
}

MovingObject.prototype.fly = function() {
  console.log("Flying");
};

function Ship() {
  MovingObject.call(this);
}
Ship.inherits(MovingObject);

Ship.prototype.float = function() {
  console.log("float");
};

function Asteroid() {
  MovingObject.call(this);
}
Asteroid.inherits(MovingObject);

Asteroid.prototype.crash = function() {
  console.log("crash");
};

const move = new MovingObject();
const ship = new Ship();
const asteroid = new Asteroid();

move.fly();
ship.float();
ship.fly();
asteroid.crash();
ship.crash();
