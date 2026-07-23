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

// Initialisation en anglais
if (compt) compt.textContent = `Clicks count: ${compteurClick}`;
if (money) money.textContent = `Money: ${argent} $`;

if (click) {
    click.addEventListener("click", () => {
        if (compteurClick < limiteClick) {
            compteurClick += puissanceClic;
            if (compt) compt.textContent = `Clicks count: ${compteurClick}`;
        }

        if (compteurClick >= limiteClick) {
            if (limite) limite.textContent = `You reached the click limit: ${limiteClick}`;
        }
    });
}

function venteClick(){
    if (compteurClick >= 10) {
        argent += compteurClick;
        compteurClick = 0;

        if (money) money.textContent = `Money: ${argent} $`;
        if (compt) compt.textContent = `Clicks count: ${compteurClick}`;
        if (limite) limite.textContent = ""; 
    } else {
        alert("You don't have enough clicks!");
    }

    if (argent >= 500 && !achat1Fait) {
        upg_1.style.display = "block";
    }
    if (argent >= 500 && !achat2Fait) {
        upg_2.style.display = "block";
    }
    if (argent >= 1000 && !achat3Fait) {
        upg_3.style.display = "block";
    }
    if (argent >= 1500 && !achat4Fait) {
        upg_4.style.display = "block";
    }
}

if (vente) {
    vente.addEventListener("click", venteClick);
}

function acheterLimite_1(){
    if(argent >= 500){
        argent -= 500;
        limiteClick = 500;
        achat1Fait = true;

        money.textContent = `Money: ${argent} $`;
        upg_1.style.display = "none";
        alert("Upgrade purchased! Limit is now 500 clicks.");
    } else {
        alert("Not enough money!");
    }
}
achat1.addEventListener("click", acheterLimite_1);

function acheterAugmentation_1(){
    if(argent >= 500){
        argent -= 500;
        puissanceClic = 5;
        achat2Fait = true;

        money.textContent = `Money: ${argent} $`;
        upg_2.style.display = "none";
        alert("Upgrade purchased! You get 5 clicks per click.");
    } else {
        alert("Not enough money!");
    }
}
achat2.addEventListener("click", acheterAugmentation_1);

function acheterLimite_2(){
    if(argent >= 1000){
        argent -= 1000;
        limiteClick = 1000;
        achat3Fait = true;

        money.textContent = `Money: ${argent} $`;
        upg_3.style.display = "none";
        alert("Upgrade purchased! Limit is now 1000 clicks.");
    } else {
        alert("Not enough money!");
    }
}
achat3.addEventListener("click", acheterLimite_2);

function acheterAutoclicker_1() {
    if (argent >= 1500) {
        argent -= 1500;
        achat4Fait = true;

        money.textContent = `Money: ${argent} $`;
        upg_4.style.display = "none";
        alert("Autoclicker purchased! It will click for you every 2 seconds.");

        setInterval(() => {
            if (compteurClick < limiteClick) {
                compteurClick += puissanceClic;
                if (compt) compt.textContent = `Clicks count: ${compteurClick}`;
            }
        }, 2000);

    } else {
        alert("Not enough money!");
    }
}
achat4.addEventListener("click", acheterAutoclicker_1);