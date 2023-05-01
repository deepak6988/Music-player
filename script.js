console.log("Running");

var songlist = Array.from(document.getElementsByClassName("songlist"));
var audioelement = new Audio('songs/1.mp3');
var index = 1;
var d=0;
var time;
var temp=0;
// var myinterval;

// audioelement.play();
// console.log(songlist);
// ========================music player==============================
document.getElementById('up').addEventListener('click', function () {
    document.documentElement.scrollTop = 0;
    document.getElementById('bg').style.display = 'block';
    document.getElementById('music_player').style.display = 'flex';
    document.getElementById('navbar').style.filter = 'blur(10px)';
    document.getElementById('container').style.filter = 'blur(10px)';
    document.getElementById('controls').style.filter = 'blur(10px)';
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
})
document.getElementById('down').addEventListener('click', function () {
    document.getElementById('bg').style.display = 'none';
    document.getElementById('music_player').style.display = 'none';
    document.getElementById('navbar').style.filter = 'blur(0px)';
    document.getElementById('container').style.filter = 'blur(0px)';
    document.getElementById('controls').style.filter = 'blur(0px)';
    document.getElementsByTagName('body')[0].style.overflowY = 'visible';
})

// =============songs==========================
var songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" }
];

// ============name and image===================
songlist.forEach(function (elements, i) {
    // console.log(i);
    elements.getElementsByClassName("song_img")[0].src = songs[i].coverPath;
    elements.getElementsByClassName("song_name")[0].innerHTML = songs[i].songName;
})

// ==============play/pause=================
function a() {
    if (audioelement.paused) {
        audioelement.play();
        // console.log("played");
        document.getElementById('masterplay').classList.remove('fa-circle-play');
        document.getElementById('masterplay').classList.add('fa-circle-pause');
        document.getElementById('master').classList.remove('fa-circle-play');
        document.getElementById('master').classList.add('fa-circle-pause');
        document.getElementById('up').style.display = 'inline';
        list_play();
        // time_update();
        // myinterval=setInterval(time_update,2300);
    }
    else {
        all_play();
        audioelement.pause();
        // console.log("paused");
        document.getElementById('masterplay').classList.remove('fa-circle-pause');
        document.getElementById('masterplay').classList.add('fa-circle-play');
        document.getElementById('master').classList.remove('fa-circle-pause');
        document.getElementById('master').classList.add('fa-circle-play');
        document.getElementById('up').style.display = 'none';
        // clearInterval(myinterval);
    }
}

// =================progress bar====================
audioelement.addEventListener('timeupdate',function(){
    // console.log(audioelement.currentTime);
    // console.log(parseInt((audioelement.currentTime/audioelement.duration)*100));
    document.getElementsByClassName('bar')[0].value=parseInt((audioelement.currentTime/audioelement.duration)*100);
    document.getElementsByClassName('bar')[1].value=parseInt((audioelement.currentTime/audioelement.duration)*100);
    time_update();
})

document.getElementsByClassName('bar')[0].addEventListener('change',function(){
    value=document.getElementsByClassName('bar')[0].value;
    audioelement.currentTime=parseInt((value*audioelement.duration)/100);
})
document.getElementsByClassName('bar')[1].addEventListener('change',function(){
    value=document.getElementsByClassName('bar')[1].value;
    audioelement.currentTime=parseInt((value*audioelement.duration)/100);
})


// =================time update==================
function time_update(){
    // console.log("running");
    time=parseInt((audioelement.currentTime/audioelement.duration)*100);
    // console.log(time%60==0);
    if(time%60==0 && temp!=time){
        // console.log("called");
        temp=time;
        d++;
    }
    if(audioelement.currentTime==audioelement.duration){
        next();
    }
    else{
        document.getElementById('ct').innerHTML='0'+d+':'+(time-(60*d));
        document.getElementById('mt').innerHTML='0'+d+':'+(time-(60*d));
    }
    
}


// =================songlist========================
Array.from(document.getElementsByClassName('slplay')).forEach(function (element) {
    element.addEventListener('click', function (e) {
        all_play();

        // console.log(e.target.id);
        index = e.target.id;
        audioelement.src = `songs/${index}.mp3`;
        if (audioelement.paused) {
            
            a();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
        }
        else {
            all_play();
            a();
        }
    })
})

function all_play() {
    Array.from(document.getElementsByClassName('slplay')).forEach(function (element) {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

function list_play() {
    document.getElementById('player_img').src = songs[index-1].coverPath;
    document.getElementsByClassName('player_name')[0].innerHTML = songs[index - 1].songName;
    document.getElementsByClassName('player_name')[1].innerHTML = songs[index - 1].songName;
    document.getElementById(index).classList.remove('fa-circle-play');
    document.getElementById(index).classList.add('fa-circle-pause');

}

// ================next=================
function next() {
    temp=0;
    d=0;
    if (index == 9) {
        index = 1;
        // console.log("next if");
        audioelement.src = `songs/${index}.mp3`;
        a();
        all_play();
        list_play();
    }
    else {
        index++;
        // console.log("next else");
        audioelement.src = `songs/${index}.mp3`;
        all_play();
        a();
        list_play();
    }
}

// ===============back=====================
function back() {
    temp=0;
    d=0;
    if (index == 1) {
        index = 9;
        // console.log("back if");
        audioelement.src = `songs/${index}.mp3`;
        a();
        all_play();
        list_play();
    }
    else {
        index--;
        // console.log("back else");
        audioelement.src = `songs/${index}.mp3`;
        all_play();
        a();
        list_play();
    }
}
