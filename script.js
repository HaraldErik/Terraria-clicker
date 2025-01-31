let coins = 0;
let coinsPerClick = 1; // Base coins per click
let coinsPerSecond = 0;
let npcCount = 0;
let swordCost = 10;
let guideCost = 50;
let lightsBaneCost = 750; // Cost for Light's Bane
let copperSwordsOwned = 0;
let lightsBaneOwned = 0; // Track the number of Light's Bane owned
let clickCount = 0; // Variable to track the number of clicks (damage)

const clickButton = document.getElementById('clickButton'); // Now an image
const buySwordButton = document.getElementById('buySword');
const buyLightsBaneButton = document.getElementById('buyLightsBane');
const buyGuideButton = document.getElementById('buyNPC');
const swordInfo = document.getElementById('swordInfo');
const lightsBaneInfo = document.getElementById('lightsBaneInfo');
const npcInfo = document.getElementById('npcInfo');
const statsDisplay = document.getElementById('statsDisplay');
const coinCounter = document.getElementById('coinCounter'); // Coin counter element

// Update the coin display and button states
function updateDisplay() {
    coinCounter.innerText = `You have ${coins} coins`; // Update coin counter
    buySwordButton.innerText = `Buy Copper Sword (Cost: ${swordCost} Coins)`;
    buyLightsBaneButton.innerText = `Buy Light's Bane (Cost: ${lightsBaneCost} Coins)`;
    buyGuideButton.innerText = `Hire NPC (Cost: ${guideCost} Coins)`;
    buySwordButton.disabled = coins < swordCost;
    buyLightsBaneButton.disabled = coins < lightsBaneCost;
    buyGuideButton.disabled = coins < guideCost;

    // Calculate total coins per click
    const totalCoinsPerClick = coinsPerClick + (lightsBaneOwned * 10);
    
    // Update stats display
    statsDisplay.innerText = `Coins per Click: ${totalCoinsPerClick} | Coins per Second: ${coinsPerSecond} | Copper Swords Owned: ${copperSwordsOwned} | Light's Bane Owned: ${lightsBaneOwned} | DMG: ${clickCount}`;
}

// Click event for the King Slime image
clickButton.addEventListener('click', () => {
    clickCount++; // Increment the click count (damage)
    const totalCoinsPerClick = coinsPerClick + (lightsBaneOwned * 10); // Calculate total coins per click
    coins += totalCoinsPerClick; // Add coins per click from both swords
    updateDisplay();

    // Check if the click count has reached 1000 or 1500
    if (clickCount >= 1500) {
        clickButton.src = "Eye_of_Cthulhu_(Second_Phase).gif"; // Change the image to Eye of Cthulhu Second Phase
    } else if (clickCount >= 1000) {
        clickButton.src = "Eye_of_Cthulhu_(Phase_1).gif"; // Change the image to Eye of Cthulhu Phase 1
    }
});

// Buy Copper Sword event
buySwordButton.addEventListener('click', () => {
    if (coins >= swordCost) {
        coins -= swordCost;
        coinsPerClick += 1; // Increase coins per click
        copperSwordsOwned += 1; // Increment the number of Copper Swords owned
        swordCost = Math.floor(swordCost * 1.1); // Increase cost for next sword
        updateDisplay();
    }
});

// Buy Light's Bane event
buyLightsBaneButton.addEventListener('click', () => {
    if (coins >= lightsBaneCost) {
        coins -= lightsBaneCost;
        lightsBaneOwned += 1; // Increment the number of Light's Bane owned
        lightsBaneCost = Math.floor(lightsBaneCost * 1.1); // Increase cost for next Light's Bane
        updateDisplay();
    }
});

// Hire NPC event
buyGuideButton.addEventListener('click', () => {
    if (coins >= guideCost) {
        coins -= guideCost;
        npcCount += 1; // Increment the number of NPCs owned
        coinsPerSecond += 1; // Each NPC gives 1 coin per second
        guideCost = Math.floor(guideCost * 1.1); // Increase cost for next NPC
        updateDisplay();
    }
});

// Coin generation from NPCs
setInterval(() => {
    coins += coinsPerSecond;
    updateDisplay();
}, 1000);

// Function to show the selected tab
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Hide all tabs
    });
    document.getElementById(tabName).style.display = 'block'; // Show the selected tab
}

// Initial display update
updateDisplay();
// Funktion för att spara spelets progress
function saveGame() {
    const gameData = {
        coins: coins,
        coinsPerClick: coinsPerClick,
        coinsPerSecond: coinsPerSecond,
        npcCount: npcCount,
        swordCost: swordCost,
        guideCost: guideCost,
        lightsBaneCost: lightsBaneCost,
        copperSwordsOwned: copperSwordsOwned,
        lightsBaneOwned: lightsBaneOwned,
        clickCount: clickCount
    };
    localStorage.setItem("clickerGameSave", JSON.stringify(gameData));
}

// Funktion för att ladda spelets progress
function loadGame() {
    const savedData = localStorage.getItem("clickerGameSave");
    if (savedData) {
        const gameData = JSON.parse(savedData);
        coins = gameData.coins;
        coinsPerClick = gameData.coinsPerClick;
        coinsPerSecond = gameData.coinsPerSecond;
        npcCount = gameData.npcCount;
        swordCost = gameData.swordCost;
        guideCost = gameData.guideCost;
        lightsBaneCost = gameData.lightsBaneCost;
        copperSwordsOwned = gameData.copperSwordsOwned;
        lightsBaneOwned = gameData.lightsBaneOwned;
        clickCount = gameData.clickCount;
        updateDisplay(); // Uppdatera UI efter laddning
    }
}

// Spara spelet varje 10 sekunder automatiskt
setInterval(saveGame, 10000);

// Ladda spelet vid start
window.onload = loadGame;
