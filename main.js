let allType = document.querySelectorAll(".container .pomodoro-types button");
let timer = document.querySelector(".container .time-bar h3");
let startBtn = document.querySelector(".container .control-btn .start-time");
let stopBtn = document.querySelector(".container .control-btn .stop-time");
let resetBtn = document.querySelector(".container .control-btn .reset-time");
let circularBar = document.querySelector(".container .time-bar");

const audio = new Audio('sound/alarm.mp3')
let getType = (elem, type) => {
    for (x of allType) {
        x.classList.remove('active');
    }
    elem.classList.add('active');
    pomodoreType = type;
    resetTimer();
}

const type_pomodore = "pomodore";
const type_shortbreak = "shortbreak";
const type_longbreak = "longbreak";;
let pomodoreType = type_pomodore;

const pomodoreInSec = 1500;
const shortbreakInSec = 300;
const longbreakInSec = 900;
let timerValue = pomodoreInSec;
let progress;
let factor = 360 / timerValue;


let resetTimer = () => {
    clearInterval(progress);
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    if (pomodoreType === 'pomodore') {
        timerValue = pomodoreInSec;
    } else if (pomodoreType === 'shortbreak') {
        timerValue = shortbreakInSec;
    } else {
        timerValue = longbreakInSec;
    }
    factor = 360 / timerValue;
    timerProgress();
    audio.pause();
   
}

let numberInMinute = (number) => {
    let minutes = Math.trunc(number / 60).toString().padStart(2, '0');
    let seconds = Math.trunc(number % 60).toString().padStart(2, '0');

    return `${minutes} : ${seconds}`;
}

let timerProgress = () => {
    timer.innerHTML = `${numberInMinute(timerValue)}`;
    circularBar.style.background = `conic-gradient(#025050 ${timerValue * factor}deg, #fff  0deg)`;
    if(timerValue==0){
        stopTimer();
        audio.play();
        
    }
}

let startTimer = () => {
    progress = setInterval(() => {
        timerValue--;
        timerProgress();
    }, 1000);

    startBtn.style.display = "none";
    stopBtn.style.display = "block";
}

let stopTimer = () => {
    clearInterval(progress);
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
}
startBtn.addEventListener('click', startTimer)
stopBtn.addEventListener('click', stopTimer)
resetBtn.addEventListener('click', resetTimer)