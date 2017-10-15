var angle = 0;
var numSegments = 0;
var segLength = 0;

function Tentacle(baseX, baseY) {
  this.baseX = baseX;
  this.baseY = baseY;
  this.targetX;
  this.targetY;
  this.numSegments = 32;
  this.x = [];
  this.y = [];
  this.angle = [];
  this.segLength = 8;

  for (var i = 0; i < this.numSegments; i++) {
    this.x[i] = 0;
    this.y[i] = 0;
    this.angle[i] = 0;
  }

  this.show = function(ballX, ballY) {

    this.x[this.x.length - 1] = this.baseX; // Set base x-coordinate
    this.y[this.x.length - 1] = this.baseY; // Set base y-coordinate

    this.reachSegment(0, ballX, ballY);

    for (var i = 1; i < this.numSegments; i++) {
      this.reachSegment(i, this.targetX, this.targetY);
    }
    for (var j = this.x.length - 1; j >= 1; j--) {
      this.positionSegment(j, j - 1);
    }
    for (var k = this.x.length - 1; k > 0; k--) {
      this.segment(this.x[k], this.y[k], this.angle[k], (k + 1) * 2);
    }

  }

  this.positionSegment = function(a, b) {
    this.x[b] = this.x[a] + cos(this.angle[a]) * this.segLength;
    this.y[b] = this.y[a] + sin(this.angle[a]) * this.segLength;
  }

  this.reachSegment = function(i, xin, yin) {
    var dx = xin - this.x[i];
    var dy = yin - this.y[i];
    this.angle[i] = atan2(dy, dx);
    this.targetX = xin - cos(this.angle[i]) * this.segLength;
    this.targetY = yin - sin(this.angle[i]) * this.segLength;
  }

  this.segment = function(x, y, a, sw) {

    push();
    translate(x, y);
    rotate(a * 4);


    image(img, 0, 0, 256, 256);
    //image(img, 0, 200, 128, 128);
    //image(img, 128, 200, 128, 128);
    pop();

  }

}