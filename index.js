let Status = "";
let point = 0;
let count = 10; 
const maxCount = 0; 
let randomitem;
let object = [];
const items = ["book", "couch", "person", "car", "chair","motorcycle","bottle","bed","clock"];
let random;
let wait = 0;
let object_Detector;
let detected;
let confidence;
let receivepoints = 5; 
var strike;
var noofstrikes;
function timer() {
  count--;
  if (count <= maxCount) { 
    count = 10;
    strike=0;
    random = Math.floor(Math.random() * items.length);
    randomitem = items[random];
    document.getElementById("display").innerHTML = randomitem;
    wait = 0;
  }
  if (wait === 1) {
    count = 10;
    point += receivepoints;
    strike=false;
    document.getElementById('points').innerHTML = point;
  }
  
  if (detected === randomitem && confidence > 0.3) {
    wait++;
  }
  if( strike!==false && count===0)
  {
  strike=strike+1;  
  }
  if(strike>4)
  {
  
  }
  document.getElementById("timer").innerHTML = count;
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(600, 300);
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  object_Detector = ml5.objectDetector('cocossd', modelLoaded);
}

function start() {
  setInterval(timer, 1000);
  random = Math.floor(Math.random() * items.length);
  document.getElementById("display").innerHTML = items[random];
  strike=0;
}

function modelLoaded() {
  console.log("Model loaded");
  Status = true;
}

function draw() {
  image(video, 0, 0, 300, 300);
  if (Status !== "") {
    object_Detector.detect(video, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    objects = results;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].label === items[random]) {
        detected = results[0].label;
        confidence = results[0].confidence;
     
        object_Detector.detect(gotResults);
      }
    }
  }
}
