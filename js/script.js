function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

Vector2.prototype.getLength = function () {
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

function Vector3(x, y, z, w = 1) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
}

Vector3.prototype.getLength = function () {
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

Vector3.prototype.multiplyByScalar = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  this.z *= scalar;

  return this;
};

function LineSegment(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
}

LineSegment.prototype.getLength = function () {
  return Math.sqrt(
    Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2)
  );
};

function Point(x, y, z = 0) {
  this.x = x;
  this.y = y;
  this.z = z;
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

function Matrix(matrix) {
  this.matrix = matrix;
}

Matrix.prototype.multiplyMatrix = function (matrixB) {
  const result = new Array(this.matrix.length);

  for (let row = 0; row < this.matrix.length; row++) {
    result[row] = new Array(matrixB[0].length);

    for (let column = 0; column < matrixB[0].length; column++) {
      result[row][column] = 0;

      for (let i = 0; i < this.matrix[0].length; i++) {
        result[row][column] += this.matrix[row][i] * matrixB[i][column];
      }
    }
  }

  return result;
};

Matrix.prototype.multiplyVector = function (vector) {
  return new Vector3(
    this.matrix[0][0] * vector.x +
      this.matrix[0][1] * vector.y +
      this.matrix[0][2] * vector.z +
      this.matrix[0][3] * vector.w,
    this.matrix[1][0] * vector.x +
      this.matrix[1][1] * vector.y +
      this.matrix[1][2] * vector.z +
      this.matrix[1][3] * vector.w,
    this.matrix[2][0] * vector.x +
      this.matrix[2][1] * vector.y +
      this.matrix[2][2] * vector.z +
      this.matrix[2][3] * vector.w,
    this.matrix[3][0] * vector.x +
      this.matrix[3][1] * vector.y +
      this.matrix[3][2] * vector.z +
      this.matrix[3][3] * vector.w
  );
};

Matrix.prototype.getTranslation = function (dx, dy, dz) {
  return [
    [1, 0, 0, dx],
    [0, 1, 0, dy],
    [0, 0, 1, dz],
    [0, 0, 0, 1],
  ];
};

Matrix.prototype.getScale = function (sx, sy, sz) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1],
  ];
};

Matrix.prototype.getRotationX = function (angle) {
  const rad = (Math.PI / 180) * angle;

  return [
    [1, 0, 0, 0],
    [0, Math.cos(rad), -Math.sin(rad), 0],
    [0, Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 0, 1],
  ];
};

Matrix.prototype.getRotationY = function (angle) {
  const rad = (Math.PI / 180) * angle;

  return [
    [Math.cos(rad), 0, Math.sin(rad), 0],
    [0, 1, 0, 0],
    [-Math.sin(rad), 0, Math.cos(rad), 0],
    [0, 0, 0, 1],
  ];
};

