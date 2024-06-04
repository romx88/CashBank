/**
 * Setup
 */
document.getElementById('lever').addEventListener('click', rollAll);
var debugEl = document.getElementById('debug'),
    iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"],
    icon_width = 79,
    icon_height = 79,
    num_icons = 9,
    time_per_icon = 100,
    indexes = [0, 0, 0];

/** 
 * Roll one reel
 */
var roll = function(reel, offset) {
    offset = offset || 0;
    var delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

    return new Promise(function(resolve, reject) {
        var style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style["background-position-y"]),
            targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
            normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);

        setTimeout(function() { 
            reel.style.transition = "background-position-y " + ((8 + 1 * delta) * time_per_icon) + "ms cubic-bezier(.41,-0.01,.63,1.09)";
            reel.style.backgroundPositionY = (backgroundPositionY + delta * icon_height) + "px";
        }, offset * 150);

        setTimeout(function() {
            reel.style.transition = "none";
            reel.style.backgroundPositionY = normTargetBackgroundPositionY + "px";
            resolve(delta%num_icons);
        }, (8 + 1 * delta) * time_per_icon + offset * 150);
    });
};

/**
 * Roll all reels, when promise resolves roll again
 */
var selectedIcons = [];
function rollAll() {
	var reelsList = document.querySelectorAll('.slots > .reel');
    var reelsArray = Array.prototype.slice.call(reelsList);

    Promise
        .all(reelsArray.map(function(reel, i) { return roll(reel, i); }))
        .then(function(deltas) {
            selectedIcons = deltas.map(function(delta, i) { 
                indexes[i] = (indexes[i] + delta)%num_icons; 
                return iconMap[indexes[i]];
            });
            debugEl.textContent = selectedIcons.join(' - ');
win();
		
            if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
                var winCls = indexes[0] == indexes[2] ? "win2" : "win1";
                document.querySelector(".slots").classList.add(winCls);
                setTimeout(function() { document.querySelector(".slots").classList.remove(winCls); }, 2000)
            }
        });
};

window.onload = function() {
    document.getElementById('player-credit').textContent = 'Crédit du joueur : 3000';
    document.getElementById('machine-credit').textContent = 'Crédit de la machine : 0';
};


document.getElementById('pay').addEventListener('click', function() {
    // Get the current credits
    var playerCredit = parseInt(document.getElementById('player-credit').textContent.split(' : ')[1]);
    var machineCredit = parseInt(document.getElementById('machine-credit').textContent.split(' : ')[1]);

    // Transfer the credit from the machine to the player
    playerCredit += machineCredit;
    machineCredit = 0;

    // Update the credit displays
    document.getElementById('player-credit').textContent = 'Crédit du joueur : ' + playerCredit;
    document.getElementById('machine-credit').textContent = 'Crédit de la machine : ' + machineCredit;
});

document.getElementById('bet-more').addEventListener('click', function() {
    // Get the current credits
    var playerCredit = parseInt(document.getElementById('player-credit').textContent.split(' : ')[1]);
    var machineCredit = parseInt(document.getElementById('machine-credit').textContent.split(' : ')[1]);

    // Check if the player has enough credits
    if (playerCredit > 0) {
        // Transfer the credit from the player to the machine
        playerCredit -= 1;
        machineCredit += 1;

        // Update the credit displays
        document.getElementById('player-credit').textContent = 'Crédit du joueur : ' + playerCredit;
        document.getElementById('machine-credit').textContent = 'Crédit de la machine : ' + machineCredit;
    }
});

document.getElementById('bet-less').addEventListener('click', function() {
    // Get the current credits
    var playerCredit = parseInt(document.getElementById('player-credit').textContent.split(' : ')[1]);
    var machineCredit = parseInt(document.getElementById('machine-credit').textContent.split(' : ')[1]);

    // Check if the machine has enough credits
    if (machineCredit > 0) {
        // Transfer the credit from the machine to the player
        playerCredit += 1;
        machineCredit -= 1;

        // Update the credit displays
        document.getElementById('player-credit').textContent = 'Crédit du joueur : ' + playerCredit;
        document.getElementById('machine-credit').textContent = 'Crédit de la machine : ' + machineCredit;
    }
});

