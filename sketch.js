//Ball Stuff
var ballX;
var ballY;

//Image Stuff
var dropzone;
var img;

//Tentacle Stuff
var tentacles = [];
var tentacleCount = 3;
var tentacleTotal = 0;

//Perlin Noise Stuff
var inc = 0.005;
var x1off1 = 0;
var x1off2 = 10000;
var x2off1 = 5000;
var x2off2 = 15000;

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  gui1 = QuickSettings.create(0, 0, "Settings")
    .addFileChooser("File Chooser", "Upload an image...", "image/*", onFileChosen)
    .addImage("Image", "")
    .addButton("Place Tentacle", makeTentacles);
    /*
    .addRange("Scale", 2, 8, vScale, 1, changeVScale)
    .addRange("Orbit Phases", 0, 90, orbitPhases, 1, changeOrbitPhases)
    .addRange("Orbit Radius", 0, 128, orbitRadius, 1, changeOrbitRadius)
    .addRange("Orbit Velocity", 0, 1, orbitVelocity, 0.05, changeOrbitVelocity)
    .addRange("Brightness Cutoff", 0, 255, brightnessCutoff, 1, changeBrightnessCutoff)
    .addBoolean("debug", debug, changeDebug)

  gui2 = QuickSettings.create(windowWidth * 0.75, 0, "Style")
    .addBoolean('Background', backgroundEnabled, changeBackgroundEnabled)
    .addColor("Background Color", backgroundColor, changeBackgroundColor)
    .addBoolean("Line Enabled", lineEnabled, changeLineEnabled)
    .addRange("Line Weight", 1, 32, lineWeight, 1, changeLineWeight)
    .addBoolean('Shape Enabled', shapeEnabled, changeShapeEnabled)
    .addBoolean('Stroke Enabled', strokeEnabled, changeStrokeEnabled)
    .addDropDown("Shape", shape, changeShape)
    .addRange("Shape Width", 1, 128, shapeWidth, 1, changeShapeWidth)
    .addRange("Shape Height", 1, 128, shapeHeight, 1, changeShapeHeight);
*/

  gui3 = QuickSettings.create(windowWidth * 0.75, windowHeight * 0.5, "Frame Exporter")
    //.addButton("Export 90 Frames", exportFrames);
}

var counter = 0;

function draw() {

  //translate(width / 2, height / 2);
  background(255);

  //Tentacle stuff

  for (var i = 0; i < tentacles.length; i++) {
    tentacles[i].show(ballX, ballY);

  }

  //Ball stuff
  x1off1 += inc;
  x1off2 += inc;

  ballX = map(noise(x1off1), 0.5, 1, 0, width);
  ballY = map(noise(x1off2), 0.5, 1, 0, height);

  if (ballX < 0) {

    ballX = ballX + 50;

  }

  if (ballX > width) {

    ballX = ballX - 50;

  }

  if (ballY < 0) {

    ballY = ballY + 50;

  }

  if (ballY > width) {

    ballY = ballY - 50;

  }

  //ballX = mouseX;
  //ballY = mouseY;

  //Eliipse Stuff
  fill(0, 255, 0);
  noStroke();
  ellipse(ballX, ballY, 24, 24);

  if (exportCalled) {
    saveCanvas('myCanvas' + counter, 'png');
    counter++;
    if (counter == 90) {
      exportCalled = false;
      counter = 0;

    }

  }

}

function makeTentacles() {
  append(tentacles, new Tentacle(width / 2, height / 2));
}