const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const lives = document.querySelector('#lives');
const score = document.querySelector('#score');
var moveAll;
var framesCounter = 0; 

var player = {
    //Position
    x: 0,
    y: 9,
    
    //Atributes
    lives: 3,
    score: 0,
    invounrable: 5,
    level: 0,
    xDirection: 'null',
    yDirection: 'null',
};
function newEnemy(x,y,xDirection,yDirection,color){
    this.x = x;
    this.y = y;
    this.xDirection = xDirection;
    this.yDirection = yDirection;
    this.color = color;

}
var enemies = new Array();
var coins = new Array();
var controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    keyListener:function(e) {
        
        var state = (e.type == 'keydown')? true : false;
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
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x*50,player.y*50,50,50);
    if(controller.left == true){
        checkMovement(player.x-1,player.y,player)
    }
    if(controller.right == true){
        checkMovement(player.x+1,player.y,player)
    }
    if(controller.up == true){
        checkMovement(player.x,player.y-1,player)
    }
    if(controller.down == true){
        checkMovement(player.x,player.y+1,player)
    }
    drawAll();
    ctx.fillStyle = '#89007B';
    ctx.fillRect(player.x*50,player.y*50,50,50);
    tileInteraction()
    enemies.forEach(enemy =>{
        ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x*50,enemy.y*50,50,50);
    })
}
function moveEnemies(){
    console.log(enemies[0]);
    enemies.forEach(enemy => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(enemy.x*50,enemy.y*50,50,50);
        if(enemy.xDirection == '+'){    
            checkMovement(enemy.x+1,enemy.y,enemy);
        }else if(enemy.xDirection == '-'){
            checkMovement(enemy.x-1,enemy.y,enemy)
                
        }
        if(enemy.yDirection == '+'){
            checkMovement(enemy.x,enemy.y+1,enemy);
                
        }else if(enemy.yDirection == '-'){
            checkMovement(enemy.x,enemy.y-1,enemy);
        }
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x*50,enemy.y*50,50,50);
    });
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
    if(coins.every(coin => coin.collected == true)){
            player.level++;
            if(player.level >= maps.length){
                alert('YOU WON CONGARTS');
                location.reload();
            }
            coins = new Array();
            renderMap();
            window.clearInterval(moveAll);
        }
    coins.forEach(coin => {
        if(player.x == coin.x && player.y == coin.y && coin.collected == false){

            coin.collected = true;
            player.score += 100;
            
        }
        score.innerHTML = `SCORE: ${player.score}`;
    });
    enemies.forEach(enemy =>{
        if(player.x == enemy.x && player.y == enemy.y){
            player.x = 0; player.y = 9;
            player.lives--;
            if(player.lives < 0){
                alert('Game Over');
                location.reload();
            }
            lives.innerHTML = `LIVES: ${player.lives}`;
        }
    })
}

function checkMovement(movedX,movedY,obj){
    if(maps[player.level][movedY][movedX] == 1 ){
        if(obj.xDirection == 'none'){
            if(obj.yDirection == '+') obj.yDirection = '-';
            else if(obj.yDirection == '-') obj.yDirection = '+';
        }else if(obj.yDirection == 'none'){
            if(obj.xDirection == '+') obj.xDirection = '-';
            else if(obj.xDirection == '-') obj.xDirection = '+';
        }
        return;
    }
    if(movedX == (maps[player.level][movedY].length)){
        obj.x = 0;
        obj.y = 9;
        

    }else if( movedX ==-1){
        obj.x = 15;
        obj.y = 8;
        
    }
    else if(!(movedX == obj.x)){
        obj.x = movedX;
        
    }else{
        obj.y = movedY
        
    }

}
renderMap();
function renderMap(){
    var eachother = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.x = 0;
    player.y = 9;
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
    var enemy1 = new newEnemy(1,3,'+','none','green');
    var enemy2 = new newEnemy(12,12,'none','+','red');

    enemies.push(enemy1);
    enemies.push(enemy2);
    
    if(player.level > 0){

        moveAll = setInterval(move,150)
    }
}


window.onload = function(){

    window.addEventListener('keydown',controller.keyListener);
    window.addEventListener('keyup',controller.keyListener);
    moveAll = setInterval(() =>{
            
        move();
        if(framesCounter > 450){
            moveEnemies();
            framesCounter = 0; 
        }
        else{

            framesCounter += 150;
        }

    },150);

};

