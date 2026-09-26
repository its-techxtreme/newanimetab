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

    let day = now.getDay();
    let month = now.getMonth();
    let year = now.getFullYear();

    day = String(day).padStart(2, '0');
    month = String(month).padStart(2, '0');

    const string = `${day}/${month}/${year}`;

    document.getElementById('date').textContent = string;
}

updateDate();
updateClock();

setInterval(updateClock, 1000);
