console.log("Hello start writing javascript")

let currentSong = new Audio();
let songs;
let currFolder;


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


async function getSong(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:3000/Projects/Project-02/songs/${folder}`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${folder}`)[1].replace("/",""));
        }
    }

    // Show All the songs in playlist
    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
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
        e.addEventListener("click", element => {
            console.log(e.querySelector(".song-detail").firstElementChild.innerHTML)
            playSong(e.querySelector(".song-detail").firstElementChild.innerHTML.trim())
        })
    })

    return songs

}

const playSong = (track, pause = false) => {
    currentSong.src = `/Projects/Project-02/songs/${currFolder}/${track}`;
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track);
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
    console.log("displaying albums")
    let a = await fetch(`http://127.0.0.1:3000/Projects/Project-02/songs/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardCon = document.querySelector(".card-container")
    Array.from(anchors).forEach(async e => {
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
            let a = await fetch(`http://127.0.0.1:3000/Projects/Project-02/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response)
            cardCon.innerHTML = cardCon.innerHTML + `<div data-folder="ncs" class="card">
                        <div class="card-img">
                            <img src="/Projects/Project-02/songs/${folder}/cover.jpg" alt="Card Image">
                            <div class="play">
                                <svg width="15" height="15" viewBox="0 0 20 24" fill="black"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" stroke-width="1.5"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    })
}




async function main() {
    // Get the list of songs
    await getSong("myalbum");
    playSong(songs[0], true)

    displayAlbums()

    play.addEventListener("click", () => {
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

    document.querySelector("#hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    document.querySelector("#close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playSong(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(index)
        if ((index + 1) < songs.length) {
            playSong(songs[index + 1])
        }
    })


    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100");

        currentSong.volume = parseInt(e.target.value) / 100;

        let img = document.querySelector(".volumn > img");
        if (currentSong.volume > 0) {
            img.src = img.src.replace("mute.svg", "volume.svg");
        } else {
            img.src = img.src.replace("volume.svg", "mute.svg");
        }
    });


     // Load the playlist whenever card is clicked
     Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset.folder)
            songs = await getSong(`${item.currentTarget.dataset.folder}`) 
            playSong(songs[0])

        })
    })
}
main();