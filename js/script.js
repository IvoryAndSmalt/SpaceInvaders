var vaisseau = document.getElementById('vaisseau');
var jouer = document.getElementById('jouer');
var projectiles = document.getElementsByClassName('projectiles');
var fenetre = document.getElementById('container');
var alienMoveSpeed = 400;
var alienJump = 20;
var monTimer;
var messageBravo = document.createElement("h1");
var messageMort = document.createElement("h1");
var perdu = document.createElement("h1");
var score = 0;
var vie = 3;

document.getElementById("score").innerHTML = "Score : " + score;
document.getElementById("vie").innerHTML = "Vies : " + vie;
jouer.style.display = "block";
vaisseau.style.left = "375px";
vaisseau.style.bottom = "25px";
vaisseau.style.display = "none";
projectiles[0].style.bottom = "75px";
projectiles[0].style.left = "398px";
projectiles[0].style.display = "none";

/****************FONCTION JOUER DES SONS***************/
function playpou() {
    var pou = document.createElement("audio");
    fenetre.appendChild(pou);
    pou.src = "sounds/pou.ogg";
    pou.id = "pou";
    pou = document.getElementById("pou");
    pou.loop = false;
    pou.play();
}
function playbla() {
    var bla = document.createElement("audio");
    fenetre.appendChild(bla);
    bla.src = "sounds/bla.ogg";
    bla.id = "bla";
    bla = document.getElementById("bla");
    bla.loop = false;
    bla.play();
}
function playbottom() {
    var bottom = document.createElement("audio");
    fenetre.appendChild(bottom);
    bottom.src = "sounds/bottom.ogg";
    bottom.id = "bottom";
    bottom = document.getElementById("bottom");
    bottom.loop = false;
    bottom.play();
}
function playtir() {
    var tir = document.createElement("audio");
    fenetre.appendChild(tir);
    tir.src = "sounds/tir.ogg";
    tir.id = "tir";
    tir = document.getElementById("tir");
    tir.loop = false;
    tir.play();
}
function playohnon() {
    var ohnon = document.createElement("audio");
    fenetre.appendChild(ohnon);
    ohnon.src = "sounds/ohnon.ogg";
    ohnon.id = "ohnon";
    ohnon = document.getElementById("ohnon");
    ohnon.loop = false;
    ohnon.play();
}
function playohlala() {
    var ohlala = document.createElement("audio");
    fenetre.appendChild(ohlala);
    ohlala.src = "sounds/ohlala.ogg";
    ohlala.id = "ohlala";
    ohlala = document.getElementById("ohlala");
    ohlala.loop = false;
    ohlala.play();
}

/*******************JOUER********************/
jouer.addEventListener("click", function () {
    tirAliens();
    jouer.style.display = "none";
    mechants.style.left = "76px";
    mechants.style.bottom = "475px";
    vaisseau.style.display = "block";
    mechants.style.display = "block";
    lesAliensBougent();
    // fenetre.style.background = "none";
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
                mechants.style.bottom = parseFloat(mechants.style.bottom) - 30 + "px";
                switchDroite = 1
                switchGauche = 0
            }
            else {
                mechants.style.left = parseFloat(mechants.style.left) + 15 + "px";
            }
        }
        else if (switchGauche == 0 && switchDroite == 1) {
            if (parseFloat(mechants.style.left) <= 75) {
                mechants.style.bottom = parseFloat(mechants.style.bottom) - 30 + "px";
                switchDroite = 0
                switchGauche = 1
            }
            else {
                mechants.style.left = parseFloat(mechants.style.left) - 15 + "px";
            }
        }
    }, alienMoveSpeed);
}

/********************TIRE***********************/

var hasFired = 0;
projectiles[0].style.bottom = "75px";
projectiles[0].style.left = "400px";
projectiles[0].style.display = "none";
let aliens = document.getElementsByClassName('aliens');
let quelMinion;

document.addEventListener('keydown', function (event) {
    if (event.keyCode == "32" && hasFired == 0) {
        playpou();
        projectiles[0].style.display = "block";
        hasFired = 1;
        quelMinion = Math.random() < 0.5 ? 5 : 32;
        projectiles[0].style.left = parseFloat(vaisseau.style.left) + quelMinion + "px";
        monTimer = setInterval(function () {
            if (aliens.length == 0) {
                gagner();
            }

            else if (parseInt(projectiles[0].style.bottom) >= 500) {
                hasFired = 0;
                clearInterval(monTimer);
                projectiles[0].style.bottom = 66 + "px";
                projectiles[0].style.display = "none";
            }
            else {
                projectiles[0].style.display = "block";
                projectiles[0].style.bottom = parseFloat(projectiles[0].style.bottom) + 16 + "px";
                if (parseInt(projectiles[0].style.bottom)) {
                }
                /***********COLLISION TIRS AVEC LES ALIENS *********************/
                for (var i = 0; i < aliens.length; i++) {
                    var thisAlien = aliens[i];
                    var realAlienBottom = parseInt(thisAlien.style.bottom) + parseInt(mechants.style.bottom);
                    var realAlienLeft = parseInt(thisAlien.style.left) + parseInt(mechants.style.left);
                    if (parseInt(projectiles[0].style.bottom) <= realAlienBottom && parseInt(projectiles[0].style.bottom) >= realAlienBottom - 30) {
                        if (parseInt(projectiles[0].style.left) + 5 >= realAlienLeft && parseInt(projectiles[0].style.left) <= realAlienLeft + 25) {
                            mechants.removeChild(thisAlien);
                            playbla();
                            projectiles[0].style.display = "none";
                            projectiles[0].style.bottom = "75px";
                            clearInterval(monTimer);
                            hasFired = 0;
                            score = score + 100;
                            document.getElementById("score").innerHTML = "Score : " + score;
                        }
                    }
                }
            }
        }, 40);
    }
});

