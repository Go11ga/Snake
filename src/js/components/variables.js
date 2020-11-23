////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let canvasWidth = canvas.width; //480
let canvasHeight = canvas.height; //480

let blockSize = 12;

let widthInBlocks = canvasWidth / blockSize; //40
let heightInBlocks = canvasHeight / blockSize; //40

let score = 0;

let game = true;
let pause = true;

// values from inputs
let firstColor;
let secondColor;
let acceleration;
let animationTime;

let buttonCodes = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

let value = localStorage.getItem("best2");
