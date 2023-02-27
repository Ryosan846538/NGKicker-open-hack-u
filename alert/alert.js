document.querySelector('.button1').addEventListener('click', function(){
    history.back();
});
document.querySelector('.button2').addEventListener('click', function(){
    history.go(-2);
});