var context, controller, loop, line;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 500;
var arena = [
    [0,1,0,1],
    [],
    [0,1,0,1,1,0,1],
    [1,1,1,1,1,0,1,0,0,0,0,1,0,1],
];
function moveObject(height,jumping,width,x,x_vel,y,y_vel,color){
    this.height = height;
    this.jumping = jumping;
    this.width = width;
    this.x = x;
    this.x_vel = x_vel;
    this.y = y;   
    this.y_vel = y_vel;
    this.color = color;
    
    // this.update = function(){
    //     this.draw();
    // }

}
function stuckObject(height,width,x,y,color){
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;   
    this.color = color;
}

function draw(object){
    context.fillStyle = object.color;
    context.beginPath();
    context.rect(object.x,object.y,object.width,object.height);
    context.fill();
    // context.fillStyle = "#ff0000";// hex for red
    // context.beginPath();
    // context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    // context.fill();
}
var matrixBlocks = [];
function drawArena(arena){
    var xp = 0; 
    var yp = 0
    arena.forEach((row)=>{
        row.forEach((col)=>{
            if(col !== 0){
                var block = new stuckObject(32,32,xp*32,60+(32*yp),"#344352")
                ++xp;
                draw(block);
                matrixBlocks.push(block); 
            }
            else{
                ++xp;
            }
        })
        yp++;
        xp = 0;
    });

}
var rectangle = new moveObject(32,true,20,144,0,0,0,"#ff0000");
var line = new stuckObject(32,40,250,80,"#202830");
console.log(rectangle.y_vel)
// rectangle = {

//   height:32,
//   jumping:true,
//   width:20,
//   x:144, // center of the canvas
//   x_vel:0,
//   y:0,
//   y_vel:0

// };



controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_vel -= 20;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_vel -= 0.5;

  }

  if (controller.right) {

    rectangle.x_vel += 0.5;

  }
  

//   if(collision(rectangle,line)){
//     console.log(rectangle.y);
//     //top
//     if(rectangle.y < line.y +2  - rectangle.height){
//       rectangle.jumping = false;
//       rectangle.y = line.y - rectangle.height - 0,5;
//       rectangle.y_vel = 0;
//     //sides
//     }else if(rectangle.x +20 >= line.x ){
//         if(rectangle.x > 260){
//             rectangle.color = "#ffffff"
//             rectangle.x_vel = 0;
//             rectangle.x = line.x + line.width;
//         }else{
//          rectangle.x_vel = 0;
//          rectangle.x = line.x -20;
//         }
//     }
// }
  colides(rectangle,line);
  matrixBlocks.forEach(val => colides(rectangle,val));

  rectangle.y_vel += 1.5;// gravity
  rectangle.x += rectangle.x_vel;
  rectangle.y += rectangle.y_vel;
  rectangle.x_vel *= 0.85;// friction
  rectangle.y_vel *= 0.9;// friction

  // if rectangle is falling below floor line
  if (rectangle.y > 180 - 16 - 32) {

    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32.5;
    rectangle.y_vel = 0;

  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {

    rectangle.x = context.canvas.width;

  } else if (rectangle.x > context.canvas.width) {// if rectangle goes past right boundary

    rectangle.x = -32;

  }
  
  context.fillStyle = "#202020";
  context.fillRect(0, 0, context.canvas.width, 400);// x, y, width, height
//   context.fillStyle = "#ff0000";// hex for red
//   context.beginPath();
//   context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
//   context.fill();
  draw(rectangle);
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(context.canvas.width, 164);
  context.stroke();
  context.fillStyle = "yellow";
  context.beginPath();
  context.rect(20,20,12,12);
  context.fill();
  draw(line);
  drawArena(arena);

 
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
  
};

function collision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.width > b.y;

}
function colides(player, area){
    if(collision(player,area)){

    //top
    if(player.y < area.y +2  - player.height){
        player.jumping = false;
        player.y = area.y - player.height - 1,5;
        player.y_vel = 0;
        
    }else if(player.y > area.y + area.height){
        player.y_vel = 0;
    //sides
    }else if(player.x + player.width >= area.x ){
        if(player.x > area.x + 3){
            
            player.x_vel = 0;
            player.x = area.x + area.width+ 0.2;
        }else{
            player.x_vel = 0;
            player.x = area.x -player.width;
    }
}
}   

}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);