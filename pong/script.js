var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

window.onload = function(){
    
    var fps = 60; 
    setInterval(function(){
        drawEvrything(),move()
    },1000/fps);

    canvas.addEventListener('mousemove',function(e){
        var mousePos = calcMousePos(e);
        pPaddle.y = mousePos.y -pPaddle.height/2;
    });


}
var pPaddle = {
    x:20,
    y:290,
    width:8,
    height:75,
    mousePos: [0,0],
    score: 0,
}
var cPaddle = {
    x:780,
    y:290,
    width:8,
    height:100,
    score: 0,
    center: 0,
}
function cPaddleMove(){
    center = cPaddle.center =  cPaddle.y +(cPaddle.height/2);
    if(cPaddle.center < ball.y-38){
        cPaddle.y += 3;
    }else if(cPaddle.y.center < ball.y+38){
        cPaddle.y -= 3;

    }

}

colorScheme = {
    background: "#000",
    paddles: "#fff",
    ball: "#fff",
}

var ball = {
    x:398,
    y:300,
    width:10,
    height:10,
    speedX: 5,
    speedY: 3,
    deltaY: 0
}

function calcMousePos(e){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left -root.scrollLeft;
    var mouseY = e.clientY - rect.top -root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}
function move(){
    //X
    cPaddleMove();
    ball.x += ball.speedX;
    if(ball.x +ball.width > canvas.width-28){
        // ball.speedX =  -ball.speedX;
        if(ball.y > cPaddle.y && ball.y < cPaddle.y + cPaddle.height ){
            ball.speedX =  -ball.speedX;
            ball.deltaY = ball.y -(cPaddle.y + (cPaddle.height/2));
            ball.speedY = ball.deltaY * 0.115;
        }else{
            ballReset();
            pPaddle.score ++;
            cPaddle.y = ball.y
            ball.speedY = 3;

        }
        
    }else if(ball.x-ball.width < 28){
        //ball.speedX = -ball.speedX;
            if(ball.y > pPaddle.y && ball.y < pPaddle.y+pPaddle.height){
                ball.speedX =  -ball.speedX;
                ball.deltaY = ball.y -(pPaddle.y + pPaddle.height/2);
                ball.speedY = ball.deltaY * 0.085;
            }else{
                ballReset();
                cPaddle.score++;
                cPaddle.y = ball.y
                ball.speedY = 3;
            }
    
    }
    
    //Y
    ball.y += ball.speedY;
    if(ball.y < 0){
        ball.speedY =  -ball.speedY;
    }else if(ball.y > canvas.height){
        ball.speedY = -ball.speedY;
    }
}

function ballReset(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speedX =  -ball.speedX;
}


function drawEvrything(){
    colorScheme.ball = "hotpink";
    //Background
    drawObject(0,0,canvas.width,canvas.height,colorScheme.background);

    //line
    drawObject(canvas.width/2-2,0,4,canvas.height,colorScheme.paddles);

    //player
    drawObject(pPaddle.x,pPaddle.y,pPaddle.width,pPaddle.height,colorScheme.paddles);

    //CPU
    drawObject(cPaddle.x,cPaddle.y,cPaddle.width,cPaddle.height,colorScheme.paddles);
    ctx.fillText(pPaddle.score,100,100);
    ctx.fillText(cPaddle.score,700,100);


    //ball
    drawCircle(ball.x,ball.y,ball.width,colorScheme.ball);


}
function drawObject(x,y,width,height,color){
    ctx.fillStyle =color;
    ctx.fillRect(x,y,width,height)

}
function drawCircle(x,y,rad,color)
{
    ctx.fillStyle =color;
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,true);
    ctx.fill();
}

//window.addEventListener("mousemove");