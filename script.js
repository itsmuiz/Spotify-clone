
async function getSongs() {                     // async function
 let a = await fetch('../song/'); //api request
    let res = await a.text();                   // get response

    let div = document.createElement('div');    // create a div element
    div.innerHTML = res;                        // div's content is equal response
    let as = div.getElementsByTagName('a');     // get all 'a'

    let songs = [];                             // an empty array

    for (let index = 0; index < as.length; index++) { // a traditonal loop

        const element = as[index];
        if (element.href.endsWith('.mp3')) { // get all 'mp3' elements 
            songs.push(element.href.split('/song/')[1].replaceAll('%20', ' ')); // now push all 'mp3' elements into the array
        }

    }

    return songs; // return the array
}

async function main() {
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];

    for (const song of songs) {

        songUL.innerHTML = songUL.innerHTML + `<li>${song}</li>`;

    }

    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener('loadeddata', () => {
        let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime);

    });

}

main();
