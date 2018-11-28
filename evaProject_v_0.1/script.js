
const divs = document.querySelectorAll('.divs');
var interval;
//EVE parts
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();
let p = document.createElement('p');
let output = document.querySelector('.output')
rec.interimResults = true;
rec.lang = 'en-US';
rec.addEventListener('result',e =>{
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    p.textContent = transcript;
    if(e.results[0].isFinal){
        p = document.createElement('p');
        output.appendChild(p);
        if(transcript.match(/eve|EVE|Eve/)){
            console.log('getting Eve')

            if(transcript.match(/time|clock/)){
                showInfo('clock');
                console.log('getting clock')
            }else if(transcript.match(/weather/)){
                showInfo('weather')
            }
        }
    }
});
rec.addEventListener('end',rec.start);

rec.start();
//Functions
function showInfo(match){

    switch(match){
        case 'clock':
            showDiv('clock');
            interval = setInterval(clockUpdate,1000);
        break;
        case 'weather':
            showDiv('weather');
            interval = setInterval(weatherUpdate,60*1000);
        break;

    }
}
function showDiv(exemptDiv){
    divs.forEach(div => {
        if(div.classList.contains(exemptDiv)){
            div.style.display = 'grid';
        }else{
            div.style.display ='none';
        }
    })
}
function weatherUpdate(weather){
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    hum.innerHTML = weather.hum;
    icon.src = 'img/codes/'+weather.icon+'.png';
}
function updatebyZip(zip){
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=metric&appid=${APPID}`;
    sendRequest(url);
}
function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var data = JSON.parse(xmlhttp.responseText);
            var weather ={};
            console.log(data);
            weather.wind = data.wind.speed;
            weather.direction = data.wind.deg;
            weather.loc = data.name;
            weather.temp = data.main.temp;
            weather.hum = data.main.humidity;
            weather.icon = data.weather[0].id;
            weatherUpdate(weather);
        }
    };
    xmlhttp.open('GET',url,true);
    xmlhttp.send();
}
//Clock parts
const hands = document.querySelectorAll('.hand');
var date = new Date();
function clockUpdate(){
    date = new Date();
    var hour = (date.getHours() < 9)? '0'+date.getHours(): date.getHours();
    var min = (date.getMinutes() < 9)? '0'+date.getMinutes(): date.getMinutes();
    var sec = (date.getSeconds() < 9)? '0'+date.getSeconds(): date.getSeconds();
    hands.forEach(hand =>{
        if(hand.id == 'hour') hand.innerHTML = hour;
        if(hand.id == 'min') hand.innerHTML = min;
        if(hand.id == 'sec') hand.innerHTML = sec;
    });

    
}
//Weather Parts
var APPID = '2d381d7b0999c3be968d5e9ef548f558';
var temp = document.querySelector('#temp');
var loc = document.querySelector('#loc');
var hum = document.querySelector('#hum');
var wind = document.querySelector('#speed');
var direction = document.querySelector('#direction');
var icon = document.querySelector('#icon');
// var weather = {};
// weather.wind = 3.5;
// weather.direction = 'S';
// weather.loc = 'Stockholm';
// weather.temp = -3;
// weather.hum = 1;
// weather.icon = 200;
window.onload = function(){
    updatebyZip('Segeltorp');
}