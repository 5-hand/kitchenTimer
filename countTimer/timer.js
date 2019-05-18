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
let cnt = 0;

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

//数字が０以下なら数字の前に０を足して返す関数
function pushZero(num ,place){
    if(num < 10){
        place.textContent = '0' + num;
    }else{
        place.textContent = num;
    }
}

function ableToggle(elem){
   
    elem.disabled = "true";
    if(elem.disabled = true){
    elem.disabled = 'false'
}
    console.log(elem.getAttribute('disabled'));
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
    cnt++;
    if(cnt == 1){
    ableToggle(minElem);
    oldTime = Date.now();
    totalTime = getMS(min,sec);
//1秒ごとに現在の時間と目的の時間を計算して表示
    timerId = setInterval(() =>{
    const currentTime = Date.now();
    const diff = currentTime - oldTime;
    const remainMSec = totalTime - diff;
    const remainSec = Math.ceil((remainMSec /1000) % 60);
    // msを分に変換
    const remainMin = Math.trunc(remainMSec / 60000);
    //６０秒を１分００秒で表示する記述
    if(remainMin == 0 && remainSec == 0){
        textSec.textContent = '00';
        clearInterval(timerId);
    }else if(remainSec % 60 === 0){
        textMin.textContent = '0' + (remainMin + 1);
    }else{
        pushZero(remainSec,textSec);
        pushZero(remainMin,textMin);
    }
},1000);
}
});

//リセットボタンを押した時の記述
reset.addEventListener('click',() =>{
    min = 0;
    sec = 0;
    textMin.textContent = "00";
    textSec.textContent = "00";
    clearInterval(timerId);
});