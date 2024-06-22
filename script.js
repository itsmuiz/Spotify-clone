
async function getSongs() { // async function
    let a = await fetch('http://127.0.0.1:5500/song/'); //api request
    let res = await a.text(); // get response

    let div = document.createElement('div'); // create a div element
    div.innerHTML = res; // div's content is equal response
    let as = div.getElementsByTagName('a'); // get all 'a'

    let songs = []; // an empty array

    for (let index = 0; index < as.length; index++) { // a traditonal loop

        const element = as[index]; 
        if (element.href.endsWith('.mp3')) { // get all 'mp3' elements 
            songs.push(element.href); // now push all 'mp3' elements into the array
        }

    }

    return songs; // return the array
}

async function main() { 
    let songs = await getSongs();
    console.log(songs);

    var audio = new Audio(songs[0]);
    audio.play(); 

    audio.addEventListener('loadeddata', ()=>{
        let duration = audio.duration;
        // let minutes = Math.floor(duration/60);
        // let seconds = Math.floor(duration%60);
        // let time = `${minutes}:${seconds}`;
        console.log(audio.duration, audio.currentSrc, audio.currentTime);

    });

}

main();