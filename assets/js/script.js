const compt = document.getElementById("compteur");
const click = document.getElementById("clicker");
const vendre = document.getElementById("vente");
const money = document.getElementById("argent");
const limite = document.getElementById("limite");

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
console.log("No but seriously please don't cheat this will ruin you're game experience");

// Initialisation de l'affichage
if (compt) compt.textContent = `Nombre de clicks : ${compteurClick}`;
if (money) money.textContent = `Argents : ${argent}`;

if (click) {
    click.addEventListener("click", () => {
        if (compteurClick < limiteClick) {
            compteurClick += puissanceClic; 
            if (compt) compt.textContent = `Nombre de click : ${compteurClick}`;
        }

        if (compteurClick >= limiteClick) { 
            if (limite) limite.textContent = `Vous avez atteint la limite de click : ${limiteClick}`;
        }
    });
}

function venteClick(){
    if (compteurClick >= 10) {
        argent += compteurClick * multiplicateurArgent;
        compteurClick = 0;

        if (money) money.textContent = `Argents : ${argent}`;
        if (compt) compt.textContent = `Nombre de clicks : ${compteurClick}`;
        if (limite) limite.textContent = ""; 
    } else {
        alert("Vous n'avez pas assez de click");
    }

    // N'affiche l'amélioration 1 QUE si elle n'a PAS encore été achetée
    if (argent >= 500 && !achat1Fait){
        upg_1.style.display = "block";
    }

    if (argent >= 500 && !achat2Fait){
        upg_2.style.display = "block";
    }

    if (argent >= 1000 && !achat3Fait){
        upg_3.style.display = "block";
    }

    if (argent >= 1500 && !achat4Fait){
        upg_4.style.display = "block";
    }

    if (argent >= 2000 && !achat5Fait){
        upg_5.style.display = "block";
    }
}

if (vente) {
    vente.addEventListener("click", venteClick);
}

// --- MODIFICATION DES ACHATS ---
function acheterLimite_1(){
    if(argent >= 500){
        argent -= 500;
        limiteClick = 500;
        achat1Fait = true; // true pour retenir que c'est acheté

        money.textContent = `Argents : ${argent}`;
        upg_1.style.display = "none";

        alert("Amélioration achetée ! La limite est maintenant de 500 clics.");
    } else {
        alert("Pas assez d'argent !");
    }
}

achat1.addEventListener("click", acheterLimite_1);

function acheterAugmantation_1(){
    if(argent >= 500){ // modifier pour modifier prix
        argent -= 500;
        
        puissanceClic = 5; // Désormais, chaque clic donnera 5
        achat2Fait = true;

        money.textContent = `Argents : ${argent}`;
        upg_2.style.display = "none";

        alert("Amélioration achetée ! Tu gagnes 5 clics par clic.");
    } else {
        alert("Pas assez d'argent !");
    }
}

achat2.addEventListener("click", acheterAugmantation_1);

function acheterLimite_2(){
    if(argent >=1000){
        argent -= 1000;

        limiteClick = 1000;
        achat3Fait = true;

        money.textContent = `Argents : ${argent}`;
        upg_3.style.display = "none";

        alert("Amélioration achetée ! La limite est maintenant de 1000 clics.");
    }else {
        alert("Pas assez d'argent !");
    }
}

achat3.addEventListener("click", acheterLimite_2);

function acheterAutoclicker_1() {
    if (argent >= 1500) {
        argent -= 1500;
        achat4Fait = true;

        money.textContent = `Argents : ${argent}`;
        upg_4.style.display = "none";

        alert("Autoclicker acheté ! Il cliquera pour toi toutes les 2 secondes.");

        // setInterval(fonction, millisecondes) -> 2000 ms = 2 secondes
        setInterval(() => {
            if (compteurClick < limiteClick) {
                compteurClick += puissanceClic; // Utilise la puissance actuelle de clic
                if (compt) compt.textContent = `Nombre de click : ${compteurClick}`;
            }
        }, 2000);

    } else {
        alert("Pas assez d'argent !");
    }
}

achat4.addEventListener("click", acheterAutoclicker_1);

function multiplicateur_1() {
    if (argent >= 2000) {
        argent -= 2000;
        achat5Fait = true;

        multiplicateurArgent = 2;

        money.textContent = `Argents : ${argent}`;

        alert("Algorithme de trading acheté ! Votre argent est maintenant multiplier par 2");
    } else {
        alert("Pas assez d'argent !")
    }
}

achat5.addEventListener("click", multiplicateur_1);

function sauvegarderPartie() {
    const saveData = {
        compteurClick: compteurClick,
        argent: argent,
        limiteClick: limiteClick,
        puissanceClic: puissanceClic,
        achat1Fait: achat1Fait,
        achat2Fait: achat2Fait,
        achat3Fait: achat3Fait,
        achat4Fait: achat4Fait,
        achat5Fait: achat5Fait
    };

    localStorage.setItem("clickerGameSave", JSON.stringify(saveData));
    console.log("Partie sauvegardée !");
}

function chargerPartie() {
    const savedSave = localStorage.getItem("clickerGameSave");

    if (savedSave) {
        const data = JSON.parse(savedSave);

        compteurClick = data.compteurClick;
        argent = data.argent;
        limiteClick = data.limiteClick;
        puissanceClic = data.puissanceClic;
        achat1Fait = data.achat1Fait;
        achat2Fait = data.achat2Fait;
        achat3Fait = data.achat3Fait;
        achat4Fait = data.achat4Fait;
        achat5Fait = data.achat4Fait;

        if (compt) compt.textContent = `Nombre de clicks : ${compteurClick}`;
        if (money) money.textContent = `Argents : ${argent}`;
        if (limite && limiteClick !== 100) {
            limite.textContent = `Vous avez atteint la limite de click : ${limiteClick}`;
        }

        if (achat1Fait && upg_1) upg_1.style.display = "none";
        if (achat2Fait && upg_2) upg_2.style.display = "none";
        if (achat3Fait && upg_3) upg_3.style.display = "none";
        if (achat4Fait && upg_4) upg_4.style.display = "none";
        if (achat2Fait && upg_5) upg_5.style.display = "none";

        if (achat4Fait) {
            setInterval(() => {
                if (compteurClick < limiteClick) {
                    compteurClick += puissanceClic;
                    if (compt) compt.textContent = `Nombre de clicks : ${compteurClick}`;
                }
            }, 2000);
        }

        console.log("Partie chargée avec succès !");
    }
}