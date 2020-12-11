import MiniGame from "../dodge_hits/miniGame";  
import Board from "./board";

export default class Game {
    constructor() {
        this.board = new Board(3, 5);
        this.guardLocation = this.board.roomMap.guard;
        //starting new game will initialize stuff

        this.newGame = this.newGame.bind(this);
        this.openRoom = this.openRoom.bind(this);
        this.specialRooms = this.specialRooms.bind(this);
        this.ckloseGame = this.ckloseGame.bind(this);
        this.gameWin = this.gameWin.bind(this);
        this.playMiniGame = this.playMiniGame.bind(this);

    }

    newGame() {
        this.board = new Board(3, 5);
        this.lifeCount = 2
        this.guardLocation = this.board.roomMap.guard;
        this.shownRooms = [];
        this.dodgeHits = null; //minigame
    }

    openRoom(room) {
        const roomValue = room.lastElementChild.lastElementChild.id;
        const [r, c] = [parseInt(roomValue[0]), parseInt(roomValue[2])]
        const suit = this.board.grid[r][c]
        this.shownRooms.push([r,c])
        suit.drawSuit();
        suit.displayMessage();
        if (suit.value === 'guard' || suit.value === 'commander' || 
            suit.value === 'storage' || suit.value === 'crown' || suit.value === 'prince') {
                let guardI;
                this.guardLocation.forEach((ele, i) => {
                    if ((ele[0] === r) && (ele[1]===c)) {
                        guardI = i;
                    }
                });
                if (guardI) this.guardLocation.splice(guardI,1);
                console.log("openroom", this.guardLocation)
                return suit.value
        } else {
            return false
        }
    }

    specialRooms(roomValue){
        switch(roomValue){
            case 'guard':
                this.dodgeHits = true;
                this.playMiniGame(1, this);
                break
            case 'commander':
                this.dodgeHits = true;
                this.playMiniGame(2, this);
                break
            case 'storage':
                this.lifeCount += 1;
                document.dispatchEvent(new Event("life-update"));
                break
            case 'crown':
                this.gameWin()
                break
            case 'prince':
                if (this.guardLocation.length > 1) {
                    // debugger;
                    const roomNum = this.guardLocation[1];
                    const [r, c] = [`${roomNum[0]}`, `${roomNum[1]}`];
                    const roomVal = document.getElementById(`${r}-${c}`);
                    const room = roomVal.parentElement.parentElement;
                    room.setAttribute('id','shown')
                    this.board.grid[roomNum[0]][roomNum[1]].drawSuit();
                    this.board.grid[roomNum[0]][roomNum[1]].displayMessage();
                    // debugger;
                }
                break
        }
    }

    ckloseGame() {

    }

    playMiniGame(difficulty, mainGame) {
        this.dodgeHits = new MiniGame(difficulty, mainGame)
        this.dodgeHits.generateWeaponCache();
        let canvasMessageCont = document.getElementsByClassName('canvas-message-container')[0];

        setTimeout (() => {
            canvasMessageCont.style.display = "flex"; 
            this.dodgeHits.showGame();
            this.dodgeHits.animateGame();
        }, 3000);

        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.dodgeHits.registerPlayerMoves(e); 
            this.dodgeHits.closeGame(e);
        });
        


    }

    gameWin(){

    }
}
