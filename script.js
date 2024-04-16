console.log("chalra hai")

function secondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let currentsong = new Audio();

async function Songs() {

    let laakedo = await fetch("https://owesh74.github.io/Musify/songs/");
    let response = await laakedo.text();
    // console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;

    let links = div.querySelectorAll('a');
    let songs = []

    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }


    }
    return songs;
    



}

const playmusic = (track ,pau =false)=>{
    // let audio = new Audio("/songs/"+ track)
    // audio.play()
currentsong.src = "/songs/" + track
if(!pau){

currentsong.play()
play.src = "imgs/svgs/paus.svg"
}
document.querySelector(".songin").innerHTML = decodeURI(track)
document.querySelector(".songti").innerHTML = "00:00/00:00"

}

async function main() {
    let song = await Songs()
 playmusic(song[0],true)
    // console.log(song)

    songlii = document.querySelector(".songli").getElementsByTagName("ul")[0]
    for (const i of song) {
        songlii.innerHTML = songlii.innerHTML + `<li>
                                <div class="info">
    ${i.replaceAll("%20", " ")} 
                             </div>
    <img src="imgs/svgs/play.svg" alt="">
    </li>`;
    }

Array.from(document.querySelector(".songli").getElementsByTagName("li")).forEach(e => {
    // console.log(e)
    e.addEventListener("click", element =>{
    playmusic(e.querySelector(".info").innerHTML.trim())

})
})

play = document.querySelector(".play")

play.addEventListener("click", ()=> {
    if (currentsong.paused) {
        currentsong.play();
        play.src = "imgs/svgs/paus.svg"
    } else {
        currentsong.pause();
        play.src = "imgs/svgs/play.svg"

    }
});

currentsong.addEventListener("timeupdate", ()=>{
document.querySelector(".songti").innerHTML =`${secondsToMinutes(currentsong.currentTime)} : ${secondsToMinutes(currentsong.duration)}`
document.querySelector(".cicle").style.left = (currentsong.currentTime / currentsong.duration) * 100+ "%"
})

document.querySelector(".bar").addEventListener("click" , e=>{
    document.querySelector(".cicle").style.left = (e.offsetX/e.target.getBoundingClientRect().width)*100+ "%"
    currentsong.currentTime = (currentsong.duration ) *  ((e.offsetX/e.target.getBoundingClientRect().width)*100) / 100
})

}

main()




