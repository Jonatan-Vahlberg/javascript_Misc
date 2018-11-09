const canvas = document.querySelector('#canvas');
const buttons = document.querySelectorAll('.input');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
// var map = new Array(7).fill(new Array(7).fill());

//This is the game map

var map = [
    [4,4,3,3,2,2,3], //0 = Start 1 = House 
    [1,1,3,5,5,3,2], //2 = Lake 3 = Forrest
    [4,4,6,6,5,2,5], //4 = Backyard 5 = Plain
    [1,1,6,0,3,3,3], //6 = Road 7 = Escape
    [6,5,3,6,3,9,3], //8 = Tavern 9 = Forrest Dead
    [8,6,5,6,10,10,9], // 10 = Cemetary
    [11,6,6,7,6,6,9] // 11 = Tavern inner
];

// this map exsist to host the cats zombies and player positions att all times
var gameMap = new Array();
for(let i = 0; i < 7; i++){
    gameMap[i] = new Array(7)
}
//this function puts cats and a zombie in random boxes
var player = {
    x: 3,
    y: 3,
    score: 0,
    drunk: false,
}
//create cats and zombies
function createCAZ(x,y,collected){
    this.x  = x;
    this.y  = y;
    this.collected  = collected;
}

var cats = new Array();

var zombies = new Array();
populateGameMap();
function populateGameMap(){
    
    //while loops for placing cats
    let i = 0
    while(true){
        let x =   generateRandomNr(0,6); 
        let y = generateRandomNr(0,6);
        if(x == player.x && y == player.y ){
         continue;  
        }else{
            if(i == 0){
                var cat = new createCAZ(x,y,false);
                cats.splice(0,1,cat);
                i++;
                
                continue;
            }else{
                //counter
                let c = 0;
                cats.forEach(cat => {
                    
                    if(x == cat.x && y == cat.y){
                        c = 0;
                    }
                    else{
                        c++;
                    }
                });
                if(i == 1 && c == 1) {
                    
                    var cat = new createCAZ(x,y,false);
                    cats.push(cat);
                    i++;
                }else if(i == 2 && c ==2){
                    var cat = new createCAZ(x,y,false);
                    cats.push(cat);
                    i++;
                    break;
                }
            }
        }

    }
    //Creating the first zombie
        let z =   generateRandomNr(0,3); 
        let x = 0;
        let y = 0;
        if(z == 0){
            x = 0;
            y = 0
        }else if( z == 1){
            x = 6;
            y = 0;
        }else if(z == 2){
            x = 6;
            y = 6;
        }else{
            x = 0;
            y = 6;
        }
        //placing the zombie in one of the four corners of the map
        var zombie = new createCAZ(x,y,false);
        zombies.push(zombie);
    
}

var mapObject = new Array();
var rows = 7;
for(let i = 0; i < rows; i++){
    mapObject[i] = new Array(7);
}
populateMap();

/*This Function populates the game map with the backgrounds and the foreground items to then store in the mapObject Array
  This is all done beforehand in order to not have to render on the fly and slow down the process*/ 
