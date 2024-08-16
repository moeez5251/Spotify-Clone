// Function for getting songs
async function getsongs() {
    // let response = [
    //     {
    //         "name": "Dinner with friends.mp3",
    //     },
    //     {
    //         "name": "Nain Tere Chain Me.mp3",

    //     },
    //     {
    //         "name": "Samjho Na x Wishes.mp3",

    //     },
    //     {
    //         "name": "Tajdar-e-Haram.mp3",

    //     },
    //     {
    //         "name": "Tere Sang Yaara.mp3",

    //     },
    //     {
    //         "name": "Zaroori Tha.mp3",

    //     }
    // ]
   let a= await fetch("assets/songs/")

   let response= await a.text();
   let div=document.createElement("div");
   div.innerHTML=response;
   let a_s=div.getElementsByTagName("a");
   let songs = [];
   for (let index = 0; index < a_s.length; index++) {
    const element = a_s[index];
    if (element.href.endsWith(".mp3")) {
        songs.push(element.innerHTML.split("/assets/songs/"))
    }
    
   }
    console.log(songs);
    return songs;
}
let audio = new Audio();
let playmusic = (e, a = false) => {
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
                                <div>${song}</div>
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
        document.querySelector(".circle").style.left = `${(audio.currentTime / audio.duration) * 100}%`//Circle Updation
    })

    // Event listner for seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {

        const totalWidth = document.querySelector(".seekbar").offsetWidth;
        const circle = document.querySelector(".circle");
        circle.style.left = `${e.offsetX}px`;

        const percentage = (e.offsetX / totalWidth) * 100;

        const currentTime = (percentage / 100) * audio.duration;

        audio.currentTime = currentTime;
    })

    // Event listner for hamburger

    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").classList.add("left-animation")
    })
    document.querySelector(".cross").addEventListener("click",()=>{
        document.querySelector(".left").classList.remove("left-animation")

    })
}
main();

