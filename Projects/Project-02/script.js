console.log("Hello start writing javascript")

let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSong() {
    let a = await fetch("http://127.0.0.1:3000/Projects/Project-02/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playSong = (track, pause = false) => {
    currentSong.src = `/Projects/Project-02/songs/${track}`
    if (!pause){
        currentSong.play()
        play.src = "img/pause.svg";
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track)
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00"
}


async function main() {
    // Get the list of songs
    let songs = await getSong();
    playSong(songs[0], true)
    
    // Show All the songs in playlist
    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <div class="info">
                                <img class="invert" src="img/music.svg" alt="">
                                <div class="song-detail">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Song Artist</div>
                                </div>
                            </div>
                            <div class="play-now">
                                <span>Play Now</span>
                                <img class="invert" src="img/circle-play-regular.svg" alt="">
                            </div>
                        </li>`;
    }

    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", elemwnt => {
            console.log(e.querySelector(".song-detail").firstElementChild.innerHTML)
            playSong(e.querySelector(".song-detail").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", ()=> {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        }
        else {
            currentSong.pause()
            play.src = "img/circle-play-regular.svg";
        }
    
    })


    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".song-time").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    document.querySelector("#hamburger").addEventListener("click", ()=> {
        document.querySelector(".left").style.left = "0";
    })

    document.querySelector("#close").addEventListener("click", ()=> {
        document.querySelector(".left").style.left = "-100%";
    })
}
main();