function  populateMap(){

    //a for loop determening y corodinate
    for(let y = 0; y < map.length;y++){
        //a inner for loop determening x corodinate together becoming (y,x) of the map array; for example map[y][x] = n.
        for(let x = 0; x< map[0].length;x++){
            

            //Object constructor for items to be generated on the background of canvas;
           function itemObj(path,sX,sY,sWidth,sHeight,x,y,width,height) {
                this.path = path;
                this.sX = sX; //Starting source x pos
                this.sY = sY; //Starting source y pos
                this.sWidth = sWidth; // source width of item
                this.sHeight = sHeight;  // source height of item
                this.x = x; //x pos on canvas can be random
                this.y = y; // y pos on canvas can be random 
                this.width = width; // width on canvas
                this.height = height; // height on canvas 
            }
            let xP = 0; //  A random x pos placment for graphics
            let yP = 0;// A random yPos placment for Graphics
            let sX = 0; // A random number meant to determin the cutting point i a png file for getting  for example one tree variant
            let sY = 0;
            //A Switch selector for finding the necesary graphics;
            
            switch(map[y][x]){
                
                case 0:
                    //mat
                    xP = generateRandomNr(190,325);
                    yP = generateRandomNr(85,300)
                    
                    var item1 = new itemObj('media/sprites/mat.png',0,0,100,100,xP,yP,100,100);

                    //sign
                    xP = generateRandomNr(190,325);
                    yP = generateRandomNr(85,300)
                    var item2 = new itemObj('media/sprites/sign.png',0,0,100,100,xP,yP,100,100);

                    //controller
                    xP = generateRandomNr(190,384);
                    yP = generateRandomNr(85,360)
                    var item3 = new itemObj('media/sprites/controller.png',0,0,40,40,xP,yP,40,40);

                    createCell(y,x,'media/backgrounds/start.png',item1,item2,item3);
                break;
                case 1: //House background
                    //Function for making a cell populated with items exPlained Further down;
                    
                    //Cloud
                    xP = generateRandomNr(0,canvas.width-100);

                    var item1 = new itemObj('media/sprites/cloud.png',0,0,100,50,xP,10,100,50);
                    //house this is for generating a random house at fixed y.
                    xP = generateRandomNr(0,canvas.width-100);

                    //There are four house variants and this choses one of them and helps pic them out of thi png file
                    sX = generateRandomNr(0,3);  
                    var item2 = new itemObj('media/sprites/house.png',sX*100,0,100,128,xP,78,100,128);
                    //Lampost
                    xP = generateRandomNr(0,canvas.width-60);
                    var item3 = new itemObj('media/sprites/lampost.png',0,0,60,150,xP,56,60,150);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/house.png',item1,item2,item3);
                break;
                case 2: //Lake
                    //Function for making a cell populated with items exPlained Further down;
                    
                    //Fish
                    xP = generateRandomNr(0,365);
                    yP = generateRandomNr(135,368)
                    sX = generateRandomNr(0,3)
                    var item1 = new itemObj('media/sprites/fish.png',sX*45,0,45,32,xP,yP,45,32);

                    //Second Fish
                    xP = generateRandomNr(0,365);
                    yP = generateRandomNr(135,368)
                    sX = generateRandomNr(0,3)
                    var item2 = new itemObj('media/sprites/fish.png',sX*45,0,45,32,xP,yP,45,32);

                    //boat
                    xP = generateRandomNr(0,250);
                    yP = generateRandomNr(135,272)
                    var item3 = new itemObj('media/sprites/boat.png',0,0,175,128,xP,yP,175,128);

                    createCell(y,x,'media/backgrounds/lake.png',item1,item2,item3);

                break;
                case 3:
                     //Forrest

                    //Snake
                    xP = generateRandomNr(0,350);
                    yP = generateRandomNr(170,368);

                    var item1 = new itemObj('media/sprites/snake.png',0,0,75,32,xP,yP,75,32);
                    //mushroom
                    xP = generateRandomNr(0,380);
                    yP = generateRandomNr(170,355);
                    sX = generateRandomNr(0,3);  
                    var item2 = new itemObj('media/sprites/mushroom.png',sX*45,0,45,45,xP,yP,45,45);
                    //Stone
                    xP = generateRandomNr(0,canvas.width-75);
                    yP = generateRandomNr(170,325);
                    var item3 = new itemObj('media/sprites/stone.png',0,0,75,75,xP,yP,75,75);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/forrest.png',item1,item2,item3);
                
                break;
                case 4: //Backyard
                    //Hole
                    xP = generateRandomNr(100,245);
                    yP = generateRandomNr(150,325);

                    var item1 = new itemObj('media/sprites/hole.png',0,0,75,75,xP,yP,75,75);
                    //Woodpile
                    xP = generateRandomNr(0,325);
                    yP = generateRandomNr(236,300);
                    sX = generateRandomNr(0,3);  
                    var item2 = new itemObj('media/sprites/wood.png',sX*100,0,100,100,xP,yP,100,100);
                    //sand
                    xP = generateRandomNr(0,380);
                    yP = generateRandomNr(236,300);
                    sX = generateRandomNr(0,3);  
                    var item3 = new itemObj('media/sprites/sand.png',sX*45,0,45,45,xP,yP,45,45);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/backyard.png',item1,item2,item3);

                break;
                case 5: //Plain
                    //sun
                    xP = generateRandomNr(0,325);
                    yP = generateRandomNr(0,51);

                    var item1 = new itemObj('media/sprites/sun.png',0,0,100,100,xP,yP,100,100);
                    //Cloud
                    xP = generateRandomNr(0,300);
                    yP = generateRandomNr(0,51);
                    
                    var item2 = new itemObj('media/sprites/cloud.png',0,0,100,50,xP,yP,100,50);
                    //Tree
                    xP = generateRandomNr(0,380);
                    yP = generateRandomNr(236,300);
                    sX = generateRandomNr(0,3);  
                    var item3 = new itemObj('media/sprites/tree.png',sX*150,0,150,150,xP,210,150,150);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/plain.png',item1,item2,item3);
                break;
                case 6: // road
                    //signpost
                    xP = generateRandomNr(325,335);
                    yP = generateRandomNr(0,10);
                    sX = generateRandomNr(0,3); 
                    var item1 = new itemObj('media/sprites/signpost.png',sX*100,0,100,150,xP,yP,100,150);
                    //sign
                    xP = generateRandomNr(0,325);
                    yP = generateRandomNr(160,300);
                    
                    var item2 = new itemObj('media/sprites/sign.png',0,0,100,100,xP,yP,100,100);
                    //stone
                    xP = generateRandomNr(0,350);
                    yP = generateRandomNr(0,325);  
                    var item3 = new itemObj('media/sprites/stone_g.png',0,0,75,75,xP,yP,75,75);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/road.png',item1,item2,item3);
                break;
                case 7: //escape
                //lock
                
                    yP = generateRandomNr(90,261);
                    var item1 = new itemObj('media/sprites/lock.png',sX*100,0,44,32,223,yP,44,32);
                    //Zombie
                    xP = generateRandomNr(0,375);
                    
                    var item2 = new itemObj('media/sprites/zombie.png',0,0,50,100,xP,300,50,100);
                    //Safe Sign
                    xP = generateRandomNr(0,95);
                    yP = generateRandomNr(85,218);  
                    var item3 = new itemObj('media/sprites/safe.png',0,0,75,75,xP,yP,75,75);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/escape.png',item1,item2,item3);
                break;
                case 8: //Tavern start

                   //The poster has three places to stay and diffrent values depending
                   sX = generateRandomNr(0,2);
                    if(sX == 0){
                        var item1 = new itemObj('media/sprites/poster.png',0,0,90,115,35,245,90,115);
                    }else if(sX == 1){
                        var item1 = new itemObj('media/sprites/poster.png',0,0,90,115,165,245,96,115);
                    }else if(sX == 2){
                        var item1 = new itemObj('media/sprites/poster.png',0,0,90,115,300,245,90,115);
                    }
                    //Bar Stool
                    xP = generateRandomNr(0,345);
                    
                    var item2 = new itemObj('media/sprites/bar_stool.png',0,0,80,180,xP,220,80,180);
                    //liquer
                    xP = generateRandomNr(0,380);
                    sX = generateRandomNr(0,1);  
                    var item3 = new itemObj('media/sprites/liquer.png',sX*45,0,45,45,xP,165,45,45);
                    
                    //Creating the cell
                    createCell(y,x,'media/backgrounds/tavern.png',item1,item2,item3);
                break;
                case 9: // Dead Forrest

                    //Snake Dead
                    xP = generateRandomNr(0,350);
                    yP = generateRandomNr(170,368);

                    var item1 = new itemObj('media/sprites/snake_d.png',0,0,75,32,xP,yP,75,32);
                    //mushroom
                    xP = generateRandomNr(0,380);
                    yP = generateRandomNr(170,355);
                    sX = generateRandomNr(0,4);  
                    var item2 = new itemObj('media/sprites/mushroom_d.png',sX*45,0,45,45,xP,yP,45,45);
                    //Lampost
                    xP = generateRandomNr(0,canvas.width-75);
                    yP = generateRandomNr(170,325);
                    var item3 = new itemObj('media/sprites/stone_d.png',0,0,75,75,xP,yP);

                    //Creating the cell
                    createCell(y,x,'media/backgrounds/forrest_d.png',item1,item2,item3);
                break;
                case 10: //Cemetary
                    //Rose
                    xP = generateRandomNr(0,365);
                    var item1 = new itemObj('media/sprites/rose.png',0,0,60,60,xP,210,60,60);
                    //Gravelight
                    xP = generateRandomNr(0,365);
                    var item2 = new itemObj('media/sprites/gravelight.png',0,0,60,60,xP,210,60,60);
                    //stone
                    xP = generateRandomNr(0,350);
                    var item3 = new itemObj('media/sprites/stone_g.png',0,0,75,75,xP,255,75,75);
                    
                    //Creating the cell
                    createCell(y,x,'media/backgrounds/cemetary.png',item1,item2,item3);
                break;
                case 11: //Inner Tavern
                    //Grate
                    xP = generateRandomNr(145,325);
                    yP = generateRandomNr(150,300);
                    var item1 = new itemObj('media/sprites/grate.png',0,0,100,100,xP,yP,100,100);
                    //Barstool
                    xP = generateRandomNr(145,345);
                    yP = generateRandomNr(150,220);
                    var item2 = new itemObj('media/sprites/bar_stool.png',0,0,80,180,xP,yP,80,180);
                    //Keg
                    xP = generateRandomNr(145,335);
                    yP = generateRandomNr(150,250);
                    var item3 = new itemObj('media/sprites/barrel.png',0,0,90,150,xP,yP,90,150);
                    
                    //Creating the cell
                    createCell(y,x,'media/backgrounds/tavern_in.png',item1,item2,item3);
                break;
                default:
                    alert('error' +y + x);
                    return;
            }

        }

    }
}