Matrix.prototype.getRotationZ = function (angle) {
  const rad = (Math.PI / 180) * angle;

  return [
    [Math.cos(rad), -Math.sin(rad), 0, 0],
    [Math.sin(rad), Math.cos(rad), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};

function Sphere(center = new Vector3(), radius) {
  this.center = center;
  this.radius = radius;
}

Sphere.prototype.square = function () {
  return 4 * Math.PI * Math.pow(this.radius, 2);
};

Sphere.prototype.distanceToPoint = function (point = new Point()) {
  return Math.sqrt(
    Math.pow(point.x - this.center.x, 2) +
      Math.pow(point.y - this.center.y, 2) +
      Math.pow(point.z - this.center.z, 2)
  );
};

function Drawer(canvas, width, height) {
  this.canvas = canvas;
  this.width = width;
  this.height = height;
}

Drawer.prototype.clearCanvas = function () {
  const canvasSize = this.width * this.height * 4;
  for (let i = 0; i < canvasSize; i++) {
    this.canvas[i] = 0;
  }
};

Drawer.prototype.drawPixel = function (x, y, r, g, b) {
  const offset = (this.width * -y + x) * 4;

  if (x >= 0 && x < this.width && -y >= 0 && y < this.height) {
    this.canvas[offset] = r;
    this.canvas[offset + 1] = g;
    this.canvas[offset + 2] = b;
    this.canvas[offset + 3] = 255;
  }
};

Drawer.prototype.drawLine = function (x1, y1, x2, y2, r = 0, g = 0, b = 0) {
  const round = Math.trunc;
  x1 = round(x1);
  y1 = round(y1);
  x2 = round(x2);
  y2 = round(y2);

  const c1 = y2 - y1;
  const c2 = x2 - x1;

  const length = Math.max(Math.abs(c1), Math.abs(c2));

  const xStep = c2 / length;
  const yStep = c1 / length;

  for (let i = 0; i <= length; i++) {
    this.drawPixel(
      Math.trunc(x1 + xStep * i),
      Math.trunc(y1 + yStep * i),
      r,
      g,
      b
    );
  }
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
  console.log(distance(new Point(1, 1), new Vector2(1, 3)));
  console.log(new Vector2(2, 3).add(new Vector2(1, 1)));
  console.log(new Vector2(1, 2).getLength());
  console.log(new LineSegment(2, 4, 4, 1).getLength());
  console.log(new Polygon([1, 2], [2, 4]));
  console.log(new Polygon([2, 4], [3, -8], [1, 2], [2, 4]).square());
  console.log(
    new Sphere({ x: 4, y: -6, z: 3 }, 4).distanceToPoint({ x: -1, y: 5, z: -4 })
  );
  console.log(
    new Matrix([
      [2, 0, -1],
      [0, -2, 2],
    ]).multiplyMatrix([
      [4, 1, 0],
      [3, 2, 1],
      [0, 1, 0],
    ])
  );
  console.log(
    new Matrix([
      [1, 0, 0, 10],
      [0, 1, 0, 5],
      [0, 0, 1, -1],
      [0, 0, 0, 1],
    ]).multiplyVector(new Vector3(10, 10, 10))
  );

  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(800, 600);

  const drawer = new Drawer(imageData.data, imageData.width, imageData.height);

  const vertices = [
    new Vector3(-1, 1, 1),
    new Vector3(-1, 1, -1),
    new Vector3(1, 1, -1),
    new Vector3(1, 1, 1),
    new Vector3(-1, -1, 1),
    new Vector3(-1, -1, -1),
    new Vector3(1, -1, -1),
    new Vector3(1, -1, 1),
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],

    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],

    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
  ];

  let angle = 0;
  setInterval(() => {
    let matrix = new Matrix().getRotationX(30);

    matrix = new Matrix(new Matrix().getRotationY((angle += 1))).multiplyMatrix(
      matrix
    );

    matrix = new Matrix(new Matrix().getScale(30, 20, 20)).multiplyMatrix(
      matrix
    );

    matrix = new Matrix(
      new Matrix().getTranslation(100, -60, 0)
    ).multiplyMatrix(matrix);

    drawer.clearCanvas();

    const sceneVertices = [];
    for (let i = 0; i < vertices.length; i++) {
      let vertex = new Matrix(matrix).multiplyVector(vertices[i]);

      sceneVertices.push(vertex);
    }

    for (let i = 0, l = edges.length; i < l; i++) {
      const e = edges[i];
      drawer.drawLine(
        sceneVertices[e[0]].x,
        sceneVertices[e[0]].y,
        sceneVertices[e[1]].x,
        sceneVertices[e[1]].y,
        0,
        0,
        255
      );
    }
    const center = new Vector3(100, -60, 0);

    drawer.drawLine(center.x, center.y, center.x, center.y + 40, 0, 0, 0);
    drawer.drawLine(center.x, center.y, center.x + 70, center.y, 0, 0, 0);
    drawer.drawLine(center.x, center.y, center.x - 50, center.y - 20, 0, 0, 0);

    ctx.putImageData(imageData, 0, 0);
  }, 100);
}

init();
