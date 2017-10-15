//GUI1

function onFileChosen(file) {

  var temp = URL.createObjectURL(gui1.getFile("File Chooser"));
  gui1.setImageURL("Image", temp);
  img = loadImage(temp);

}

//GUI3

var exportCalled = false;
var counter = 0;

//Type in cmd: ren *. *.png
function exportFrames() {
  exportCalled = true;
}