export default class Broadsword {
    constructor(cWidth,cHeight) {
        this.srcX = 0; //3rd rw
        this.srcY = 0; //2nd col
        this.width = 30;
        this.height = 30;   
        this.xPos = Math.floor(Math.random()* (cWidth-100));
        this.yPos = Math.ceil(Math.random()* cHeight/5);
        this.itemImg = "src/images/broadsword.png";
        this.xVel = Math.floor(Math.random()*4) + 1;
        this.yVel = this.xVel;
        this.drawItem = this.drawItem.bind(this);
        this.moveItem = this.moveItem.bind(this)
    }

    drawItem(ctx) {
        //player src pos, canvas pos
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