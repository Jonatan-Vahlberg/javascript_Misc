const bg = document.querySelector('#bg');
const bgCtx = bg.getContext('2d');
const fg = document.querySelector('#fg');
const ctx = fg.getContext('2d');
const tileSheet = document.querySelector('.img');
const TILE_SIZE = 40;

drawRectangle(bgCtx,0,0,bg.width,bg.height,'#202020',1);
window.onload = function(){
    let fps = 60;
    setInterval(function(){
        movement();
        drawAll();
    },1000/fps);
}
function drawRectangle(ctx,x,y,width,height,color,ga){
    ctx.fillStyle = color;
    ctx.globalAlpha = ga;
    ctx.fillRect(x,y,width,height);

}
player = {
    x: 100,
    y: 300,
    width:20,
    height:40,
    jumping: false,
    color: '#8A0E10',
    x_vel: 0,
    y_vel: 0,
}
function drawAll(){
    //background 
    drawRectangle(ctx,0,0,bg.width,bg.height,'#202020',1);

    //player
    drawRectangle(ctx,player.x,player.y,player.width,player.height,player.color,1);

    //line
    ctx.drawImage(tileSheet,8*TILE_SIZE,0,TILE_SIZE,TILE_SIZE);
}

//controlls
const controller = {

    left: false,
    right:false,
    up:false,
    keyListener:function(e){
        var keyState = (e.type == 'keydown')?true:false;

        switch(e.keyCode){
            case 37:
                controller.left = keyState;
            break;
            case 39:
                controller.right = keyState;
            break;
            case 38:
            controller.up = keyState;
            break;
        }

        }
    };

//movment

function movement(){
    if (controller.up && player.jumping == false) {
        console.log('eg')
        player.y_vel -= 20;
        player.jumping = true;
    
      }
      player.y_vel += 1.5;// gravity
      player.x += player.x_vel;
      player.y += player.y_vel;
      player.x_vel *= 0.85;// friction
      player.y_vel *= 0.9;// friction

}




window.addEventListener('keydown',controller.keyListener);
window.addEventListener("keyup", controller.keyListener);