import Player from './player';
import Broadsword from './broadswords';
import Collision from './collision';



export default class MiniGame {
    constructor(difficulty, mainGame) {
        this.canvas = document.getElementsByClassName("canvas-mini-game")[0];
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d');

        this.bgSrc = "src/images/background.png";
        this.bgImg = new Image();
        this.cWidth = this.canvas.width;
        this.cHeight = this.canvas.height;
        this.successMessage = document.getElementsByClassName('canvas-success')[0];
        this.failMessage = document.getElementsByClassName('canvas-fail')[0];
        this.miniGame = document.getElementsByClassName('minigame')[0];
        this.canvasMessageCont = document.getElementsByClassName('canvas-message-container')[0];
        
        this.difficulty= difficulty;
        this.wCount = ((Math.ceil(Math.random()* difficulty)) + 1) + difficulty;
        this.weaponCache = [];
        this.player = new Player(this.cWidth, this.cHeight);
        this.gameOn = false;
        this.mainGame = mainGame;
        
        this.generateWeaponCache = this.generateWeaponCache.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.registerPlayerMoves = this.registerPlayerMoves.bind(this);
        this.animateGame = this.animateGame.bind(this);
        this.success = this.success.bind(this);
        this.ckCollision = this.ckCollision.bind(this);
        this.closeGame = this.closeGame.bind(this);
        this.showGame = this.showGame.bind(this);
    }

    generateWeaponCache() { //to play
        for (let count=0; count < this.wCount; count++) {
            const weapon = new Broadsword(this.cWidth, this.cHeight, this.difficulty)
            this.weaponCache.push(weapon)
        }
    }
    
    drawBg() {
        this.bgImg.src = "src/images/background.png";
        this.ctx.drawImage(this.bgImg, 0,0, this.cWidth, this.cHeight);
        this.canvas.style.display = "block"
    }
    
    registerPlayerMoves(e) { //keydown listener
        if (!this.gameOn) return;
        this.player.movePlayer(this.cWidth,this.cHeight, e);
        this.player.drawPlayer(this.ctx)
    }    

    success() {
        if ((this.player.yPos + (this.player.height/2)) <= 0) {
            this.gameOn = false;
            return true;
        }
        return false
    }
    
    ckCollision(weapon){
        let wLeft = weapon.xPos; //0
        let wRight = weapon.xPos + (weapon.width); // 0+w
        let wTop = weapon.yPos; //0
        let wBottom = weapon.yPos + (weapon.height); //0+h

        let pXCenter = this.player.xPos + (this.player.width/2); //0+radius
        let pYCenter = this.player.yPos + (this.player.height/2); //0+radius

        if ( ((pYCenter < wBottom) && (pYCenter > wTop)) && ((pXCenter < wRight) && (pXCenter > wLeft)) ) {
            this.gameOn = false;
            this.mainGame.lifeCount -=1;
            document.dispatchEvent(new Event("life-update"));
            return true;
        }
        return false;
    }

    animateGame() { //to play
        if (!this.gameOn) return;
        this.ctx.clearRect(0,0,this.cWidth, this.cHeight)  
        this.drawBg()
        this.player.drawPlayer(this.ctx)
        this.weaponCache.forEach (weapon => {
            weapon.moveItem(this.ctx,this.cWidth,this.cHeight)
            if (this.ckCollision(weapon)) {
                this.failMessage.style.display = "block"
                if (this.difficulty > 1) document.dispatchEvent(new Event("commander-msg"));
            }
        })

        if (this.success()){
            this.successMessage.style.display = "block";
            if (this.difficulty > 1) document.dispatchEvent(new Event("commander-msg"));
        }

        if (this.gameOn) requestAnimationFrame(this.animateGame);
    }


    closeGame(e){ //keydown listener
        if (e.key === "Escape") {
            if (this.canvas.style.display === "block") {
                this.canvas.style.display = "none";
                this.successMessage.style.display = "none";
                this.failMessage.style.display = "none";
                this.canvasMessageCont.style.display = "none";
                this.miniGame.style.background = "none";
            } 
            this.gameOn = false;
            this.mainGame.dodgeHits = null;
            this.mainGame.ckloseGame();
        }
    }

    showGame(e){
        if (this.canvas.style.display === "none") {
            this.canvas.style.display = "block";
        } 
        this.gameOn = true; 
    }

}





