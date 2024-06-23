
let currentSong = new Audio();
let songs;

async function getSongs() {                     // async function
    let a = await fetch('../song/');            //api request
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


const playMusic = (track, pause = false) => {

    currentSong.src = '/song/' + track;
    currentSong.play();

    play.src = './pause.svg';

    document.querySelector('.song-info').innerHTML = track.replace('.mp3', '').split('-')[0];
    document.querySelector('.song-time').innerHTML = '00:00';

}

async function main() {
    songs = await getSongs();
    playMusic(songs[0], true);

    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];

    for (const song of songs) {

        songUL.innerHTML = songUL.innerHTML + `
                            <li>
                                <img class="invert" src="./music.svg" alt="icon">
                                <span>
                                    <p>${song.replace('.mp3', '')}</p>
                                    <p class="invert-5 txt1">MUIZ</p>
                                </span>
                                <img class="point" src="./play.svg" alt="icon">
                            </li>`;

    }

    // attach an event listener to each song 
    Array.from(document.querySelector('.songList')
        .getElementsByTagName('li')).forEach(e => {

            e.addEventListener('click', element => {

                playMusic(e.getElementsByTagName('p')[0].innerHTML + '.mp3');

            });
        });

    //attach event listeners

    play.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = './pause.svg';
        } else {
            play.src = './on.svg';
            currentSong.pause();
        }
    });

    // Listen for timeupdate events

    currentSong.addEventListener('timeupdate', () => {
        // console.log(currentSong.duration, currentSong.currentTime);
        let duration = currentSong.duration;
        let currentTime = currentSong.currentTime;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        let minutes2 = Math.floor(currentTime / 60);
        let seconds2 = Math.floor(currentTime % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (seconds2 < 10) {
            seconds2 = '0' + seconds2;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (minutes2 < 10) {
            minutes2 = '0' + minutes2;
        }
        document.querySelector('.song-time').innerHTML = `${minutes2}:${seconds2} / ${minutes}:${seconds}`;
        document.querySelector('.ball').style.left =
        (currentSong.currentTime / currentSong.duration) * 100 + '%' ;
    });

    // Listen for click events on the progress bar

    document.querySelector('.seekbar').addEventListener('click', e => {
        document.querySelector('.ball').style.left = 
        (e.offsetX / (e.target.getBoundingClientRect().width) * 100 + "%" );
        currentSong.currentTime = (e.offsetX / (e.target.getBoundingClientRect().width) * currentSong.duration);
    });

    // listen for changes hamburger
    document.querySelector('.ham').addEventListener('click', () => {
        document.querySelector('.left').style.left = '0%';
    });

    // event listner for close
    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.left').style.left = '-100%';
    });

    // previous
    previous.addEventListener('click', () => {
        let currentTrack = currentSong.src.split('/song/')[1].replaceAll('%20', ' ');
        let currentIndex = songs.indexOf(currentTrack);
        if (currentIndex > 0) {
            playMusic(songs[currentIndex - 1]);
        }
    });

    // next
    next.addEventListener('click', () => {
        let currentTrack = currentSong.src.split('/song/')[1].replaceAll('%20', ' ');
        let currentIndex = songs.indexOf(currentTrack);
        if (currentIndex < songs.length - 1) {
            playMusic(songs[currentIndex + 1]);
        }
    });

}

main();