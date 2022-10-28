// lets
let myRand;
let point;
console.log(point);
let liv;
console.log(liv);
let speed;
const god1 = document.querySelector("#prinsesse_container");
const god2 = document.querySelector("#konge_container");
const bad1 = document.querySelector("#hofnar_container");

let lyd = document.getElementById("sound_background"); // her skal ID til den musik du vil spille //
let isPlaying = false;
let lydtil = document.querySelector(".lydtil");
//sidenVises
window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  //evt window resize her?
  window.addEventListener("resize", windowResize);
  windowResize();
  //lyd on/off knap
  document.querySelector("#lyd").addEventListener("mousedown", lydSpiller);

  function lydSpiller() {
    console.log("lydspiller");
    isPlaying ? lyd.pause() : lyd.play();
  }
  lyd.onplaying = function () {
    isPlaying = true;
  };
  lyd.onpause = function () {
    isPlaying = false;
  };

  lydtil.addEventListener("click", () => {
    console.log("lyd");
    lydtil.classList.toggle("lydfra");
    document.getElementById("sound_background");
    sound_background.muted = !sound_background.muted;
  });

  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#info_screen").classList.add("hide");
  //klik på how to knap
  document.querySelector("#howto_knap").addEventListener("mousedown", info);
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  //Klik på start_knap
  document
    .querySelector("#start_knap")
    .addEventListener("mousedown", startSpillet);
}
function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  //2.5
  let myFontInProcent1 = 2.5;
  let myFont1 = (widthScreen / 100) * myFontInProcent1;
  document.querySelector("#level_complete_txt").style.fontSize = myFont1 + "px";
  document.querySelector("#level_complete_txt2").style.fontSize =
    myFont1 + "px";
  document.querySelector("#level_complete_point").style.fontSize =
    myFont1 + "px";


  document.querySelector("#genstart2").style.fontSize = myFont1 + "px";
  document.querySelector("#genstart1").style.fontSize = myFont1 + "px";

  // 3
  let myFontInProcent2 = 3;
  let myFont2 = (widthScreen / 100) * myFontInProcent2;
  document.querySelector("#game_over_point").style.fontSize = myFont2 + "px";
  //4
  let myFontInProcent3 = 4;
  let myFont3 = (widthScreen / 100) * myFontInProcent3;
  document.querySelector("#game_over_txt").style.fontSize = myFont3 + "px";
  //2
  let myFontInProcent4 = 2;
  let myFont4 = (widthScreen / 100) * myFontInProcent4;
  document.querySelector("#score_number").style.fontSize = myFont4 + "px";
  document.querySelector("#howto_knap").style.fontSize = myFont4 + "px";
  document.querySelector("#start_knap").style.fontSize = myFont4 + "px";
  document.querySelector("#info_knap").style.fontSize = myFont4 + "px";

}
function info() {
  console.log("info_screen");
  //vis infoskærm
  document.querySelector("#info_screen").classList.remove("hide");
  // klik - luk infoskærm ned - tilbage på startskærm
  document.querySelector("#info_knap").addEventListener("click", sidenVises);
}
function startSpillet() {
  console.log("startSpillet");
  //skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#info_screen").classList.add("hide");
  //se skærm
  document.querySelector("#game").classList.remove("hide");

  // vis alle liv
  document.querySelector("#liv1").classList.remove("mistetliv");
  document.querySelector("#liv2").classList.remove("mistetliv");
  document.querySelector("#liv3").classList.remove("mistetliv");

  //timer - nedtælling
  document.querySelector("#time_sprite").classList.add("time");
  document
    .querySelector("#time_container")
    .addEventListener("animationiteration", stopSpillet);
  //påsæt hop-animationer på elementer
  god1.classList.add("hop");
  god2.classList.add("hop");
  bad1.classList.add("hop");
  //tilføjer lyd
  document.querySelector("#sound_background").play();
  // generer et nummer mellem 1-4 og så giver den containeren en position
  //p
  myRand = Math.floor(Math.random() * 8) + 1;
  god1.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  god1.classList.add("delay" + myRand);
  god1.classList.add("speed" + speed);

  //k
  myRand = Math.floor(Math.random() * 8) + 1;
  god2.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  god2.classList.add("delay" + myRand);
  god2.classList.add("speed" + speed);
  //h
  myRand = Math.floor(Math.random() * 8) + 1;
  bad1.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  bad1.classList.add("delay" + myRand);
  bad1.classList.add("speed" + speed);

  //Gør så elementerne kan klikkes på = sendes videre til den givende function (god er bad og bad er god)
  god1.addEventListener("mousedown", prinsesseClickHandler);
  god2.addEventListener("mousedown", kongeClickHandler);
  bad1.addEventListener("mousedown", hofnarClickHandler);

  //lytter til hoppe animationer er kørt en gang
  god1.addEventListener("animationiteration", gentagPrinsesse);
  god2.addEventListener("animationiteration", gentagKonge);
  bad1.addEventListener("animationiteration", gentagHofnar);
  // reset liv og point
  point = 0;
  document.querySelector("#score_number").textContent = point;
  liv = 3;
  //reset speed
  speed = 1;
}

/*--------------------------------------------------------prinsesse animationer--------------------------------------------------------*/

