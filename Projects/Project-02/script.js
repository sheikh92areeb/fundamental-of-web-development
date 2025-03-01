console.log("Hello start writing javascript")

let currentSong = new Audio();

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

const playSong = (track) => {
    currentSong.src = `/Projects/Project-02/songs/${track}`
    currentSong.play()
}


async function main() {
    // Get the list of songs
    let songs = await getSong();
    
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
            play.src = "img/play.svg";
        }
    
    })
}
main();