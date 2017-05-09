function Vec2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vec2.prototype.clone = function clone() {
  return new Vec2(this.x, this.y);
};

Vec2.prototype.length = function length() {
  return Math.sqrt((this.x*this.x)+(this.y*this.y));
};

Vec2.prototype.add = function add(smallVec) {
  this.x += smallVec.x;
  this.y += smallVec.y;
  return this;
};

Vec2.prototype.sub = function sub(smallVec) {
  this.x -= smallVec.x;
  this.y -= smallVec.y;
  return this;
};

Vec2.prototype.scale = function scale(burrito) {
  this.x *= burrito;
  this.y *= burrito;
  return this;
};

Vec2.prototype.normalize = function normalize() {
  if (this.x == 0 && this.y == 0) {
    this.x = 0;
    this.y = -1;
  }
  else {
    this.scale(1/this.length());
  }
  return this;
};

Vec2.prototype.rotate = function rotate(radical) {
  var x = this.x;
  var y = this.y;
  this.x = x * Math.cos(radical) - y * Math.sin(radical);
  this.y = y * Math.cos(radical) - x * Math.sin(radical);
  return this;
};
