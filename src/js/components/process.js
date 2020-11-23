////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Process Initialization
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let snake = new Snake();
let apple = new Apple();


function gameInit(){
    startScreen.classList.add("start-screen--hide");

    setTimeout(function(){
        loader.classList.add("loader--hide");
    },1000);

    firstColor = firstColorEl.value;
    secondColor = secondColorEl.value;
    acceleration = accelerationEl.value;
    animationTime = startSpeedEl.value;

    timerId = setInterval(gameProcess, animationTime);
}

function gameProcess(){
    if(game && pause){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snake.move();
        snake.draw();
        apple.draw();
    }
}
