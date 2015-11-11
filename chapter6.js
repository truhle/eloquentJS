// vector constructor with plus, minus methods and length getter property

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(vect) {
  this.x += vect.x;
  this.y += vect.y;
  return this;
};
Vector.prototype.minus = function(vect) {
  this.x -= vect.x;
  this.y -= vect.y;
  return this;
};
Object.defineProperty(Vector.prototype, "length", {
  get: function() { return Math.sqrt(this.x * this.x + this.y * this.y) }
});

// pure functions for the plus and minus methods

Vector.prototype.plus = function(vect) {
  return new Vector(this.x + vect.x, this.y + vect.y);
};
Vector.prototype.minus = function(vect) {
  return new Vector(this.x - vect.x, this.y - vect.y);
};
