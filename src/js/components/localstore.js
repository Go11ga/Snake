////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Local Storage
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if(value == null){
    localStorage.setItem("best2", 0);
}else{
    scoreBestEL.innerHTML = localStorage.getItem('best2');
}
