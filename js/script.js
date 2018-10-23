var vaisseau = document.getElementById('vaisseau');
var jouer = document.getElementById('jouer');
var projectiles = document.getElementsByClassName('projectiles');
jouer.style.display = "block";
vaisseau.style.left = "375px";
vaisseau.style.display = "none"
projectiles[0].style.bottom = "75px";
projectiles[0].style.left = "398px";
projectiles[0].style.display = "none";

/****************CECI ESt UN SECRET***************/
// document.getElementById('yourAudioTag').play();
/*************************************************/

var monTimer;

/*******************JOUER********************/
jouer.addEventListener("click", function () {
    jouer.style.display = "none";
    mechants.style.left = "76px";
    mechants.style.bottom = "475px";
    vaisseau.style.display = "block";
    mechants.style.display = "block";
    lesAliensBougent();
});

/**************ALLER A GAUCHE ***************/

function moveLeft() {
    if (parseFloat(vaisseau.style.left) >= 50) {
        vaisseau.style.left = parseFloat(vaisseau.style.left) - 10 + "px";
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == "37") {
        moveLeft();
    }
});

/*******************ALLER A DROITE *************************/

function moveRight() {
    if (parseFloat(vaisseau.style.left) <= 700) {
        vaisseau.style.left = parseFloat(vaisseau.style.left) + 10 + "px";
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == "39") {
        moveRight();
    }
});

/**********************ORGANISATION ALIENS*********************/

let columns = 10;
let rows = 5;
let spaceWidth = 45;

let mechants = document.getElementById("mechants");
mechants.style.display = "none";

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let aliens = document.createElement("div");
        aliens.className = 'aliens';
        aliens.style.bottom = - spaceWidth * i + "px";
        aliens.style.left = spaceWidth * j + "px";
        mechants.appendChild(aliens);
    }
}

/**************************ALIENS BOUGENT************************/

var moveAliensGauche;
mechants.style.left = "80px";
mechants.style.bottom = "475px";
var switchGauche = 1;
var switchDroite = 0;

function lesAliensBougent() {
    moveAliensGauche = setInterval(function () {
        if (switchGauche == 1 && switchDroite == 0) {
            if (parseFloat(mechants.style.left) >= 300) {
                mechants.style.bottom = parseFloat(mechants.style.bottom) - 10 + "px";
                switchDroite = 1
                switchGauche = 0
            }
            else {
                mechants.style.left = parseFloat(mechants.style.left) + 15 + "px";
            }
        }
        else if (switchGauche == 0 && switchDroite == 1) {
            if (parseFloat(mechants.style.left) <= 75) {
                mechants.style.bottom = parseFloat(mechants.style.bottom) - 10 + "px";
                switchDroite = 0
                switchGauche = 1
            }
            else {
                mechants.style.left = parseFloat(mechants.style.left) - 15 + "px";
            }
        }
        else {
            vaisseau.style.display = "none";
            projectiles[0].style.display = "none";
            mechants.style.display = "none";
            clearInterval();
        }
    }, 750);
}

/********************TIRE***********************/

var hasFired;
hasFired = 0;
projectiles[0].style.bottom = "75px";
projectiles[0].style.left = "400px";
projectiles[0].style.display = "none";
let aliens = document.getElementsByClassName('aliens');

document.addEventListener('keydown', function (event) {

    if (event.keyCode == "32" && hasFired == 0) {
        hasFired = 1;
        projectiles[0].style.left = parseFloat(vaisseau.style.left) + 23 + "px";
        monTimer = setInterval(function () {

            if (parseInt(projectiles[0].style.bottom) >= 500) {
                hasFired = 0;
                clearInterval(monTimer);
                projectiles[0].style.bottom = 75 + "px";
                projectiles[0].style.display = "none";
            }
            else {
                projectiles[0].style.display = "block";
                projectiles[0].style.bottom = parseFloat(projectiles[0].style.bottom) + 10 + "px";
                for (var i = 0; i < aliens.length; i++) {
                    var thisAlien = aliens[i];
                    var realAlienBottom = parseInt(thisAlien.style.bottom) + parseInt(mechants.style.bottom);
                    var realAlienLeft = parseInt(thisAlien.style.left) + parseInt(mechants.style.left);
                    if (parseInt(projectiles[0].style.bottom) <= realAlienBottom && parseInt(projectiles[0].style.bottom) >= realAlienBottom - 30) {
                        // si vrai, test left
                        if (parseInt(projectiles[0].style.left) >= realAlienLeft && parseInt(projectiles[0].style.left) <= realAlienLeft + 30) {
                            // thisAlien.style.display = 'none';
                            mechants.removeChild(thisAlien);
                            console.log(aliens.length);
                            projectiles[0].style.display = "none";
                            clearInterval(monTimer);
                        }
                        else { };
                    }
                }
            }
        }, 40);
    }
});

/********************QUAND ON GAGNE***************/

if (aliens.length == 0){
    jouer.style.display = "none";
    vaisseau.style.display = "none";
    mechants.style.display = "none";
}


