////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Auxiliary Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// генератор случайных чисел
function getRandomNum(num) {
    let res = Math.floor(Math.random() * (num - 2)) + 1;
    return res;
}

// функция рисования окружности
let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

// функция отображения плашки и изменение содержимого
function showMessage(elem,text,num){
    if(num == 1){
        elem.classList.remove("message--hide");
        elem.innerHTML = "";
        elem.innerHTML = text;
    }else{
        elem.classList.add("message--hide");
        elem.innerHTML = "";
    }
}

// функцияя добавления нового значения в local storage
function addNewRecord(score){
    value = localStorage.getItem('best2');
    if(value < score){
        localStorage.setItem('best2', score);
        scoreBestEL.innerHTML = localStorage.getItem('best2');
    }
}
