const canvas = document.querySelector('#rain');

const ctx = canvas.getContext('2d');
ctx.fillStyle = "#000";
ctx.fillRect(0,0,canvas.width,canvas.height);

var rain =  {
    minLength: 20,
    maxLength: 20,
    width: 2,
    xS: 0,
    xF: 2000,
    amount: 0,
    times: 0,
}
var rainArray = [];
drawRaindrop(rain.minLength,rain.maxLength,rain.xS,rain.xF);

function drawRaindrop(minL, maxL,xS,xF){
    var length = Math.floor((Math.random()* (maxL)+minL));
    var where  = Math.floor((Math.random()* (xF-xS)+xS));
    
    ctx.fillStyle = "blue";
    ctx.fillRect(where,0,rain.width,length);
    var rainDrop = {
        height: length,
        x: where,
        y: 0,
    }
    rainArray.push(rainDrop);
}
var remove = 0;
function animate(){
    rainArray.forEach(function(drop,index,array) {
        if(drop.y < canvas.height){
            ctx.fillStyle = "black";
            ctx.fillRect(drop.x,drop.y,rain.width,drop.height);
            drop.y += (Math.floor(Math.random()*(3)+2));
            updateRaindrop(drop);
        }else{
            rain.amount++
            if(rain.amount > 1000 ){
                rain.times++;
                rain.amount = 0;
                ctx.fillStyle = "#7B0000";
                ctx.fillRect(0,1000,2000,(rain.times*-5))
            }
            array.splice(index,1);
        }

    });
}
function updateRaindrop(drop){
    ctx.fillStyle = "#7B0000";
    ctx.fillRect(drop.x,drop.y,rain.width,drop.height);
}

function drawAll(){
    drawRaindrop(rain.minLength,rain.maxLength,rain.xS,rain.xF);
    animate();
}

window.onload = function(){
    
    setInterval(drawAll,(1000/4000))
};