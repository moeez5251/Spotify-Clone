let audio = new Audio();
let playmusic = (e, name) => {
    audio.src = `/assets/songs/${name}/` + e
    audio.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");

    document.querySelector(".songinfo").innerHTML = decodeURI(e);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
}
function convertSeconds(totalSeconds) {
    if (isNaN(totalSeconds)) {
        return "00:00";
    }
    totalSeconds = Math.round(totalSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}
async function main() {
    let songs = {
        album1: ["assets/songs/Atif-Aslam/Tajdar-e-Haram.mp3", "assets/songs/Atif-Aslam/Tere Sang Yaara.mp3","assets/songs/Atif-Aslam/Dil Diyan Gallan.mp3"],
        album2:["assets/songs/Rahat-Fateh-Ali-Khan/Zaroori Tha.mp3","assets/songs/Rahat-Fateh-Ali-Khan/Dost Banke.mp3","assets/songs/Rahat-Fateh-Ali-Khan/Jag Ghoomeya.mp3"],
        album3:["assets/songs/Punjabi-Songs/Nain Tere Chain Me.mp3","assets/songs/Punjabi-Songs/Samjho Na x Wishes.mp3","assets/songs/Punjabi-Songs/Kinne Aa Piche Laaye.mp3"],
        album4:["assets/images/Sidhu-moose-wala/Dollar Dakuaan Da.mp3","assets/images/Sidhu-moose-wala/kaliya ne Rata.mp3","assets/images/Sidhu-moose-wala/Same Beef.mp3"]
    };
    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener("click", () => {
            let a = songs[e.getAttribute("data-album")];
            album=e.getAttribute("data-album");
            let song_ul = document.querySelector(".songlists").getElementsByTagName("ul")[0];
            song_ul.innerHTML = "";
            for (const song of a) {
                song_ul.innerHTML += `
                    <li data-name=${song.split("/")[2]} >
                                        <img class="invert" src="music.svg" alt="Music">
                                        <div class="info" >
                                            <div >${song.split("/")[3]}</div>
                                            <div >${song.split("/")[2]}</div>
                                        </div>
                                        <div class="playnow">
                                        <span>Play Now</span>
                                        <img style="width: 25px;" class="invert" src="playing.svg" alt="Play">
                                        </div>
                                        </li>`;

            }

            document.querySelectorAll(".songlists>ul>li").forEach(e => {
                e.addEventListener("click", () => {
                    playmusic(e.querySelector(".info").firstElementChild.innerHTML, e.getAttribute("data-name"))
                })
            })

            const media_query_380 = window.matchMedia('(max-width:380px)');
       function media_380(event) {
        if (event.matches) {
            document.querySelectorAll(".playnow").forEach(e => {
                e.style.display = "none";
            })
        }
        else {
            document.querySelectorAll(".playnow").forEach(e => {
                e.style.display = "block";
                e.style.display = "flex";
                e.style.justifyContent = "center";
                e.style.alignItems = "center";
            })

        }

    }
    media_380(media_query_380);
    media_query_380.addEventListener('change', media_380);
        })
    })

    document.querySelector(".card").click();
    //Play Songs


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

    // Event listner for hamburger open

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").classList.add("left-animation")
    })
    // Event listner for hamburger close
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").classList.remove("left-animation")

    })



    // Volume Change

    document.querySelector(".range").addEventListener("change", (e) => {
        audio.volume = parseInt(e.target.value) / 100;
    })


    // Event listner for volume

    document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (e.target.src.split("/")[3] == "volume.svg") {
            e.target.src = "mute.svg";
            audio.volume = 0;
            document.querySelector("#range").value = 0;
        }
        else {
            e.target.src = "volume.svg";
            audio.volume = 1;
            document.querySelector("#range").value = 10;

        }
    })




    // Media Query Handle

    

}
main();




