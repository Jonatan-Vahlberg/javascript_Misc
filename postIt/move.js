const dragpins = document.querySelectorAll('#noteDrag');
var bool = false;
var index = 0;
var pos1,pos2,pos3,pos4;

dragpins.forEach(pin => {
    pin.addEventListener('mousedown', mouseDown,false);
    window.addEventListener('mouseup', mouseUp,false);
});

function mouseDown(e){
    window.addEventListener('mousemove',divMove, true);
    pos3 = e.clientX;
    pos4 = e.clientY;
}
function mouseUp(){
    window.removeEventListener('mousemove',divMove, true);
}

function divMove(e){
    var parrent = dragpins[0].parentElement;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    parrent.style.position = 'absolute';
    parrent.style.top = (parrent.offsetTop - pos2) +'px';
    parrent.style.left = (parrent.offsetLeft - pos1) +'px';
}