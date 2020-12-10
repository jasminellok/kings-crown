import MiniGame from "../dodge_hits/miniGame";  
import Board from "./board";

export default class Game {
    constructor() {
        this.board = new Board(3, 5)
    }

}


let testing = new Game;
console.log(testing)

// const queen = new Room ("queen", "src/images/queen.png", 1)
// queen.drawSuit();
// queen.displayMessage()


// let dodgeHits = new MiniGame(1)
// dodgeHits.generateWeaponCache();
// dodgeHits.animateGame()

// window.addEventListener('keydown', function(e) {
//     e.preventDefault();
//     dodgeHits.registerPlayerMoves(e);
//     dodgeHits.closeGame(e);
// });