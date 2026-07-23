const compt = document.getElementById("compteur");
const click = document.getElementById("clicker");
const vendre = document.getElementById("vente");
const money = document.getElementById("argent");
const limite = document.getElementById("limite");
const upg_1 = document.getElementById("box-upgrade-1");
const upg_2 = document.getElementById("box-upgrade-2");
const upg_3 = document.getElementById("box-upgrade-3");
const upg_4 = document.getElementById("box-upgrade-4");
const achat1 = document.getElementById("achat-1");
const achat2 = document.getElementById("achat-2");
const achat3 = document.getElementById("achat-3");
const achat4 = document.getElementById("achat-4");

let compteurClick = 0;
let argent = 0;
let limiteClick = 100;
let puissanceClic = 1;
let achat1Fait = false;
let achat2Fait = false;
let achat3Fait = false;
let achat4Fait = false;

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
        argent += compteurClick;
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