//a function for returning a random number between min and max.
function generateRandomNr(min, max){
    var n = Math.floor(Math.random()*(max - min)+ min);
    return n;
}

//this function makes sure to load all the images beforehand and adds it to its respektive place in the array mapObject
// 4 images and thre images spesifications such as width height and more
//canvas has to preload the images or they wont render as such i do it before the game starts
function createCell(y,x,back,item1,item2,item3){
    
    var background = new Image();
    background.src = back;

    var image1 = new Image();
    image1.src = item1.path;
    
    var image2 = new Image();
    image2.src = item2.path;
    
    var image3 = new Image();
    image3.src = item3.path;

    var mapBackground = {
        background: background,
        image1: image1,
        image1Specs: item1,
        image2: image2,
        image2Specs: item2,
        image3: image3,
        image3Specs: item3,
    }
    
    mapObject[y].splice(x,1,mapBackground);
}

// var image = new Image();
// var image2 = new Image();
// var image3 = new Image();
// var image4 = new Image();
// image.src = "media/backgrounds/house.png";

// image.onload = function(e){
//     ctx.drawImage(image,0,0,canvas.width,canvas.height);
//     image2.src = "media/sprites/lampost.png";
    
    
// }
// image2.onload = function(e){
    
//     ctx.drawImage(image2,0,55);
//     image3.src = "media/sprites/cloud.png";
//     }

