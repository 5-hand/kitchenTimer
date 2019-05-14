const textMin = document.querySelector('.js-textMin');
const textSec = document.querySelector('.js-textSec');
const minElem = document.querySelector('.js-min');
const secElem = document.querySelector('.js-sec');
const toggle = document.querySelector('.js-toggle');
const reset = document.querySelector('.js-reset');
let timerId;
let min = 0;
let sec = 0;
let oldTime;
let totalTime;

//引数に1足して返す関数
function valuePlus(value){
    return value + 1;
}

//引数に1引いて返す関数
function valueMinus(value){
    return value - 1;
}

//minとsecのミリ秒を足して返す関数
function getMS(minute,second){
    let msMin = minute * 60000;
    let msSec = second * 1000;
    return msMin + msSec;
}

function pushZero(num ,place){
    if(num < 10){
        place.textContent = '0' + num;
    }else{
        place.textContent = num;
    }
}

//分のボタンを押した時に数をカウントする記述
minElem.addEventListener('click',() =>{
    min = valuePlus(min);
    if(min < 100){
        pushZero(min,textMin);
    }else{
    min =0;
    textMin.textContent = "0" + min;
    }
});

//秒のボタンを押した時に数をカウントする記述
secElem.addEventListener('click',() => {
    sec = valuePlus(sec);
    if(sec < 60){
        pushZero(sec,textSec);
    }else{
    sec =0;
    textSec.textContent = "0" + sec;
    }
    console.log(sec);
});

// スタートボタンを押した時の記述
toggle.addEventListener('click',() =>{
    oldTime = Date.now();
    totalTime = getMS(min,sec);
//1秒ごとに現在の時間と目的の時間を計算して表示
    timerId = setInterval(() =>{
    const currentTime = Date.now();
    const diff = currentTime - oldTime;
    const remainMSec = totalTime - diff;
    const remainSec = Math.ceil((remainMSec /1000) % 60);
    // msを分に変換
    const remainMin = Math.trunc(remainMSec/60000);
    pushZero(remainSec,textSec);
    pushZero(remainMin,textMin);
    if(remainMin == 0 && remainSec == 0){
        clearInterval(timerId);
    }
},1000);
});

//リセットボタンを押した時の記述
reset.addEventListener('click',() =>{
    min = 0;
    sec = 0;
    textMin.textContent = "00";
    textSec.textContent = "00";
    clearInterval(timerId);
});