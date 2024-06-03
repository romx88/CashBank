document.addEventListener('DOMContentLoaded', (event) => {
var boutonR = document.getElementById("boutonRoulette");
var nombreEssaie = 0;
var chiffreRoulette1 = document.getElementById("roulette1");
var chiffreRoulette2 = document.getElementById("roulette2");
var chiffreRoulette3 = document.getElementById("roulette3");
var nombreRoulette1 = 0;
var nombreRoulette2 = 0;
var nombreRoulette3 = 0;
var counter1 = 10;
var counter2 = 10;
var counter3 = 10;
var intervalRoulette1 = null;
var intervalRoulette2 = null;
var intervalRoulette3 = null;
var nombreDeTour1 = 0;
var nombreDeTour2 = 0;
var nombreDeTour3 = 0;
var nombreDeTourA1 =  Math.floor(Math.random() * (4)+3);
var nombreDeTourA2 =  Math.floor(Math.random() * (4)+6);
var nombreDeTourA3 =  Math.floor(Math.random() * (4)+9);
var chiffreAleatoire1 = Math.floor(Math.random() * (10)+1);
var chiffreAleatoire2 = Math.floor(Math.random() * (10)+1);
var chiffreAleatoire3 = Math.floor(Math.random() * (10)+1);
console.log(nombreDeTourA1+"tourA");
console.log(nombreDeTourA2);
console.log(nombreDeTourA3);
console.log(chiffreAleatoire1+"chiffreA");
console.log(chiffreAleatoire2);
console.log(chiffreAleatoire3);
var calcul = chiffreAleatoire1 + chiffreAleatoire2 + chiffreAleatoire3
var calculDivision = calcul / 3;

function startGlobal() {
	roulette1();
	roulette2();
	roulette3();
	document.getElementById("levier").style.animationName = 'levier';
}

var levier = document.getElementById("levier");
    levier.addEventListener("click", startGlobal);

// Roulette 1

function roulette1() {
	intervalRoulette1 = setInterval(roulette,300);
function roulette() {
	nombreRoulette1++;
    chiffreRoulette1.innerHTML = nombreRoulette1;
    document.getElementById("roulette1").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 600, iterations: 10});
    if (nombreRoulette1 == 10) {
    	nombreDeTour1++;
    	relance();
    }
}
function rouletteRalenti() {
	nombreRoulette1++;
    chiffreRoulette1.innerHTML = nombreRoulette1;
    document.getElementById("roulette1").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 1000, iterations: 10});
    if (nombreRoulette1 == 10) {
    	nombreDeTour1++;
    	relance();
    }
}

function relance() {
	clearInterval(intervalRoulette1);
	nombreRoulette1 = 0;
	if (nombreDeTour1 == nombreDeTourA1-1) {
		intervalRoulette1 = setInterval(rouletteRalenti,600);
	}
	else if (nombreDeTour1 == nombreDeTourA1) {
		intervalRoulette1 = setInterval(chiffreGagnant,900);
	}
	else {
		intervalRoulette1 = setInterval(roulette,300);
	}
}

function chiffreGagnant() {
	nombreRoulette1++;
    chiffreRoulette1.innerHTML = nombreRoulette1;
    document.getElementById("roulette1").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 1000, iterations: 10});
    if (nombreRoulette1 == chiffreAleatoire1) {
    	clearInterval(intervalRoulette1);
    	document.getElementById("roulette1").remove();
    	var roulette = document.createElement("p");
  		document.getElementById("divRoulette1").appendChild(roulette);
  		roulette.textContent = chiffreAleatoire1;
  		roulette.id = "roulette1";
  		document.getElementById("roulette1").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(-20vmin)' }], { duration: 500, iterations: 1});
  		setTimeout(possitionnement,500);
  		function possitionnement() {
		document.getElementById("roulette1").style.marginTop = '10px';
		}
    }
}
}



// Roulette 2 

function roulette2() {
	intervalRoulette2 = setInterval(roulette,300);
function roulette() {
	nombreRoulette2++;
    chiffreRoulette2.innerHTML = nombreRoulette2;
    document.getElementById("roulette2").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 600, iterations: 10});
    if (nombreRoulette2 == 10) {
    	nombreDeTour2++;
    	relance();
    }
}
function rouletteRalenti() {
	nombreRoulette2++;
    chiffreRoulette2.innerHTML = nombreRoulette2;
    document.getElementById("roulette2").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 1000, iterations: 10});
    if (nombreRoulette2 == 10) {
    	nombreDeTour2++;
    	relance();
    }
}

