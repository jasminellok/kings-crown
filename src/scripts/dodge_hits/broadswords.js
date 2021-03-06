export default class Broadsword {
    constructor(cWidth,cHeight, difficulty) {
        this.srcX = 0; //3rd rw
        this.srcY = 0; //2nd col
        this.width = 30;
        this.height = 30;   
        this.xPos = Math.floor(Math.random()* (cWidth));
        this.yPos = Math.floor(Math.random()* cHeight/6);
        this.itemImg = "src/images/broadsword.png";
        this.xDir = (Math.random() > .5) ? -1 : 1;
        this.yDir = (Math.random() > .5) ? -1 : 1;
        this.xVel = ((Math.ceil(Math.random()* difficulty)+2) + difficulty) * this.xDir;
        this.yVel = this.xVel * this.yDir;
        this.drawItem = this.drawItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
    }

    drawItem(ctx) {
        const item = new Image();
        item.src = this.itemImg;
        ctx.drawImage(
            item, this.srcX, this.srcY, this.width, this.height, 
            this.xPos, this.yPos, (this.width), (this.height)); 
    }

    moveItem(ctx, cWidth,cHeight) {
        if ((this.xPos + this.xVel) >= (cWidth - this.width)) {
            this.xVel = - (Math.abs(this.xVel));
        } else if (this.xPos - this.xVel <= 0) {
            this.xVel = Math.abs(this.xVel);
        }

        if ((this.yPos + this.yVel) >= (cHeight - this.height)) {
            this.yVel = - (Math.abs(this.yVel));
        } else if (this.yPos - this.yVel <= 0) {
            this.yVel = Math.abs(this.yVel);
        }

        this.xPos += this.xVel;
        this.yPos += this.yVel;
        this.drawItem(ctx)
    }
}