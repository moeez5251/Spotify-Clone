// Function for getting songs
async function getsongs() {
        let a = await fetch("https://api.github.com/repos/moeez5251/Spotify-Clone/contents/assets/songs",{
            headers:{
                'Authorization': "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"
            }
        });
    
        let response = await a.json();
        let songs = [];
    for (const song of response) {
        songs.push(song.name)
    }
    return songs;
}
let audio = new Audio();
let playmusic = (e) => {
    audio.src = "/assets/songs/" + e
    audio.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    document.querySelector(".songinfo").innerHTML = decodeURI(e);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
}
function convertSeconds(totalSeconds) {
    totalSeconds = Math.round(totalSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}
async function main() {
    let songs = await getsongs();
    // Play List
    let song_ul = document.querySelector(".songlists").getElementsByTagName("ul")[0];
    for (const song of songs) {
        song_ul.innerHTML += `
        <li>
                            <img class="invert" src="music.svg" alt="Music">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img style="width: 25px;" class="invert" src="playing.svg" alt="Play">
                            </div>
                        </li>`;
    }
    //Play Songs
    document.querySelectorAll(".songlists>ul>li").forEach(e => {
        e.addEventListener("click", () => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })

    let play = document.getElementById("play");
    play.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
        }
        else {
            audio.pause();
            play.classList.remove("fa-pause");
            play.classList.add("fa-play");
        }
    })

    // Time Updation
    audio.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${convertSeconds(audio.currentTime)}/${convertSeconds(audio.duration)}`;
    })
}
main();