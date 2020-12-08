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
        this.message = document.getElementsByClassName('canvas-message')[0];
        
        this.weaponCache = [];
        this.player = new Player(this.cWidth, canvas.height);
        this.gameOn = true;
        this.gameResult = 0;
        
        this.generateWeaponCache = this.generateWeaponCache.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.registerPlayerMoves = this.registerPlayerMoves.bind(this);
        this.animateGame = this.animateGame.bind(this);
        this.success = this.success.bind(this);
        this.ckCollision = this.ckCollision.bind(this);
    }

    generateWeaponCache() {
        for (let count=0; count < Math.ceil(Math.random()*4); count++) {
            const weapon = new Broadsword(this.cWidth, this.cHeight)
            this.weaponCache.push(weapon)
        }
    }
    
    drawBg() {
        this.bgImg.src = "src/images/background.png";
        this.ctx.drawImage(this.bgImg, 0,0, this.cWidth, this.cHeight);
        this.canvas.style.display = "block"
    }
    
    registerPlayerMoves(e) {
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
    
    animateGame() {
        this.ctx.clearRect(0,0,this.cWidth, this.cHeight)  
        this.drawBg()
        this.player.drawPlayer(this.ctx)
        this.weaponCache.forEach (weapon => {
            weapon.moveItem(this.ctx,this.cWidth,this.cHeight)
            this.ckCollision(weapon)
        })
        if (this.success()){

        }
        if (this.gameOn) requestAnimationFrame(this.animateGame);
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
}


let canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 300;

let dodgeHits = new MiniGame(canvas)
dodgeHits.generateWeaponCache();
dodgeHits.animateGame()

window.addEventListener('keydown', function(e) {
    e.preventDefault()
    dodgeHits.registerPlayerMoves(e)
});

