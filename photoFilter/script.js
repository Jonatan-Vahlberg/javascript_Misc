const videoElements = document.querySelector('.videoElements');
const video = document.querySelector('#player');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var filterType = 0;

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(lms =>{

        video.src = window.URL.createObjectURL(lms);
        video.play();

    }).catch(err =>{
        console.error(`You have a error`,err);
    });
}

getVideo();

function paintToCanvas(){

    var width = Number(video.videoWidth);
    console.log(width)
    var height = Number(video.videoHeight);
    var aspect = height/width;
    console.log(aspect);

    canvas.width = videoElements.offsetWidth;
    canvas.height =  (canvas.width * aspect);
    var FPS = 10;
    setInterval(() =>{
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        let pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
        if(filterType == 0){

        }else if(filterType ==  1){
            pixels = colorShade(pixels);
        }else if(filterType == 2){
            pixels = split(pixels);
        }else if(filterType == 3){
            pixels = glitch(pixels);
        }
        ctx.putImageData(pixels,0,0);
    },FPS)
}

function colorShade(pixels){
    const levels = {};
    ctx.globalAlpha = 1;
    
    document.querySelectorAll('.inside-color input').forEach((input)=>{
        levels[input.name] = Number(input.value);
    })
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] += levels['red']; // RED
        pixels.data[i + 1] += levels['green'] // GREEN
        pixels.data[i + 2] += levels['blue']; // Blue 
      }
      return pixels;
}

function split(pixels){
    const levels = {};
    
    document.querySelectorAll('.inside-split input').forEach((input)=>{
        levels[input.name] = Number(input.value);
    })
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - levels['red']] = pixels.data[i + 0]; // RED
        pixels.data[i + levels['green']] = pixels.data[i + 1] // GREEN
        pixels.data[i - levels['blue']] = pixels.data[i + 2]; // Blue 
      }
      ctx.globalAlpha = levels['alpha'];
      return pixels;
}

function glitch(pixels){
    const levels = {};
    
    document.querySelectorAll('.inside-glitch input').forEach((input)=>{
        levels[input.name] = Number(input.value);
    })
    let r = generateRand(0,levels['glitchlevel']);
    let g = generateRand(0,levels['glitchlevel']);
    let b = generateRand(0,levels['glitchlevel']);
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - r] = pixels.data[i + 0]; // RED
        pixels.data[i + g] = pixels.data[i + 1] // GREEN
        pixels.data[i - b] = pixels.data[i + 2]; // Blue 
      }
      ctx.globalAlpha = levels['alpha'] / 2;
      return pixels;

}

 function generateRand(min, max){
    return Math.floor(Math.random()*(max - min)+min);
 }

function changeFilter(){

    if(this.id == 'color'){
        filterType = 1;
        document.querySelector('.inside-color').style.display = 'initial';
        document.querySelector('.inside-split').style.display = 'none';
        document.querySelector('.inside-glitch').style.display = 'none';
    }else if(this.id == 'split'){
        filterType = 2;
        document.querySelector('.inside-color').style.display = 'none';
        document.querySelector('.inside-split').style.display = 'initial';
        document.querySelector('.inside-glitch').style.display = 'none';
    }else if(this.id == 'glitch'){
        filterType = 3;
        document.querySelector('.inside-color').style.display = 'none';
        document.querySelector('.inside-split').style.display = 'none';
        document.querySelector('.inside-glitch').style.display = 'initial';
    }

}

window.onload = function(){
    video.addEventListener('canplay',paintToCanvas);
}
document.querySelectorAll('.filterButton').forEach(button =>
    button.addEventListener('click',changeFilter))