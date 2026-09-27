// const API_KEY = import.meta.env.VITE_NASA_API_KEY

// fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).
// then(response => response.json()).then(data => {
//   let media;

//   if(data.media_type === "image") {
//     media = `<image src="${data.url}"/>`
//   } else if (data.url.includes("youtube")){
//     media = `<iframe src="${data.url}"></iframe>`
//   } else {
//     media = `<video src="${data.url}" controls></video>`
//   }

//    document.body.style.backgroundImage = `url(${data.url})`
//    ;
// })
// .catch(err => {
//     document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
//   });

let timeRemaining = 0;
let intervalId;
let paused = true;
let beepId;
let audioCtx;

const display = document.getElementById('timer');
const searchInput = document.getElementById('query');

const plusButton = document.getElementById('plus');
plusButton.addEventListener('click', () => {
    timeRemaining += 60;
    updateTimer(display);
});

const minusButton = document.getElementById('minus');
minusButton.addEventListener('click', () => {
    if(timeRemaining > 59) {
        timeRemaining -= 60;
        updateTimer(display);
    }
});

const ppButton = document.getElementById('pp');
ppButton.addEventListener('click', () => {
    if(paused === true) {
        paused = false;
        if (!audioCtx) audioCtx = new AudioContext();
        audioCtx.resume();
        stopBeep();
        updateTimer(display);
        ppButton.textContent = "Pause"

        if (intervalId === undefined) {
            startTimer(display);
        }
    } else {
        paused = true;
        updateTimer(display);
        ppButton.textContent = "Play"
    }
});

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    paused = true;
    timeRemaining = 0;
    ppButton.textContent = "Play"
    updateTimer(display)
    stopBeep();
});

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm;

    if(hours >= 12) {
        ampm = "PM"
    } else {
        ampm = "AM"
    }

    hours = hours % 12;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    if(hours == 0) {
        hours = 12
    }

    const string = `${hours}:${minutes}:${seconds} ${ampm}`

    document.getElementById('clock').textContent = string;
}

function updateDate() {
    const now = new Date();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    day = String(day).padStart(2, '0');
    month = String(month).padStart(2, '0');

    const string = `${month}/${day}/${year}`;

    document.getElementById('date').textContent = string;
}

function startTimer(displayElement) {
    intervalId = setInterval(() => {
        if (paused === false) {
            if (timeRemaining <= 0) {
                timeRemaining = 0;
                clearInterval(intervalId);
                intervalId = undefined;
                displayElement.textContent = "00:00";
                paused = true;
                ppButton.textContent = "Play"
                startBeep();
                return;
            }

            timeRemaining--;

            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;

            minutes = String(minutes).padStart(2, '0');
            seconds = String(seconds).padStart(2, '0');

            displayElement.textContent = `${minutes}:${seconds}`;
        } else {
            updateTimer(displayElement);
        }
    }, 1000);
}

function updateTimer(displayElement) {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    displayElement.textContent = `${minutes}:${seconds}`;
}

function startBeep() {
    if (beepId) return;
    if (!audioCtx) audioCtx = new AudioContext();
    audioCtx.resume();
    document.getElementById('stop').style.display = "block";
    beepId = setInterval(() => {
        let o = audioCtx.createOscillator();
        let g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = "square";
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.05, audioCtx.currentTime);
        o.start();
        o.stop(audioCtx.currentTime + 0.12);
    }, 500);
}

function stopBeep() {
    clearInterval(beepId);
    beepId = undefined;
    document.getElementById('stop').style.display = "none";
}

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
    stopBeep();
});

function performSearch() {
    const queryText = encodeURIComponent(searchInput.value.trim());
        if (queryText !== "") {
            window.location.href = `https://google.com/search?q=${queryText}`;
            }
        }

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

updateDate();
updateClock();

setInterval(updateClock, 1000);
updateTimer(display);

// old local loops still in public/tunes
// ["Rain desk", "rain-desk.wav"],
// ["Night bus", "night-bus.wav"],
// ["Soft keys", "soft-keys.wav"],
// ["Tape hiss", "tape-hiss.wav"],
// ["Window seat", "window-seat.wav"],
// ["Late homework", "late-homework.wav"],
// ["City rain", "city-rain.wav"],
// ["Quiet room", "quiet-room.wav"],
// ["Slow walk", "slow-walk.wav"],
// ["Dim lamp", "dim-lamp.wav"],

