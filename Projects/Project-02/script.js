console.log("Hello start writing javascript")

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

async function main() {
    // Get the list of songs
    let songs = await getSong();
    console.log(songs);

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

    // lets play first song
    let audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(duration);
    });
}

main();