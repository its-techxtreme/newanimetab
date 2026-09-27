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
        if(paused === false) {
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;

            minutes = String(minutes).padStart(2, '0');
            seconds = String(seconds).padStart(2, '0');

            displayElement.textContent = `${minutes}:${seconds}`;

            if (--timeRemaining < 0) {
                clearInterval(intervalId);
                intervalId = undefined;
                displayElement.textContent = "00:00";
                if(timeRemaining > 0) {
                    timeRemaining = -1;
                }
            }
        } else {
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;

            minutes = String(minutes).padStart(2, '0');
            seconds = String(seconds).padStart(2, '0');

            displayElement.textContent = `${minutes}:${seconds}`;
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
startTimer(display);
