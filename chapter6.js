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

// StretchCell wrapper

function StretchCell(inner, minW, minH) {
  this.inner = inner;
  this.minW = minW;
  this.minH = minH;
}
StretchCell.prototype.minWidth = function() {
  if (this.inner.minWidth() <= this.minW)
    return this.minW;
  else
    return this.inner.minWidth();
};
StretchCell.prototype.minHeight = function() {
    if (this.inner.minHeight() <= this.minH)
    return this.minH;
  else
    return this.inner.minHeight();
};
StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width,height);
};

// A more concise version of the minWidth/Height functions of the above

StretchCell.prototype.minWidth = function() {
  return Math.max(this.minW, this.inner.minWidth())
};
StretchCell.prototype.minHeight = function() {
  return Math.max(this.minH, this.inner.minHeight())
};

// Sequence interface, implemented for arrays and ranges(ranges construced by the sequence object)

function ArraySeq(array) {
  this.seqObj = array;
  this.length = array.length;
}
function RangeSeq(from, to) {
  this.makeRange = function(from, to) {
    var range = [];
    for (var i = from; i < to - from; i++) {
      range.push(i);
    }
    return range;
  };
  this.seqObj = this.makeRange(from, to);
  this.length = this.seqObj.length;
}
function logFive(sequence) {
  var length = Math.min(5, sequence.length);
  for (var i = 0; i < length; i++) {
    console.log(sequence.seqObj[i]);
  }
}
