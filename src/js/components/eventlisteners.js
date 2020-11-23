////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Event Listeners
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// нажатие кнопок
field.addEventListener('keydown',function(){
    // отключение всплытия событий
    event.preventDefault();

    let newDirection = buttonCodes[event.keyCode];

    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }

    // 32 space
    // пауза
    if(event.keyCode == 32){
        if(pause){
            pause = false;
            showMessage(messageEl,"Пауза",1);
        }else{
            pause = true;
            showMessage(messageEl,"Пауза",0);
        }
    }
    // enter
    // сброс в начало
    if(event.keyCode == 13){
        game = true;
        showMessage(messageEl,"Игра окончена",0);

        clearInterval(timerId);

        snake = new Snake();
        apple = new Apple();

        score = 0;
        scoreNumEl.innerHTML = "";
        scoreNumEl.innerHTML = score;

        gameInit();
    }
    // перезагрузка страницы, так как включен event.preventDefault();
    // 116 F5
    if(event.keyCode == 116){
        window.location.reload();
    }
});

button.addEventListener("click",gameInit);
