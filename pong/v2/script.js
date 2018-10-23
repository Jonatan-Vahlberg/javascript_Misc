const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const buttons = document.querySelectorAll('.color');

window.onload = function(){
    var fps = 1000/60;
    setInterval(animate,fps);
};
function animate(){
    drawAll();
    moveAll();
}

//Drawing

//draw Evrything on canvas
function drawAll(){
    //background
    drawRect(0,0,canvas.width,canvas.height,colors.background);
    
    //player
    drawRect(pPad.x,pPad.y,pPad.width,pPad.height,colors.paddle);
    
    //net
    for(var y= 0;y < 20; y++){
        drawRect(canvas.width/2,(y+ (30*y)),2,20,colors.net);
    }
    
    //ball
    drawCircle(ball.x,ball.y,ball.rad,colors.ball);

    //Computer
    drawRect(cPad.x,cPad.y,cPad.width,cPad.height,colors.paddle);

    //score
    ctx.font = "20px Arial";
    ctx.fillText(pPad.score,100,100);
    ctx.fillText(cPad.score,680,100);
    
}
//Draw rectangle
function drawRect(x,y,width,height,color){

    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);

}
//draw Cirkle
function drawCircle(x,y,rad,color){

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,true)
    ctx.fill();

}

//Moving

//Move Evrything on canvas on collision
function moveAll(){
    cpuMove();
    ball.x += ball.xSpeed;

    //touches Player Paddle
    if(ball.x - ball.rad < (pPad.x + pPad.width) ){
        if((ball.y > pPad.y ) && (ball.y < (pPad.y + pPad.height))){
            ball.xSpeed = -ball.xSpeed;
            ball.yDelta = ball.y -(pPad.y + (pPad.height/2));
            ball.ySpeed = ball.yDelta * 0.115;
            audioP.play();
        }
        else{
            cPad.score++;
            ballReset();
            cPad.y = ball.y
            ball.ySpeed = 3;
            audioGoal.play();
        }
    }
    //Ball touches computer Paddle
    if(ball.x + ball.rad > cPad.x ){
        if((ball.y > cPad.y ) && (ball.y < (cPad.y + cPad.height))){
            ball.xSpeed = -ball.xSpeed;
            ball.yDelta = ball.y -(cPad.y + (cPad.height/2));
            ball.ySpeed = ball.yDelta * 0.115;
            audioC.play();
        }
        else{
            pPad.score++;
            ballReset();
            cPad.y = ball.y
            ball.ySpeed = 3;
            audioGoal.play();
        }
    }

    //ball touches roof or floor
    ball.y += ball.ySpeed;
    //touch roof
    if(ball.y - ball.rad < 0 ){
        ball.ySpeed = -ball.ySpeed;
    }else if(ball.y + ball.rad > canvas.height){
        ball.ySpeed = -ball.ySpeed;
    }
    
}
function cpuMove(){
    var cPadCenter = cPad.y + (cPad.height/2); 
    if(cPadCenter < ball.y + 35 ){
        cPad.y += 3;
    }else if(cPadCenter > ball.y +35){
        cPad.y -= 3;
    }
}

canvas.addEventListener('mousemove',function(e){
    var mousePos = mousePosCalc(e);
    pPad.y = mousePos.y -(pPad.height/2);

})

function mousePosCalc(e){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mX = e.clientX - rect.left -root.scrollLeft;
    var mY = e.clientY - rect.top -root.scrollTop;
    return{
        x:mX,
        y:mY
    };

}

function ballReset(){
    ball.x = 400;
    ball.y = 250;
    ball.xSpeed = -ball.xSpeed
    

}

// color Scheme
var colors = {
    background: "#000",
    paddle: "#fff",
    ball: "#fff",
    net: "#fff"
}
//player
var pPad = {
    x:10,
    y: 220,
    width:8,
    height:100,
    score: 0,
}

//Computer
var cPad = {
    x:782,
    y: 220,
    width:8,
    height:100,
    score: 0,
}

//ball
var ball= {
    x: 400,
    y: 250,
    rad: 10,
    xSpeed: 5,
    ySpeed: 3,
    yDelta: 0,
}
function colorChange(){
    console.log(this.id);
    switch(this.id){
        case 'white':
            colors.background = "#000",
            colors.paddle =  "#fff",
            colors.ball =  "#fff",
            colors.net = "#fff"
        break;
        case 'pink':
            colors.background = "#000";
            colors.paddle =  "#33DCE8";
            colors.ball =  "#FF20AA";
            colors.net = "#33DCE8";
        break;
        case 'green':
        colors.background = "#000";
        colors.paddle =  "#008f11";
        colors.ball =  "#008f11";
        colors.net = "#008f11";
        break;
    }
}
buttons.forEach(button => button.addEventListener('click',colorChange));

var audioP = new Audio('./audio/pBeep.ogg');
var audioC = new Audio('./audio/cBeep.ogg');
var audioGoal = new Audio('./audio/goalBeep.ogg');


