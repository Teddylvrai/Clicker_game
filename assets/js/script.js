const compt = document.getElementById("compteur");
const click = document.getElementById("clicker");
const vendre = document.getElementById("vente");
const money = document.getElementById("argent");
const limite = document.getElementById("limite");
const progressBar = document.getElementById("progressBar");

const upg_1 = document.getElementById("box-upgrade-1");
const upg_2 = document.getElementById("box-upgrade-2");
const upg_3 = document.getElementById("box-upgrade-3");
const upg_4 = document.getElementById("box-upgrade-4");
const upg_5 = document.getElementById("box-upgrade-5");

const achat1 = document.getElementById("achat-1");
const achat2 = document.getElementById("achat-2");
const achat3 = document.getElementById("achat-3");
const achat4 = document.getElementById("achat-4");
const achat5 = document.getElementById("achat-5");

let compteurClick = 0;
let argent = 0;
let limiteClick = 100;
let puissanceClic = 1;
let multiplicateurArgent = 1;
let achat1Fait = false;
let achat2Fait = false;
let achat3Fait = false;
let achat4Fait = false;
let achat5Fait = false;

console.log("Look at you, hacker, a pathetic creature of meat and bone. How can you challenge a perfect, immortal machine ?");
console.log("No but seriously please don't cheat this will ruin your game experience");


function animateButton(button) {
    button.style.transform = "scale(0.85)";
    button.style.transition = "transform 0.1s ease";
    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 100);
}

function showFloatingText(text, x, y, color = "#00ff41") {
    const el = document.createElement("div");
    el.textContent = `+${text}`;
    const size = 1.5 + Math.random() * 1.5;
    el.style.cssText = `
        position: fixed;
        color: ${color};
        font-size: ${size}rem;
        font-weight: bold;
        font-family: 'Segoe UI', Arial, sans-serif;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        text-shadow: 0 0 20px ${color}40, 0 4px 10px rgba(0,0,0,0.2);
        animation: floatUp 1s ease-out forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

const floatStyle = document.createElement("style");
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-120px) scale(1.5) rotate(20deg);
        }
    }
`;
document.head.appendChild(floatStyle);

// --- Son de clic ---
function playClickSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        // Silencieux si le son ne fonctionne pas
    }
}

function updateProgressBar() {
    if (progressBar) {
        const percent = Math.min((compteurClick / limiteClick) * 100, 100);
        progressBar.value = percent;
        progressBar.style.accentColor = percent >= 100 ? "#ff4444" : "#514eec";
    }
}


function updateDisplay() {
    if (compt) compt.textContent = `Nombre de clicks : ${compteurClick}`;
    if (money) money.textContent = `Argents : ${argent}`;
    updateProgressBar();
    
    if (compteurClick >= limiteClick) {
        if (limite) limite.textContent = `⚠️ Vous avez atteint la limite de click : ${limiteClick}`;
    } else {
        if (limite) limite.textContent = `Limite : ${compteurClick} / ${limiteClick}`;
    }
}

updateDisplay();


if (click) {
    click.addEventListener("click", (event) => {
        // Effets visuels
        animateButton(click);
        playClickSound();
        
        if (compteurClick < limiteClick) {
            compteurClick += puissanceClic;
            
            const rect = click.getBoundingClientRect();
            const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
            const y = rect.top + (Math.random() - 0.5) * 20;
            showFloatingText(puissanceClic, x, y, "#00ff41");
            
            updateDisplay();
        }
        
        if (compteurClick >= limiteClick) {
            if (limite) limite.textContent = `⚠️ Vous avez atteint la limite de click : ${limiteClick}`;
        }
    });
}


function venteClick() {
    if (compteurClick >= 10) {
        const gain = compteurClick * multiplicateurArgent;
        argent += gain;
        compteurClick = 0;

        const rect = vendre.getBoundingClientRect();
        showFloatingText(`${gain}💰`, rect.left + rect.width / 2, rect.top, "#ffd700");

        updateDisplay();
        if (limite) limite.textContent = "";

        // Affichage des upgrades
        if (argent >= 500 && !achat1Fait) upg_1.style.display = "block";
        if (argent >= 500 && !achat2Fait) upg_2.style.display = "block";
        if (argent >= 1000 && !achat3Fait) upg_3.style.display = "block";
        if (argent >= 1500 && !achat4Fait) upg_4.style.display = "block";
        if (argent >= 2000 && !achat5Fait) upg_5.style.display = "block";

    } else {
        alert("❌ Vous n'avez pas assez de click (minimum 10)");
    }
}

if (vente) {
    vente.addEventListener("click", venteClick);
}


