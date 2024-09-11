let resizeTimer;
const debounceTime = 250;
window.onresize = function () {
    clearInterval(resizeTimer); //clearing timer if browser resized before debounce time
    resizeTimer = setTimeout(function(){
        //loading Header
        prepareHeader();
    }, debounceTime);
}
