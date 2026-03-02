// --- 1. Game State Variables ---
let luck = 0;
let luckPerClick = 1;
let clickCount = 0;
let petMax = 1; 
let currentPetCount = 0;
let multipliersActive = { x5: false, x10: false, x15: false, x20: false };
let auraLevel = 0;

// Achievement Tracking [1][2]
let achievements = {
    welcome: false,
    lv1Lucky: false,
    multiplierUnlocked: false,
    auraUnlocked: false,
    petsUnlocked: false,
    petCap2: false,
    petCap3: false,
    meltedKey: false
};

// --- 2. Elements ---
const scoreDisplay = document.getElementById("luck-score");
const luckyBtn = document.getElementById("lucky-btn");
const timerDisplay = document.getElementById("timer-display");

// --- 3. Main Click Logic [3] ---
luckyBtn.addEventListener("click", (event) => {
    // Check if the button is in the 50-click rest period
    if (clickCount >= 50) return;

    // Add Luck + Click Count
    luck += luckPerClick;
    clickCount++;
    
    // Update UI
    scoreDisplay.innerText = Math.floor(luck);
    createFloatingNumber(event.clientX, event.clientY);
    
    // Check Achievements & Rest System
    checkAchievements();
    if (clickCount >= 50) {
        startRestTimer();
    }
});

// --- 4. Auto Clicker Proof System [3] ---
function startRestTimer() {
    luckyBtn.style.display = "none"; 
    timerDisplay.style.display = "block";
    let timeLeft = 60; // 1 minute rest [3]

    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = "Resting... " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(countdown);
            luckyBtn.style.display = "block";
            timerDisplay.style.display = "none";
            clickCount = 0;
        }
    }, 1000);
}

// --- 5. Achievement Index [1][2] ---
function checkAchievements() {
    // 1 Luck Milestone
    if (luck >= 1 && !achievements.welcome) {
        alert("hello! Welcome!"); // It's a button alert [1]
        achievements.welcome = true;
    }

    // Unlocking Systems
    if (luck >= 300) achievements.multiplierUnlocked = true;
    if (luck >= 500) achievements.auraUnlocked = true;
    if (luck >= 700) achievements.petsUnlocked = true;

    // Pet Capacity [2]
    if (luck >= 1800 && !achievements.petCap2) {
        petMax = 2;
        achievements.petCap2 = true;
        alert("Pet Maximum 0/2 reached!");
    }
    if (luck >= 5500 && !achievements.petCap3) {
        petMax = 3;
        achievements.petCap3 = true;
        alert("Pet Maximum 0/3 reached!");
    }

    // Key Milestone [2][4]
    if (luck >= 1688888888 && !achievements.meltedKey) {
        achievements.meltedKey = true;
        startMeltedKeyTimer();
    }
}

// --- 6. Melted Key Timer (3 Hours) [2][4] ---
function startMeltedKeyTimer() {
    alert("You got the Melted Key! It will take 3 hours to unlock.");
    setTimeout(() => {
        alert("Melted Key Unlocked! The Luck Portal is open.");
    }, 10800000); // 3 hours in milliseconds
}

// --- 7. Pet Buff System (Every 1 Minute) [5] ---
setInterval(() => {
    if (currentPetCount > 0) {
        // Logic for adding luck based on pet index [5]
        // Example: Dog +50 luck
        luck += 50; 
        scoreDisplay.innerText = Math.floor(luck);
        console.log("Pet buff applied!");
    }
}, 60000); // 1 minute buff cycle [5]

// --- 8. Visual Effects [3] ---
function createFloatingNumber(x, y) {
    const el = document.createElement("div");
    el.classList.add("floating-number");
    el.innerText = "+" + luckPerClick;
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => { el.remove(); }, 1000);
} 