function relance() {
	clearInterval(intervalRoulette2);
	nombreRoulette2 = 0;
	if (nombreDeTour2 == nombreDeTourA2-1) {
		intervalRoulette2 = setInterval(rouletteRalenti,600);
	}
	else if (nombreDeTour2 == nombreDeTourA2) {
		intervalRoulette2 = setInterval(chiffreGagnant,900);
	}
	else {
		intervalRoulette2 = setInterval(roulette,300);
	}
}

function chiffreGagnant() {
	nombreRoulette2++;
    chiffreRoulette2.innerHTML = nombreRoulette2;
    document.getElementById("roulette2").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 1000, iterations: 10});
    if (nombreRoulette2 == chiffreAleatoire2) {
    	clearInterval(intervalRoulette2);
    	document.getElementById("roulette2").remove();
    	var roulette = document.createElement("p");
  		document.getElementById("divRoulette2").appendChild(roulette);
  		roulette.textContent = chiffreAleatoire2;
  		roulette.id = "roulette2";
  		document.getElementById("roulette2").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(-20vmin)' }], { duration: 500, iterations: 1});
  		setTimeout(possitionnement,500);
  		function possitionnement() {
		document.getElementById("roulette2").style.marginTop = '10px';
		}
    }
}
}



// Roulette 3

function roulette3() {
	intervalRoulette3 = setInterval(roulette,300);
function roulette() {
	nombreRoulette3++;
    chiffreRoulette3.innerHTML = nombreRoulette3;
    document.getElementById("roulette3").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 600, iterations: 10});
    if (nombreRoulette3 == 10) {
    	nombreDeTour3++;
    	relance();
    }
}
function rouletteRalenti() {
	nombreRoulette3++;
    chiffreRoulette3.innerHTML = nombreRoulette3;
    document.getElementById("roulette3").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 1000, iterations: 10});
    if (nombreRoulette3 == 10) {
    	nombreDeTour3++;
    	relance();
    }
}

function relance() {
	clearInterval(intervalRoulette3);
	nombreRoulette3 = 0;
	if (nombreDeTour3 == nombreDeTourA3-1) {
		intervalRoulette3 = setInterval(rouletteRalenti,600);
	}
	else if (nombreDeTour3 == nombreDeTourA3) {
		intervalRoulette3 = setInterval(chiffreGagnant,900);
	}
	else {
		intervalRoulette3 = setInterval(roulette,300);
	}
}

function chiffreGagnant() {
	nombreRoulette3++;
    chiffreRoulette3.innerHTML = nombreRoulette3;
    document.getElementById("roulette3").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(50vmin)' }], { duration: 1000, iterations: 10});
    if (nombreRoulette3 == chiffreAleatoire3) {
    	clearInterval(intervalRoulette3);
    	document.getElementById("roulette3").remove();
    	var roulette = document.createElement("p");
  		document.getElementById("divRoulette3").appendChild(roulette);
  		roulette.textContent = chiffreAleatoire3;
  		roulette.id = "roulette3";
  		document.getElementById("roulette3").animate([{ transform: 'translateY(-50vmin)' }, { transform: 'translateY(-20vmin)' }], { duration: 500, iterations: 1});
  		setTimeout(possitionnement,500);
  		function possitionnement() {
		document.getElementById("roulette3").style.marginTop = '10px';
		resultat();
		}
    }
}
}

function resultat() {
  if (chiffreAleatoire1 == calculDivision) {
  	titreWin();
  }
  else {
    titreLoose();
  }
}


function titreWin() {
  var titreWin = document.createElement("h1");
  document.getElementById("titre").appendChild(titreWin);
  titreWin.id = "win";
  titreWin.textContent = "You Win !";
}
function titreLoose() {
  var titreLoose = document.createElement("h1");
  document.getElementById("titre").appendChild(titreLoose);
  titreLoose.id = "loose";
  titreLoose.textContent = "You Loose !";
}
});