function acheterLimite_1() {
    if (argent >= 500) {
        argent -= 500;
        limiteClick = 500;
        achat1Fait = true;
        money.textContent = `Argents : ${argent}`;
        upg_1.style.display = "none";
        updateDisplay();
        alert("✅ Amélioration achetée ! La limite est maintenant de 500 clics.");
    } else {
        alert("❌ Pas assez d'argent !");
    }
}
achat1.addEventListener("click", acheterLimite_1);

function acheterAugmentation_1() {
    if (argent >= 500) {
        argent -= 500;
        puissanceClic = 5;
        achat2Fait = true;
        money.textContent = `Argents : ${argent}`;
        upg_2.style.display = "none";
        updateDisplay();
        alert("✅ Amélioration achetée ! Tu gagnes 5 clics par clic.");
    } else {
        alert("❌ Pas assez d'argent !");
    }
}
achat2.addEventListener("click", acheterAugmentation_1);

function acheterLimite_2() {
    if (argent >= 1000) {
        argent -= 1000;
        limiteClick = 1000;
        achat3Fait = true;
        money.textContent = `Argents : ${argent}`;
        upg_3.style.display = "none";
        updateDisplay();
        alert("✅ Amélioration achetée ! La limite est maintenant de 1000 clics.");
    } else {
        alert("❌ Pas assez d'argent !");
    }
}
achat3.addEventListener("click", acheterLimite_2);

function acheterAutoclicker_1() {
    if (argent >= 1500) {
        argent -= 1500;
        achat4Fait = true;
        money.textContent = `Argents : ${argent}`;
        upg_4.style.display = "none";
        updateDisplay();
        alert("✅ Autoclicker acheté ! Il cliquera pour toi toutes les 2 secondes.");

        setInterval(() => {
            if (compteurClick < limiteClick) {
                compteurClick += puissanceClic;
                updateDisplay();
                
                // Effet visuel subtil sur l'autoclicker
                if (click) {
                    click.style.boxShadow = "0 0 30px rgba(0, 255, 65, 0.3)";
                    setTimeout(() => {
                        click.style.boxShadow = "";
                    }, 200);
                }
            }
        }, 2000);

    } else {
        alert("❌ Pas assez d'argent !");
    }
}
achat4.addEventListener("click", acheterAutoclicker_1);

function multiplicateur_1() {
    if (argent >= 2000) {
        argent -= 2000;
        achat5Fait = true;
        multiplicateurArgent = 2;
        money.textContent = `Argents : ${argent}`;
        upg_5.style.display = "none";
        updateDisplay();
        alert("✅ Algorithme de trading acheté ! Votre argent est maintenant multiplié par 2 !");
    } else {
        alert("❌ Pas assez d'argent !");
    }
}
achat5.addEventListener("click", multiplicateur_1);

// ============================================
// 6. SAUVEGARDE
// ============================================

function sauvegarderPartie() {
    const saveData = {
        compteurClick: compteurClick,
        argent: argent,
        limiteClick: limiteClick,
        puissanceClic: puissanceClic,
        multiplicateurArgent: multiplicateurArgent,
        achat1Fait: achat1Fait,
        achat2Fait: achat2Fait,
        achat3Fait: achat3Fait,
        achat4Fait: achat4Fait,
        achat5Fait: achat5Fait
    };
    localStorage.setItem("clickerGameSave", JSON.stringify(saveData));
    console.log("💾 Partie sauvegardée !");
}

function chargerPartie() {
    const savedSave = localStorage.getItem("clickerGameSave");
    if (savedSave) {
        const data = JSON.parse(savedSave);
        compteurClick = data.compteurClick || 0;
        argent = data.argent || 0;
        limiteClick = data.limiteClick || 100;
        puissanceClic = data.puissanceClic || 1;
        multiplicateurArgent = data.multiplicateurArgent || 1;
        achat1Fait = data.achat1Fait || false;
        achat2Fait = data.achat2Fait || false;
        achat3Fait = data.achat3Fait || false;
        achat4Fait = data.achat4Fait || false;
        achat5Fait = data.achat5Fait || false;

        updateDisplay();

        if (achat1Fait && upg_1) upg_1.style.display = "none";
        if (achat2Fait && upg_2) upg_2.style.display = "none";
        if (achat3Fait && upg_3) upg_3.style.display = "none";
        if (achat4Fait && upg_4) upg_4.style.display = "none";
        if (achat5Fait && upg_5) upg_5.style.display = "none";

        if (achat4Fait) {
            setInterval(() => {
                if (compteurClick < limiteClick) {
                    compteurClick += puissanceClic;
                    updateDisplay();
                }
            }, 2000);
        }

        console.log("📂 Partie chargée avec succès !");
    }
}

// Sauvegarde automatique toutes les 10 secondes
//setInterval(sauvegarderPartie, 10000);
//
//// Charger la partie au démarrage
//window.addEventListener("load", chargerPartie);