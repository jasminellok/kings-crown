import Player from './player';
import Broadsword from './broadswords';

export default class MiniGame {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.bgSrc = "src/images/background.png";
        this.bgImg = new Image();
        this.cWidth = canvas.width;
        this.cHeight = canvas.height;
        
        this.weaponCache = [];
        this.player = new Player(this.cWidth, canvas.height);
        this.gameOn = false;
        
        this.generateWeaponCache = this.generateWeaponCache.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.animateGame = this.animateGame.bind(this);
        this.registerPlayerMoves = this.registerPlayerMoves.bind(this)
    }
    
    generateWeaponCache() {
        for (let count=0; count < 3; count++) {
            const weapon = new Broadsword(this.cWidth, this.cHeight)
            this.weaponCache.push(weapon)
        }
    }
    
    drawBg() {
        this.bgImg.src = "src/images/background.png";
        this.ctx.drawImage(this.bgImg, 0,0, this.cWidth, this.cHeight);
    }
    
    animateGame() {
        this.ctx.clearRect(0,0,this.cWidth, this.cHeight)
        this.drawBg()
        this.player.drawPlayer(this.ctx)
        this.weaponCache.forEach (weapon => {
            weapon.moveItem(this.ctx,this.cWidth,this.cHeight)
        })
        requestAnimationFrame(this.animateGame);
    }
    
    registerPlayerMoves(e) {
        this.player.movePlayer(this.cWidth,this.cHeight,e);
        this.player.drawPlayer(this.ctx)
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
    registerPlayerMoves(e)
});