document.getElementById('bet-max').addEventListener('click', function() {
    // Get the current credits
    var playerCredit = parseInt(document.getElementById('player-credit').textContent.split(' : ')[1]);
    var machineCredit = parseInt(document.getElementById('machine-credit').textContent.split(' : ')[1]);

    // Calculate the amount to transfer from the player to the machine
    var transferAmount = 2000 - machineCredit;

    // Check if the player has enough credits
    if (playerCredit >= transferAmount) {
        // Transfer the credit from the player to the machine
        playerCredit -= transferAmount;
        machineCredit += transferAmount;

        // Update the credit displays
        document.getElementById('player-credit').textContent = 'Crédit du joueur : ' + playerCredit;
        document.getElementById('machine-credit').textContent = 'Crédit de la machine : ' + machineCredit;
    }
});
// Définition des variables manquantes
var playerCredits = 3000;
var machineCredits = 0;
var bet = 0;
var jackpot = 5000; // Définissez la valeur du jackpot selon vos besoins
var x = 2; // Définissez la valeur de x selon vos besoins

// ...

function win() {
    // Vérifie si toutes les icônes sont les mêmes
    if (selectedIcons.every((icon, i, arr) => icon === arr[0])) {
        // Si c'est le cas, le joueur gagne le jackpot
        playerCredits += bet * 5;
        debugEl.textContent = "Jackpot! Vous avez gagné " + bet * 5 + " crédits!";
        document.getElementById('win-credit').textContent = "Win : " + (bet + bet * 5);
    }
    // Vérifie si les deux premières icônes sont les mêmes et la troisième est différente
    else if (selectedIcons[0] === selectedIcons[1] && selectedIcons[1] !== selectedIcons[2]) {
        // Si c'est le cas, le joueur gagne 1.5 fois sa mise
        playerCredits += bet * 1.5;
        debugEl.textContent = "Vous avez gagné " + bet * 1.5 + " crédits!";
        document.getElementById('win-credit').textContent = "Win : " + (bet + bet * 1.5);
    }
    // Vérifie si les deux dernières icônes sont les mêmes
    else if (selectedIcons[1] === selectedIcons[2]) {
        // Si c'est le cas, le joueur gagne le double de sa mise
        playerCredits += bet * 2;
        debugEl.textContent = "Vous avez gagné " + bet * 2 + " crédits!";
        document.getElementById('win-credit').textContent = "Win : " + (bet + bet * 2);
    }
    // Vérifie si les trois icônes sont en ordre croissant
    else if (selectedIcons.every((icon, i, arr) => icon === iconMap[i])) {
        // Si c'est le cas, le joueur gagne le triple de sa mise
        playerCredits += bet * 3;
        debugEl.textContent = "Vous avez gagné " + bet * 3 + " crédits!";
        document.getElementById('win-credit').textContent = "Win : " + (bet + bet * 3);
    }
    // Vérifie si les trois icônes sont en ordre décroissant
    else if (selectedIcons.every((icon, i, arr) => icon === iconMap[8 - i])) {
        // Si c'est le cas, le joueur gagne le triple de sa mise
        playerCredits += bet * 3;
        debugEl.textContent = "Vous avez gagné " + bet * 3 + " crédits!";
        document.getElementById('win-credit').textContent = "Win : " + (bet + bet * 3);
    }
    else {
        // Vérifie si les trois icônes sont les mêmes (jackpot)
        if (selectedIcons[0] === selectedIcons[1] && selectedIcons[1] === selectedIcons[2]) {
            playerCredits += jackpot; // le joueur gagne le jackpot
            debugEl.textContent = "Jackpot, vous avez gagné le jackpot!";
            document.getElementById('win-credit').textContent = "Win : " + jackpot; // affiche que le joueur a gagné le jackpot
        }
        // Vérifie si les deux premières icônes sont les mêmes et la troisième est différente (gagner fois x)
        else if (selectedIcons[0] === selectedIcons[1] && selectedIcons[1] !== selectedIcons[2]) {
            playerCredits += bet * x; // le joueur gagne sa mise multipliée par x
            debugEl.textContent = "Combo de deux, vous avez gagné votre mise fois " + x + "!";
            document.getElementById('win-credit').textContent = "Win : " + bet * x; // affiche que le joueur a gagné sa mise multipliée par x
        }
        // Dans tous les autres cas, le joueur perd
        else {
			playerCredits -= bet; // déduit la mise du crédit du joueur
			debugEl.textContent = "Vous avez perdu votre mise!";
			document.getElementById('win-credit').textContent = "Win : 0"; // affiche que le joueur n'a rien gagné
		}
    }
	machineCredits = 0;
	document.getElementById('machine-credit').textContent = 'Crédit de la machine : ' + machineCredits;
	document.getElementById('bet-credit').textContent = 'Bet : ' + bet;
}


document.getElementById('lever').addEventListener('click', rollAll);