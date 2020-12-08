//not used
export default class Collision {
    constructor(x,y) {
        this.srcX = 0; 
        this.srcY = 0; 
        this.width = 30;
        this.height = 30;  
        this.xPos = x;
        this.yPos = y;
        this.itemImg = "src/images/explosion.png";
        this.drawItem = this.drawItem.bind(this);
    }

    drawItem(ctx) {
        const item = new Image();
        item.src = this.itemImg;
        ctx.drawImage(
            item, this.srcX, this.srcY, this.width, this.height, 
            this.xPos, this.yPos, (this.width*2), (this.height*2)); 
    }
}