export default class Broadsword {
    constructor(cWidth,cHeight) {
        this.srcX = 0; //3rd rw
        this.srcY = 0; //2nd col
        this.width = 30;
        this.height = 30;
        this.speed = 10;        
        this.xPos = Math.random()* (cWidth/2);
        this.yPos = Math.random()* (cHeight/2);
        this.radius = this.height/2;
        this.itemImg = "src/images/broadsword.png";
        this.xVel = (Math.random()*2 > 1) ? 2 : 4;
        this.yVel = this.xVel -1;
        this.drawItem = this.drawItem.bind(this);
        this.moveItem = this.moveItem.bind(this)
    }

    drawItem(ctx) {
        //player src pos, canvas pos
        const item = new Image();
        item.src = this.itemImg;
        ctx.drawImage(
            item, this.srcX, this.srcY, this.width, this.height, 
            this.xPos, this.yPos, (this.width*2), (this.height*2)); 
    }

    moveItem(ctx, canvas) {
        if ((this.xPos > (canvas.width-this.width)) || (this.xPos < (0))) {
            this.xVel = -this.xVel;
        }
        if ((this.yPos > (canvas.height-this.height)) || (this.yPos < (0))) {
            this.yVel = -this.yVel;
        }
        if (this.xPos > 0 && this.yPos<0) {
            this.yVel = this.xVel;
        } else if (this.xPos < 0 && this.yPos>0) {
            this.yVel = this.xVel;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        this.drawItem(ctx)
    }
}