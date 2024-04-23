

//following the mouse movement
const pre = document.getElementById("pre");

document.addEventListener("mousemove",(e)=>{
    moveElement(e,pre);
})
function moveElement(event,element){
    // get mouse position
    const x = event.clientX;
    const y = event.clientY;

    //get the middle value
    const middleX = window.innerWidth /2;
    const middleY = window.innerHeight /2;

    // offset from middle
    const offsetX = ((x - middleX) / middleX)* 45;
    const offsetY = ((y - middleY) / middleY)* 45;

    element.style.setProperty("--rotateX", -1 * offsetY + "deg");
    element.style.setProperty("--rotateY", offsetX + "deg");
};

const playBtn = document.querySelector("#playBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const cover = document.querySelector("#cover");
const title = document.querySelector("#title");
const audio = document.querySelector("#audio");
const lastMusic = document.querySelector('#last-music');
const nextMusic = document.querySelector('#next-music');
// Songs BuildUp

const songs =
["Be Quiet and Drive (Far Away)",
"Beware",
"Flooded The Face",
"Vamp Anthem",
"A Cold Sunday",
"Secret Recipe",
"My Eyes",
"Changes",
"Final Battle",
"1985",
"Backstroke",
"Nightmare SXMPRA",
"Teach Me to Fight",
"Plums",
"Spectre",
"Pacifica",
"Aces",
"Divine Failure",
"1mmortal",
"COWBELL WARRIOR!"];


const shuffleButton = document.getElementById("shuffle");

shuffleButton.addEventListener("click", ()=>{
    shuffleSongs(songs)
    console.log(songs)
})

function shuffleSongs(array){
  for(let i = array.length - 1; i > 0; i--){
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
  }

  let currentSong = songs[songIndex - 1];
  lastMusic.innerText = currentSong;

  let proxSong = songs[songIndex + 1];
  nextMusic.innerText = proxSong;

  if(songIndex === 0){
      lastMusic.innerText = songs[songs.length -1];
   }

   
  if(songIndex === songs.length - 1){
      nextMusic.innerText = songs[0];
   }
}
//Song array
let songIndex = 0;


// Initially load song details into DOM
loadSong(songs[songIndex]);



//Functions
function loadSong(song){
    title.textContent = song;
   audio.src = `songs/${song}.mp3`
   cover.src = `images/${song}.jpg`
}

function playSong(){
   pre.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
  
    audio.play();
}

function pauseSong(){
    pre.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
  
    audio.pause();
}

function prevSong(){
    songIndex --
   
    if (songIndex < 0) {
        songIndex = songs.length - 1;
      }
    
      loadSong(songs[songIndex]);

      let currentSong = songs[songIndex - 1];
      lastMusic.innerText = currentSong;
  
      let proxSong = songs[songIndex + 1];
      nextMusic.innerText = proxSong;
  
      if(songIndex === 0){
          lastMusic.innerText = songs[songs.length -1];
       }
  
       
      if(songIndex === songs.length - 1){
          nextMusic.innerText = songs[0];
       }
    
      playSong();
}
function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length -1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);

    let anteriorSong = songs[songIndex - 1];
    lastMusic.innerText = anteriorSong;
    

    let proxSong = songs[songIndex + 1];
    nextMusic.innerText = proxSong;

    if(songIndex === songs.length - 1){
        nextMusic.innerText = songs[0];
     }
     if(songIndex === 0){
        lastMusic.innerText = songs[songs.length -1];
     }
  
    playSong();
  }
// event listeners
playBtn.addEventListener('click', ()=>{
    const songPlaying = pre.classList.contains("play");

    if(songPlaying){
        pauseSong()
    }else{
        playSong()
    }
})
 
const lastSong = songs.length - 1;

prevBtn.addEventListener("click", ()=>{
    prevSong()

})
nextBtn.addEventListener("click", ()=>{
    nextSong()
})


audio.addEventListener('ended', nextSong);


const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar")

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
 
}

  audio.addEventListener('timeupdate', updateProgress);


  //Shuffle Button