function prinsesseClickHandler() {
  console.log("prinsesseClickHandler", this);
  //Fjern EventListener på #Prinsesse_container
  this.removeEventListener("mousedown", prinsesseClickHandler);

  //Giver point ved klik på prinsess
  point++;
  document.querySelector("#score_number").textContent = point;
  console.log("point", point);
  //Tilføjer klasser til prinsesse_sprite og Prinsesse_container
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind");
  //tilføjer lyd
  document.querySelector("#sound_splat").play();
  //animation på sprite er færdig, genstart animation på container
  this.addEventListener("animationend", gentagPrinsesse);
}
function gentagPrinsesse() {
  console.log("gentagPrinsesse", this);
  //Fjerner alle klasser på #prinsesse_sprite
  this.firstElementChild.classList = "";
  // Fjerner alle klasser fra #prinsesse_container
  this.classList = "";
  //force reflow - genstart
  this.offsetLeft;
  //Generer et tilfældigt nummer mellem 1-4 og tilføjer random position
  myRand = Math.floor(Math.random() * 8) + 1;
  this.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  this.classList.add("delay" + myRand);
  this.classList.add("speed" + speed);
  //tilføj Hop animation
  this.classList.add("hop");
  // sætter functionen PrinsesseClickHandler igang
  this.addEventListener("mousedown", prinsesseClickHandler);
}

/*-----------------------------------------------------prinsesseanimation slut------------------------------------------------------------*/

/*--------------------------------------------------------bad / hofnar animationer-------------------------------------------------------------*/
function hofnarClickHandler() {
  console.log("hofnarClickHandler", this);
  //Fjern EventListener på #hofnar_container
  this.removeEventListener("mousedown", hofnarClickHandler);

  //Tilføjer klasser til hofnar_sprite og hofnar_container
  this.firstElementChild.classList.add("forsvind");
  //mister liv ved klik på hofnar
  document.querySelector("#liv" + liv).classList.add("mistetliv");
  liv--;
  console.log("liv " + liv);
  //tilføjer lyd
  document.querySelector("#sound_splat2").play();
  //animation på sprite er færdig, genstart animation på container
  this.addEventListener("animationend", gentagHofnar);

  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}
function gentagHofnar() {
  console.log("gentagHofnar", this);
  //Fjerner alle klasser på #hofnar_sprite
  this.firstElementChild.classList = "";
  // Fjerner alle klasser fra container
  this.classList = "";
  //force reflow - genstart
  this.offsetLeft;
  //Generer et tilfældigt nummer mellem 1-4 og tilføjer random position
  myRand = Math.floor(Math.random() * 8) + 1;
  this.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  this.classList.add("delay" + myRand);
  this.classList.add("speed" + speed);

  //tilføj Hop animation
  this.classList.add("hop");
  // sætter functionen hofnarClickHandler i gang
  this.addEventListener("mousedown", hofnarClickHandler);
}

/*--------------------------------------------------hofnar animationer slut*-----------------------------------------------------------*/

/*-----------------------------------------------------Konge animationer*--------------------------------------------------------------*/
function kongeClickHandler() {
  console.log("kongeClickHandler", this);
  //Fjern EventListener på #konge_container
  this.removeEventListener("mousedown", kongeClickHandler);
  //Giver point ved klik på konge
  point++;
  document.querySelector("#score_number").textContent = point;
  console.log("point", point);
  //Tilføjer klasser til konge_sprite og kongecontainer
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind");
  //tilføjer lyd
  document.querySelector("#sound_splat3").play();
  //animation på sprite er færdig, genstart animation på container
  this.addEventListener("animationend", gentagKonge);
}
function gentagKonge() {
  console.log("gentagKonge");
  //Fjerner alle klasser på #konge_sprite
  this.firstElementChild.classList = "";
  // Fjerner alle klasser fra #konge_container
  this.classList = "";
  //force reflow - genstart
  this.offsetLeft;
  //Generer et tilfældigt nummer mellem 1-4 og tilføjer random position
  myRand = Math.floor(Math.random() * 8) + 1;
  this.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  this.classList.add("delay" + myRand);
  this.classList.add("speed" + speed);
  //tilføj Hop animation
  this.classList.add("hop");
  // sætter functionen kongeClickHandler igang
  this.addEventListener("mousedown", kongeClickHandler);
}
/*-------------------------------------------------- Konge animationer slut*-----------------------------------------------------------*/

/*--------------------------------------------------------stop spillet------------------------------------------------------------------*/
function stopSpillet() {
  console.log("stopSpillet");
  console.log(point);
  //Stop timer
  document.querySelector("#time_sprite").classList.remove("time");
  document
    .querySelector("#time_container")
    .removeEventListener("animationend", stopSpillet);
  //fjerner lyd
  document.querySelector("#sound_background").pause();
  //fjerner alt fra prinsesse
  god1.classList = "";
  god1.classList = "";
  god1.removeEventListener("animationiteration", gentagPrinsesse);
  god1.removeEventListener("animationend", gentagPrinsesse);
  god1.removeEventListener("mousedown", prinsesseClickHandler);
  //fjerner alt fra konge
  god2.classList = "";
  god2.classList = "";
  god2.removeEventListener("animationiteration", gentagKonge);
  god2.removeEventListener("animationend", gentagKonge);
  god2.removeEventListener("mousedown", kongeClickHandler);
  //fjerner alt fra hofnar
  bad1.classList = "";
  bad1.classList = "";
  bad1.removeEventListener("animationiteration", gentagHofnar);
  bad1.removeEventListener("animationend", gentagHofnar);
  bad1.removeEventListener("mousedown", hofnarClickHandler);

  if (liv <= 0) {
    gameover();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log("GAMEOVER", point);

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  //udskriv point
  document.querySelector("#game_over_point").textContent =
    "You got " + point + " points";
  //tilføjer lyd
  document.querySelector("#sound_fail").play();
  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", sidenVises);
}

function levelComplete() {
  console.log("Hurra du vandt", point);

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  //udskriv point
  document.querySelector("#level_complete_point").textContent =
    "You got " + point + " points";
  //tilføjer lyd
  document.querySelector("#sound_clap").play();
  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", sidenVises);
}
