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