//     image3.onload = function(e){
//         ctx.drawImage(image3,150,10);
//         image4.src = 'media/sprites/house.png'
//     }
// image4.onload = function(e){
//     ctx.drawImage(image4,0,0,100,128,generateRandomNr(0,300),78,100,128);
// }

function drawAll(){
    
    ctx.drawImage(mapObject[player.y][player.x].background,0,0,canvas.width,canvas.height);
    let temp1 = mapObject[player.y][player.x].image1Specs;
    
    ctx.drawImage(mapObject[player.y][player.x].image1,temp1.sX,temp1.sY,temp1.sWidth,temp1.sHeight,temp1.x,temp1.y,temp1.width,temp1.height);
    let temp2 = mapObject[player.y][player.x].image2Specs; 
    ctx.drawImage(mapObject[player.y][player.x].image2,temp2.sX,temp2.sY,temp2.sWidth,temp2.sHeight,temp2.x,temp2.y,temp2.width,temp2.height);
    let temp3 = mapObject[player.y][player.x].image3Specs; 
    ctx.drawImage(mapObject[player.y][player.x].image3,temp3.sX,temp3.sY,temp3.sWidth,temp3.sHeight,temp3.x,temp3.y,temp3.width,temp3.height);

}
function change(){


}
function move(){
    if(this.id == 'UP'){
        player.y--;
        drawAll();
        
    }else if(this.id == 'LEFT'){
        player.x--;
        drawAll();
    }else if(this.id == 'RIGHT'){
        player.x++;
        drawAll();
    }else if(this.id == 'DOWN'){
        player.y++;
        drawAll();
    }else if(this.id == 'MISC'){
        drawAll();
        this.style.display = 'none';
        document.getElementById('LEFT').style.display = 'initial';
        document.getElementById('RIGHT').style.display = 'initial';
        document.getElementById('UP').style.display = 'initial';
        document.getElementById('DOWN').style.display = 'initial';
    }
    zombies.forEach(zombie =>{
        //if zombie is both on a higher column and a higher row
        let moveorNot = generateRandomNr(0,5);
        console.log(moveorNot);
        if(moveorNot < 4){

            if(zombie.x > player.x && zombie.y > player.y){
                let decide = generateRandomNr(0,1);
                if(decide == 0){
                    zombie.x--;
                }
                else{
                    
                    zombie.y--;
                }
                
            }
            //if zombie is on a lower column and higher row        
            else if(zombie.x < player.x && zombie.y > player.y){
                let decide = generateRandomNr(0,1);
                if(decide == 0){
                    zombie.x++;
                }
                else{
                    zombie.y--;
                }
                
            }
            //if zombie is on a higher column and a lower row
            else if(zombie.x > player.x && zombie.y < player.y){
                let decide = generateRandomNr(0,1);
                if(decide == 0){
                    zombie.x--;
                }
                else{
                    zombie.y++;
                }
            }
            //if
            //if zombie is either on a higher collumn or a higher row 
            else if((zombie.x > player.x && !(zombie.y > player.y))||(!(zombie.x > player.x) && zombie.y > player.y) ){
                if(zombie.x > player.x){
                    zombie.x--;
                }else if(zombie.y > player.y){
                    zombie.y--;
                }
                
            }
            //If on the same row or collumn
            else if(zombie.x == player.x || zombie.y == player.y){
                //if the row is either higher or lower
                if(zombie.x == player.x){
                    if(zombie.y > player.x){
                        let decide = generateRandomNr(0,1);
                        if(decide == 0){
                            zombie.y--;
                            
                        }else{
                            //nothing happens
                        }
                    }else{
                        let decide = generateRandomNr(0,1);
                        if(decide == 0){
                            zombie.y++;
                            
                        }else{
                            //nothing happens
                        }
                    }
                    // If the collumn is either higher or lower
                }else if(zombie.y == player.y){
                    if(zombie.x > player.x){
                        let decide = generateRandomNr(0,1);
                        if(decide == 0){
                            zombie.x--;
                            
                        }else{
                            //nothing happens
                        }
                    }else{
                        let decide = generateRandomNr(0,1);
                        if(decide == 0){
                        zombie.x++;
                        
                    }else{
                        //nothing happens
                    }
                }
            }
            //if the zombie is on both a lower row and column
        }if(zombie.x < player.x && zombie.y < player.y){
            let decide = generateRandomNr(0,1);
            if(decide == 0){
                zombie.x++;
            }
            else{
                zombie.y++;
            }
        }
         //if zombie is either on a  lower collumn or a lower row 
         else if((zombie.x < player.x && !(zombie.y < player.y))||(!(zombie.x > player.x) && zombie.y < player.y) ){
             if(zombie.x < player.x){
                 zombie.x--;
                }else if(zombie.y < player.y){
                    zombie.y--;
                }
            }
            mapPlacement()
            console.table(gameMap);
        }else{
            //no movement this turn
        }
        });
        
        function mapPlacement(){
        for(let y = 0; y < gameMap.length;y++){
            //a inner for loop determening x corodinate together becoming (y,x) of the map array; for example map[y][x] = n.
            for(let x = 0; x< gameMap[0].length;x++){
                if(y == player.y && x == player.x){
                    gameMap[y][x] = 'Player';
                }
                else{

                    zombies.forEach(zombie =>{
                        if(y == zombie.y && x == zombie.x){
                            gameMap[y][x] = 'Zombie';
                        }else{
                            gameMap[y][x] = 'X';
                        }
                    });
                    
                }
            }
        }
    }
    checkCoords();
}

function checkCoords(){

    if(player.x == 0){
        document.getElementById('LEFT').style.display = 'none';
    }else{
        document.getElementById('LEFT').style.display = 'initial';
    }
    if(player.x == 6){
        document.getElementById('RIGHT').style.display = 'none';
    }else{
        document.getElementById('RIGHT').style.display = 'initial';
    }
    if(player.y == 0){
        document.getElementById('UP').style.display = 'none';
    }else{
        document.getElementById('UP').style.display = 'initial';
    }
    if(player.y == 6){
        document.getElementById('DOWN').style.display = 'none';
    }else{
        document.getElementById('DOWN').style.display = 'initial';
    }
    //Checks for collision with zombie
    zombies.forEach(zombie => {
        if(player.x == zombie.x && player.y == zombie.y){
            alert('you are dead');
            location.reload();
            return;
        }else {
            //if not zombie then cat 
            cats.forEach(cat => {
                if(cat.x == player.x && cat.y == player.y && cat.collected == false){
                    alert('you did it');
                    cat.collected = true;
                    player.score++;
                    
                }
            });
        }

    });
    if(player.x == 3 && player.y == 6 && player.score == 3){
        alert('You escaped');
    }
}

buttons.forEach(button => button.addEventListener('click',move));
