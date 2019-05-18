const textMin = document.querySelector('.js-textMin');
const textSec = document.querySelector('.js-textSec');
const minElem = document.querySelector('.js-min');
const secElem = document.querySelector('.js-sec');
const toggle = document.querySelector('.js-toggle');
const reset = document.querySelector('.js-reset');
let cnt = 0;
let countDown;
let countUp;
let min = 0;
let sec = 0;
let oldTime;
let totalTime;
let startCnt = 0;
let diff;
let nowdiff;
let remainMsec;
let remainMin;
let remainSec;
let now;
let nowMin;
let nowSec;
let progress;

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

//buttonの有効・無効を切り替え
function disableToggle(){
    if(startCnt > 0){
        minElem.disabled = true;
        secElem.disabled = true;
    }else{
        minElem.disabled = false;
        secElem.disabled = false;
    }   
}

//resetの中身
function resetContent(){
    startCnt=0;
    cnt = 0;
    min = 0;
    sec = 0;
    disableToggle();
    pushZero(min,textMin);
    pushZero(sec,textSec);
    clearInterval(countDown);
    clearInterval(countUp);
    console.log('jfioa@wje');
}

//分のボタンを押した時に数をカウントする記述
minElem.addEventListener('click',() =>{
    min = valuePlus(min);
    if(min < 100){
        pushZero(min,textMin);
    }else{
    min =0;
    pushZero(min,textMin);
    }
});

//秒のボタンを押した時に数をカウントする記述
secElem.addEventListener('click',() => {
    sec = valuePlus(sec);
    if(sec < 60){
        pushZero(sec,textSec);
    }else{
    sec =0;
    pushZero(sec,textSec);
    }
});

// スタートボタンを押した時の記述
toggle.addEventListener('click',() =>{
    startCnt++;
    disableToggle();
    if(cnt ==1 || (min == 0 && sec == 0)){
    cnt=1;
    // カウントアップタイマーの仕組み
    if(cnt == 1 && startCnt ==1){
    now = Date.now();
    countUp =setInterval(()=>{
        progress = Date.now();
        nowdiff = progress - now;
        console.log(nowdiff);
        nowSec = Math.trunc((nowdiff /1000) % 60);
        nowMin = Math.trunc(nowdiff / 60000);
        if(nowMin == 99 && nowSec > 59){
        now = Date.now();     
        pushZero(nowMin,textMin);
        pushZero(nowSec,textSec);
        }else{
        pushZero(nowMin,textMin);
        pushZero(nowSec,textSec);
        console.log(nowMin);
        console.log(nowSec);
        }
    },1000);
    }else if(cnt == 1 && startCnt == 2){
        clearInterval(countUp);
        startCnt++;
        console.log('gjaope@e');
     }else{
        console.log('gjaopefkop[agj@e');
        now = Date.now();
        let continueTime = nowdiff;
        countUp = setInterval(()=>{
            progress = Date.now()+ continueTime;
            nowdiff = progress - now;
            console.log(nowdiff);
            nowSec = Math.trunc((nowdiff /1000) % 60);
            nowMin = Math.trunc(nowdiff / 60000);
            if(nowMin == 99 && nowSec > 59){
            now = Date.now();     
            pushZero(nowMin,textMin);
            pushZero(nowSec,textSec);
            }else{
            pushZero(nowMin,textMin);
            pushZero(nowSec,textSec);
            console.log(nowMin);
            console.log(nowSec);
            }
        },1000);
        startCnt = 1;
        }
    }else{
        //カウントダウンタイマーの仕組み
        if(cnt == 0 || startCnt == 1){
            cnt = 0;
            oldTime = Date.now();
            totalTime = getMS(min,sec);
            //1秒ごとに現在の時間と目的の時間を計算して表示
            countDown = setInterval(() =>{
            const currentTime = Date.now();
            diff = currentTime - oldTime;
            remainMSec = totalTime - diff;
            remainSec = Math.ceil((remainMSec /1000) % 60);
            // msを分に変換
            remainMin = Math.trunc(remainMSec / 60000);
            //６０秒を１分００秒で表示する記述
            if(remainMin == 0 && remainSec == 0){
                resetContent();
            }else if(remainSec % 60 === 0){
                pushZero((remainMin + 1),textMin);
                textSec.textContent = '00';
            }else{
                pushZero(remainSec,textSec);
                pushZero(remainMin,textMin);
            }
            },1000);
    
        }else if(cnt == 0 || startCnt == 2){
            clearInterval(countDown);
            startCnt++;
        }else{
            console.log('jdgq');
            oldTime = Date.now();
            totalTime = remainMSec;
        //1秒ごとに現在の時間と目的の時間を計算して表示
            countDown = setInterval(() =>{
            const currentTime = Date.now();
            diff = currentTime - oldTime;
            remainMSec = totalTime - diff;
            remainSec = Math.ceil((remainMSec /1000) % 60);
            // msを分に変換
            remainMin = Math.trunc(remainMSec / 60000);
            //６０秒を１分００秒で表示する記述
            if(remainMin == 0 && remainSec == 0){
                resetContent();
            }else if(remainSec % 60 === 0){
                pushZero((remainMin + 1),textMin);
                textSec.textContent = '00';
            }else{
                pushZero(remainSec,textSec);
                pushZero(remainMin,textMin);
            }
            },1000);
            startCnt = 1;
        }
    }
});

//リセットボタンを押した時の記述
reset.addEventListener('click',resetContent);