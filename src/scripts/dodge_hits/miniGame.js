import Player from './player';
import Broadsword from './broadswords';
import Collision from './collision';

export default class MiniGame {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.bgSrc = "src/images/background.png";
        this.bgImg = new Image();
        this.canvas = canvas;
        this.cWidth = canvas.width;
        this.cHeight = canvas.height;
        this.successMessage = document.getElementsByClassName('canvas-success')[0];
        this.failMessage = document.getElementsByClassName('canvas-fail')[0];
        this.genMessage = document.getElementsByClassName('canvas-message-container')[0];
        this.miniGame = document.getElementsByClassName('minigame')[0];
        
        this.weaponCache = [];
        this.player = new Player(this.cWidth, canvas.height);
        this.gameOn = true;
        this.gameResult = 0;
        this.reset = false;
        
        this.generateWeaponCache = this.generateWeaponCache.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.registerPlayerMoves = this.registerPlayerMoves.bind(this);
        this.animateGame = this.animateGame.bind(this);
        this.success = this.success.bind(this);
        this.ckCollision = this.ckCollision.bind(this);
        this.closeGame = this.closeGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.showGame = this.showGame.bind(this);
    }

    generateWeaponCache() { //to play
        for (let count=0; count < (Math.ceil(Math.random()*3) +1); count++) {
            const weapon = new Broadsword(this.cWidth, this.cHeight)
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
        let wLeft = weapon.xPos;
        let wRight = weapon.xPos + (weapon.width);
        let wTop = weapon.yPos;
        let wBottom = weapon.yPos + (weapon.height);

        let pXCenter = this.player.xPos + (this.player.width/2);
        let pYCenter = this.player.yPos + (this.player.height/2);

        if ( ((pYCenter < wBottom) && (pYCenter > wTop)) && ((pXCenter < wRight) && (pXCenter > wLeft)) ) {
            this.gameOn = false;
            this.gameResult = -1;
            return true;
        }
        return false;
    }

    animateGame() { //to play
        this.reset = false;
        if (!this.gameOn) return;
        this.ctx.clearRect(0,0,this.cWidth, this.cHeight)  
        this.drawBg()
        this.player.drawPlayer(this.ctx)
        this.weaponCache.forEach (weapon => {
            weapon.moveItem(this.ctx,this.cWidth,this.cHeight)
            if (this.ckCollision(weapon)) {
                this.failMessage.style.display = "block"
                // let hit = new Collision((weapon.xPos),weapon.yPos) 
                // hit.drawItem(this.ctx);
            }
        })

        if (this.success()){
            this.successMessage.style.display = "block"
        }
        if (this.gameOn) requestAnimationFrame(this.animateGame);
    }


    closeGame(e){ //keydown listener
        if (e.key === "Escape") {
            if (this.canvas.style.display === "block") {
                this.canvas.style.display = "none";
                this.successMessage.style.display = "none";
                this.failMessage.style.display = "none";
                this.genMessage.style.display = "none";
                this.miniGame.style.background = "none";
            } 
            this.gameOn = false;
        }
    }

    resetGame() { //starting game, to play
        this.weaponCache = [];
        let newPlayer = new Player(this.cWidth, canvas.height);
        this.player = newPlayer;
        this.gameOn = true;
        this.gameResult = 0;
        this.reset = true;
    }

    showGame(e){
        if (e.key === "Enter" && this.reset) {
            if (this.canvas.style.display === "none") {
                this.canvas.style.display = "block";
                this.successMessage.style.display = "block";
                this.failMessage.style.display = "block";
                this.genMessage.style.display = "block";
                this.background.style.background = "rgba(158, 153, 153, 0.7)";
            } 
        }
    }

}





