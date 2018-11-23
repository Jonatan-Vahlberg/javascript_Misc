const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const lives = document.querySelector('#lives');
const score = document.querySelector('#score');

var player = {
    //Position
    x: 0,
    y: 9,
    
    //Atributes
    lives: 3,
    score: 0,
    invounrable: 5,
    level: 0
};

var enemies = new Array();
var coins = new Array();
var controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    keyListener:function(e) {
        if(coins.every(coin => coin.collected == true)){
            player.level++;
            renderMap();
            coins = new Array();
        }
        var state = (e.type == 'keydown')? true : false;
        console.log(e.keyCode);
        switch(e.keyCode){

            case 37: //Left
            case 65:
                controller.left = state;
                break;
            case 39: //right
            case 68:
                controller.right = state;
                break;
            case 38: //up
            case 87:
                controller.up = state;
                break;
            case 40: //down
            case 83:
                controller.down = state;
                break;
            default:
            //nothing happens
        }
    }

};

function move(){
    console.log(controller.right);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x*50,player.y*50,50,50);
    if(controller.left == true){
        checkMovement(player.x-1,player.y)
    }
    if(controller.right == true){
        checkMovement(player.x+1,player.y)
    }
    if(controller.up == true){
        checkMovement(player.x,player.y-1)
    }
    if(controller.down == true){
        checkMovement(player.x,player.y+1)
    }
    console.log(player.x,player.y)
    drawAll();
    ctx.fillStyle = '#89007B';
    ctx.fillRect(player.x*50,player.y*50,50,50);
    tileInteraction()
}
function createCoin (x,y,collected){
    this.x = x;
    this.y = y;
    this.collected = collected;
}
function drawAll(){

    coins.forEach(coin => {
        
        if(coin.collected == false){

            ctx.beginPath();
            ctx.arc(coin.x*50+25,coin.y*50 +25,14,0,2* Math.PI,false);
            ctx.fillStyle = '#FFC700';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.stroke();
        }
    })
}

function tileInteraction(){
    coins.forEach(coin => {
        if(player.x == coin.x && player.y == coin.y && coin.collected == false){

            coin.collected = true;
            player.score += 100;
            
        }
        score.innerHTML = `SCORE: ${player.score}`;
    });
}

function checkMovement(movedX,movedY){
    console.log(maps[player.level][movedY][movedX])
    if(maps[player.level][movedY][movedX] == 1 ){
        return;
    }
    console.log(movedX)
    if(movedX == (maps[player.level][movedY].length)){
        player.x = 0;
        player.y = 9;

    }else if( movedX ==-1){
        player.x = 15;
        player.y = 8;
    }
    else if(!(movedX == player.x)){
        player.x = movedX;
    }else{
        player.y = movedY
    }
}
renderMap();
function renderMap(){
    var eachother = false;
    for (let y = 0; y < maps[player.level][0].length; y++) {
        for (let x = 0; x < maps[player.level][y].length; x++) {
            
            if(maps[player.level][y][x] == 1){
                ctx.fillStyle = '#170B4D';
                ctx.fillRect(x*50,y*50,50,50);
            }
            else if(maps[player.level][y][x] == 0){
                if(eachother == false){
                    
                    var coin = new createCoin(x,y,false);
                    coins.push(coin);
                    eachother = true;
                }else eachother = false;
            }

            ctx.fillStyle = '#E3E200';
            ctx.fillRect(player.x*50,player.y*50,50,50);
            
        }
        
    }
}


window.onload = function(){

    window.addEventListener('keydown',controller.keyListener);
    window.addEventListener('keyup',controller.keyListener);
    setInterval(move,150);

};

