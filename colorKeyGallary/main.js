//Img Boxes
const boxes = document.querySelectorAll('.boxes .box');
let keyBool = false;
let kCode = 6789;
var passArray = [0,0,0]
let first = true;
function checkKey(e){
        
    if(keyBool == true){
        switch(kCode){
            case 82:
                
                red(this);
            break;
            case 71:
                green(this);
            break;
            case 66:
                blue(this);
            break;
        }
        console.log(kCode);
    }
    else{
        console.log(kCode);
    }
    pass1(this);
    pass2();
}
//Password controll

function red(b){
    b.classList.remove("b","g")
    
    b.classList.toggle("r");

}
function green(b){
    b.classList.remove("b","r")
    
    b.classList.toggle("g");
}
function blue(b){
    b.classList.remove("g","r")
    
    b.classList.toggle("b");
}
function pass1(b){
    //Blue
    if(b.classList.contains("b1")){

        if(b.classList.contains("b")){
            passArray[0] = 120;
        }else{
            passArray[0] = 0;
        }
    }
    //Red
    if(b.classList.contains("b6")){

        if(b.classList.contains("r")){
            passArray[1] = 240;
        }else{
            passArray[1] = 0;
        }
    }

    //green
    if(b.classList.contains("b4")){

        if(b.classList.contains("g")){
            passArray[2] = 60;
        }else{
            passArray[2] = 0;
        }
    }
    //final
    if(b.classList.contains("b5") && (passArray[0] + passArray[1] + passArray[2] == 420)){
        if(b.classList.contains("b")){
            document.getElementById("yu89Hk").innerHTML = "Password: RRaVt6Zp8Ye1";
            console.log("")
            document.getElementById("yu89Hk").innerHTML = "";
        }
    }
    
    
}
function pass2(){
    if (passArray[0] + passArray[1] + passArray[2] == 420 && first == true ){
        alert("Check Breakpoint for twin paths when applying blue. Then step and mind the sunlight");
        first = false;
    }
}
function pass3(){
    console.log("Hello");
    if(document.getElementById('password').value == "RRaVt6Zp8Ye1"){
        alert("Congrats You beat the remiedial JS ColorKey puzzle Good for you");
    }

}
function kDown(e){
    keyBool = true;
    kCode = e.keyCode;
    
}
function kUp(e){
    keyBool = false;
    kCode = 6789;
}
boxes.forEach(box => box.addEventListener('click',checkKey));
window.addEventListener('keydown',kDown);
window.addEventListener('keyup',kUp);
document.querySelector('.passCheck').addEventListener('click',pass3)