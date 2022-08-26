function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

Vector2.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.add = function (otherVector) {
  this.x += otherVector.x;
  this.y += otherVector.y;
  return this;
};

Vector2.prototype.sub = function (otherVector) {
  this.x -= otherVector.x;
  this.y -= otherVector.y;
  return this;
};

function Vector3(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

Vector3.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector3.prototype.add = function (otherVector) {
  this.x += otherVector.x;
  this.y += otherVector.y;
  this.z += otherVector.z;
  return this;
};

Vector3.prototype.sub = function (otherVector) {
  this.x -= otherVector.x;
  this.y -= otherVector.y;
  this.z -= otherVector.z;
  return this;
};

function LineSegment(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
}

LineSegment.prototype.length = function () {
  return Math.sqrt(
    Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2)
  );
};

function Dot(x, y) {
  this.x = x;
  this.y = y;
}

function Polygon(...vectors) {
  this.vectors = vectors;
}

Polygon.prototype.square = function () {
  const array = [...this.vectors];
  let result = 0;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array[i].length - 1; j++) {
      result =
        result +
        (array[i][0] * array[i + 1][j + 1] - array[i][j + 1] * array[i + 1][0]);
    }
  }
  return Math.abs(result) / 2;
};

function distance(obj1, obj2) {
  if (obj1.hasOwnProperty("z") && obj2.hasOwnProperty("z")) {
    return Math.sqrt(
      Math.pow(obj2.x - obj1.x, 2) +
        Math.pow(obj2.y - obj1.y, 2) +
        Math.pow(obj2.z - obj1.z, 2)
    );
  }
  return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
}

function init() {
  console.log(new Vector2(1, 2));
  console.log(distance(new Vector3(4, -6, 3), new Vector3(-1, 5, -4)));
  console.log(distance(new Dot(1, 1), new Vector2(1, 3)));
  console.log(new Vector2(2, 3).add(new Vector2(1, 1)));
  console.log(new Vector2(1, 2).length());
  console.log(new LineSegment(2, 4, 4, 1).length());
  console.log(new Polygon([1, 2], [2, 4]));
  console.log(new Polygon([2, 4], [3, -8], [1, 2], [2, 4]).square());
}

init();
