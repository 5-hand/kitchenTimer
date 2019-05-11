const textMin = document.querySelector('.js-textMin');
const textSec = document.querySelector('.js-textSec');
const minElem = document.querySelector('.js-min');
const secElem = document.querySelector('.js-sec');
const toggle = document.querySelector('.js-toggle');
const reset = document.querySelector('.js-reset');
let min = 0;
let sec = 0;
let timer;

//引数に1足して返す関数
function valuePlus(value){
    return value + 1;
}

//引数に1引いて返す関数
function valueMinus(value){
    return value - 1;
}

//timeを足した後にplaceに反映させる関数
function timePlus(time,place){
    time = valuePlus(time);
    if(time < 10){
    place.textContent = "0" + time;
    }else{
    place.textContent = time;
    }
}

//timeを引いた後にplaceに反映させる関数
function timeMinus(time,place){   
    timer = setInterval(function(){
        if(time)
            time = valueMinus(time);
            if(time < 10){
            place.textContent = "0" + time;
            }else{
            place.textContent = time;
            }
    },1000);
}

//分のボタンを押した時に数をカウントする記述
minElem.addEventListener('click',function(){
    min = valuePlus(min);
    if(min < 100){
        if(min < 10){
        textMin.textContent = "0" + min;
        }else{
        textMin.textContent = min;
        }
    }else{
    min =0;
    textMin.textContent = "0" + min;
    }
});

//秒のボタンを押した時に数をカウントする記述
secElem.addEventListener('click',function(){
    sec = valuePlus(sec);
    if(sec < 60){
        if(sec < 10){
        textSec.textContent = "0" + sec;
        }else{
        textSec.textContent = sec;
        }
    }else{
    sec =0;
    textSec.textContent = "0" + sec;
    }
});

//リセットボタンを押した時の記述
reset.addEventListener('click',function(){
    clearInterval(timer);
    min = 0;
    sec = 0;
    textMin.textContent = "00";
    textSec.textContent = "00";
});

//スタートボタンの挙動
toggle.addEventListener('click',function(){
    if(!(min == 0) || !(sec == 0)){
        timeMinus(sec,textSec);
    }
});