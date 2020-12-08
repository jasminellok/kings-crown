export default class Player {
    constructor(cWidth,cHeight) {
        this.srcX = 48; //3rd rw
        this.srcY = 128; //2nd col
        this.width = 48;
        this.height = 64;
        this.speed = 10;        
        this.xPos = (cWidth/2)-this.width/2;
        this.yPos = cHeight-this.height;
        this.radius = this.height/2;
        this.playerImg = "src/images/thief48_64.png";
        this.speed = 10;
        this.drawPlayer = this.drawPlayer.bind(this);
        //this.animatePlayer = this.animatePlayer.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
    }

    drawPlayer(ctx) {
        //player src pos, canvas pos
        const player = new Image();
        player.src = this.playerImg;
        ctx.drawImage(
            player, this.srcX, this.srcY, this.width, this.height, 
            this.xPos, this.yPos, this.width, this.height); 
    }
    
    movePlayer(cWidth,cHeight,e) {
        switch (e.key) {
        case "ArrowRight":
            if (this.xPos < (cWidth-this.width)) {this.xPos += this.speed};
            break;
        case "ArrowLeft":
            if (this.xPos > -10) {this.xPos -= this.speed};
            break;
        case "ArrowUp":
            if (this.yPos > -30) {this.yPos -= this.speed};
            break;
        case "ArrowDown":
            if (this.yPos < (cHeight-this.height)) {this.yPos += this.speed};
            break;
        }
    }

}