const tunes = [
    ["Rain desk", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
    ["Night bus", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"],
    ["Soft keys", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"],
    ["Tape hiss", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"],
    ["Window seat", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"],
    ["Late homework", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"],
    ["City rain", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"],
    ["Quiet room", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"],
    ["Slow walk", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"],
    ["Dim lamp", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"],
];

const mw = document.getElementById('mw');
const mlist = document.getElementById('mlist');
const song = new Audio();
let cur = null;
let spotOn = false;
let spotPlay = false;
let spotCtrl = null;

function hideMusic() {
    if (spotPlay) {
        mw.dataset.l = mw.style.left;
        mw.dataset.t = mw.style.top;
        mw.dataset.r = mw.style.right;
        mw.style.left = "-4000px";
        mw.style.top = "0px";
        mw.style.right = "auto";
        mw.style.display = "block";
        return;
    }
    closeSpot();
    mw.style.display = "none";
}

function showMusic() {
    mw.style.display = "block";
    if (mw.style.left == "-4000px") {
        mw.style.left = mw.dataset.l || "";
        mw.style.top = mw.dataset.t || "";
        mw.style.right = mw.dataset.r || "40px";
    }
}

document.getElementById('mu').addEventListener('click', () => {
    if (mw.style.display == "block" && mw.style.left != "-4000px") {
        hideMusic();
    } else {
        showMusic();
    }
});

document.getElementById('mx').addEventListener('click', (e) => {
    e.stopPropagation();
    hideMusic();
});

document.getElementById('mstop').addEventListener('click', (e) => {
    e.stopPropagation();
    song.pause();
    song.currentTime = 0;
    if (cur) cur.classList.remove('on');
    cur = null;
    closeSpot();
});

for (let i = 0; i < tunes.length; i++) {
    let b = document.createElement('button');
    b.textContent = tunes[i][0];
    b.addEventListener('click', () => {
        if (cur) cur.classList.remove('on');
        b.classList.add('on');
        cur = b;
        // let root = import.meta.env.BASE_URL;
        // if (!root.endsWith("/")) root += "/";
        // song.src = root + "tunes/" + tunes[i][1];
        song.src = tunes[i][1];
        song.loop = true;
        song.play();
    });
    mlist.appendChild(b);
}

function closeSpot() {
    if (spotCtrl) {
        spotCtrl.pause();
        if (spotCtrl.destroy) spotCtrl.destroy();
    }
    spotCtrl = null;
    spotPlay = false;
    spotOn = false;
    document.getElementById('mbox').innerHTML = "";
    document.getElementById('mspot').textContent = "Open Spotify";
}

function openSpot() {
    let box = document.getElementById('mbox');
    let el = document.createElement('div');
    el.id = "spot";
    box.appendChild(el);
    spotOn = true;
    document.getElementById('mspot').textContent = "Close Spotify";

    const go = (api) => {
        api.createController(el, {
            uri: "spotify:playlist:37i9dQZF1DWWQRwui0ExPn",
            width: "100%",
            height: 152,
        }, (ctrl) => {
            spotCtrl = ctrl;
            ctrl.addListener('playback_update', (e) => {
                let d = e.data;
                spotPlay = d.isPaused === false;
                if (d.duration && d.position > d.duration - 900 && d.isPaused) {
                    ctrl.play();
                }
            });
        });
    };

    if (window._spotApi) go(window._spotApi);
    else window.onSpotifyIframeApiReady = (api) => {
        window._spotApi = api;
        go(api);
    };
}

document.getElementById('mspot').addEventListener('click', () => {
    if (spotOn) closeSpot();
    else openSpot();
});

let dragging = false;
let ox = 0;
let oy = 0;
const mbar = document.getElementById('mbar');

mbar.addEventListener('mousedown', (e) => {
    if (e.target.id == "mx" || e.target.id == "mstop") return;
    dragging = true;
    ox = e.clientX - mw.offsetLeft;
    oy = e.clientY - mw.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    mw.style.left = (e.clientX - ox) + "px";
    mw.style.top = (e.clientY - oy) + "px";
    mw.style.right = "auto";
});

document.addEventListener('mouseup', () => {
    dragging = false;
});
