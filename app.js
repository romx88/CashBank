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
    var delta;

    // Use the rigged values if they exist
    if (indexes.length > 0) {
        delta = (offset + 2) * num_icons + indexes[offset];
    } else {
        delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    }

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
        var machineCreditText = document.getElementById('machine-credit').textContent;
        var machineCredit = parseInt(machineCreditText.split(' : ')[1]);
        win(machineCredit); 
    });
};

window.onload = function() {
    document.getElementById('player-credit').textContent = 'Crédit du joueur : 3000';
    document.getElementById('machine-credit').textContent = 'Crédit de la machine : 0';
};


document.getElementById('pay').addEventListener('click', function() {
    // Get the current credits
    var playerCredit = parseInt(document.getElementById('player-credit').textContent.split(' : ')[1]);
    var winCredit = parseInt(document.getElementById('win-credit').textContent);

    // Check if winCredit is greater than 0
    if (winCredit > 0) {
        // Transfer the credit from the machine to the player
        playerCredit += winCredit;
        winCredit = 0;

        // Update the credit displays
        document.getElementById('player-credit').textContent = 'Crédit du joueur : ' + playerCredit;
        document.getElementById('win-credit').textContent = winCredit;
    }
});

document.getElementById('bet-more').addEventListener('click', function() {
    // Get the current credits
    var playerCredit = parseInt(document.getElementById('player-credit').textContent.split(' : ')[1]);
    var machineCredit = parseInt(document.getElementById('machine-credit').textContent.split(' : ')[1]);

    // Check if the player has enough credits and the machine credit is less than 2000
    if (playerCredit > 0 && machineCredit < 2000) {
        // Transfer the credit from the player to the machine
        playerCredit -= 5;
        machineCredit += 5;

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
        playerCredit += 5;
        machineCredit -= 5;

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
    var transferAmount = Math.min(playerCredit, 2000 - machineCredit);

    // Transfer the credit from the player to the machine
    playerCredit -= transferAmount;
    machineCredit += transferAmount;

    // Update the credit displays
    document.getElementById('player-credit').textContent = 'Crédit du joueur : ' + playerCredit;
    document.getElementById('machine-credit').textContent = 'Crédit de la machine : ' + machineCredit;
});

var oldWinCredit = 0;

function win(machineCredit) {
    // Sort the selected icons
    var sortedIcons = selectedIcons.slice().sort();

	if (selectedIcons[0] === selectedIcons[1] && selectedIcons[0] === selectedIcons[2]) {
        debugEl.textContent =(' JACKPOT !');
        winCredit = machineCredit * 10 + oldWinCredit; // Ajouter l'ancien crédit gagné
        document.getElementById('win-credit').textContent = winCredit;
        document.getElementById('machine-credit').textContent = 'Crédit de la machine : 0';  
        oldWinCredit = winCredit; // Mettre à jour l'ancien crédit gagné
    }
  
}


document.getElementById('lever').addEventListener('click', rollAll);