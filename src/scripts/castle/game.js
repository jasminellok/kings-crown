import MiniGame from "../dodge_hits/miniGame";

let canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 300;

let dodgeHits = new MiniGame(canvas)
dodgeHits.generateWeaponCache();
dodgeHits.animateGame()

window.addEventListener('keydown', function(e) {
    e.preventDefault();
    dodgeHits.registerPlayerMoves(e);
    dodgeHits.closeGame(e);
    dodgeHits.showGame(e);
});