/**********************ALIENS TIRENT*****************/

var missileAliensLeft;
var missileAliens = document.getElementById("missileAliens");
missileAliens.style.display = "none";
var delaiMissileAliens = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
var monTimerMissile;

function tirAliens() {
    monTimerMissileAliens = setInterval(function () {
        playtir();
        function entierAleatoire(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        //résultat de l'entier = var entier
        var entier = entierAleatoire(0, 9);
        var multiple = 45;

        //générer un aléatoire entre 1 et 10

        missileAliensLeft = entier * multiple + parseInt(mechants.style.left) + 15 + "px";
        missileAliens.style.bottom = parseInt(mechants.style.bottom) - 180 + "px";
        missileAliens.style.left = missileAliensLeft;
        missileAliens.style.display = "none";

        let vitesseMissileAliens = setInterval(function () {
            if (parseInt(missileAliens.style.bottom) <= 20) {
                clearInterval(vitesseMissileAliens);
                missileAliens.style.display = "none";
            }
            else {
                missileAliens.style.display = "block";
                missileAliens.style.bottom = parseFloat(missileAliens.style.bottom) - 12 + "px";

                if (parseInt(missileAliens.style.bottom) - 30 <= parseInt(vaisseau.style.bottom) && parseInt(missileAliens.style.bottom) - 30 >= parseInt(vaisseau.style.bottom) - 50) {
                    if (parseInt(missileAliens.style.left) >= parseInt(vaisseau.style.left) && parseInt(missileAliens.style.left) <= parseInt(vaisseau.style.left) + 50) {
                        if (vie > 0) {
                            playohlala();
                            vie = vie - 1;
                            missileAliens.style.display = "none";
                            clearInterval(vitesseMissileAliens)
                            document.getElementById("vie").innerHTML = "Vies : " + vie;
                        }
                        else {
                            perdre();
                            playohnon();
                            vaisseau.style.display = "none";
                            missileAliens.style.display = "none";
                            clearInterval(monTimerMissileAliens);
                            clearInterval(moveAliensGauche);
                            mechants.style.display = "none";
                            document.getElementById("vie").innerHTML = "Vies : " + vie;
                            fenetre.appendChild(messageMort);
                            messageMort.innerHTML = "YOU DIED";
                            messageMort.id = "youdied";
                        }
                    }
                }
            }
        }, 100);
    }, 3000);
}

/************************GENERATION OBSTACLES**********/

var nombreObst = 4;
var nombreHaut = 4;
var margeHaut = 10;
var valeurObst = 140;

for (let i = 0; i < nombreObst; i++) {
    for (let j = 0; j < nombreHaut; j++) {
        let carresHaut = document.createElement("div");
        carresHaut.className = 'carresHaut carres';
        carresHaut.style.left = margeHaut * j + i * valeurObst + "px";
        fenetre.appendChild(carresHaut);
    }
}

/**************************GAGNER**********************/

function gagner() {
    clearInterval(monTimer);
    mechants.style.display = "none";
    projectiles[0].style.display = "none";
    clearInterval(monTimerMissileAliens);
    fenetre.appendChild(messageBravo);
    messageBravo.innerHTML = "Bravo, vous avez gagné !";
    messageBravo.id = "bravomessage"
    //ajout audio victoire
}

/*******************PERDRE********************/
var hasLost = 0;
function perdre() {
    for (var i = 0; i < aliens.length; i++) {
        var thisAlien = aliens[i];
        var realAlienBottom = parseInt(thisAlien.style.bottom) + parseInt(mechants.style.bottom);
        if (realAlienBottom <= 75) {
            hasLost = 1;
            playbottom();
        }
    }
}

/***************APPEL à chaque fois que les aliens bougent*************/

var interLost = setInterval(function () {
    perdre();
    if (hasLost == 1) {
        vaisseau.style.display = "none";
        projectiles[0].style.display = "none";
        mechants.style.display = "none";
        fenetre.appendChild(perdu);
        perdu.innerHTML = "(thisAlien.style.bottom == 0) is true ; YOU HAVE LOST.";
        perdu.id = "perdu"
        clearInterval(interLost);
        clearInterval(monTimerMissileAliens);
    }
}, alienMoveSpeed);


document.addEventListener("keydown", function (e) {
    if (e.keyCode == "90") {
        gagner();
    }
});






















