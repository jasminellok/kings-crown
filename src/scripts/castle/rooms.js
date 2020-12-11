export default class Room {
    constructor(value, url, r,c) {
        this.canvas = document.getElementById(`${r}-${c}`); //feed num
        this.ctx = this.canvas.getContext('2d'); 
        this.canvas.width = 60;
        this.canvas.height = 100;

        this.value = value;
        this.width = 60;
        this.height = 100;
        this.suitImg = url;
        this.suitValue = document.getElementsByClassName(`suit-value-[${r},${c}]`)[0];

        this.drawSuit = this.drawSuit.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
    }

    drawSuit() {
        const suit = new Image();
        suit.src = this.suitImg;
        suit.onload = () => {
            this.ctx.drawImage(
            suit, 0, 0, this.width, this.height, 
            0, 0, this.canvas.width, this.canvas.height); 
        }

    }

    displayMessage() {
        switch(this.value) {
            case "crown":
                this.suitValue.innerHTML = "You found the crown!"
                break;
            case "commander":
                this.suitValue.innerHTML = "You've been spotted by the Commander!! Prepare to run fast in 3 seconds!"
                break;
            case "queen":
                this.suitValue.innerHTML = "You've spotted the Queen. The King should be on the same floor (level)."
                break;
            case "prince":
                this.suitValue.innerHTML = "The Prince is yelling for his guards... You found a location of a guard."
                break;
            case "guard":
                this.suitValue.innerHTML = "You've been spotted by a guard! Prepare to run in 3 seconds!"
                break;
            case "maid":
                this.suitValue.innerHTML = "You found a maid cleaning..."
                break;
            case "storage":
                this.suitValue.innerHTML = "You found a storage room with supplies. You rest up and gain a life."
                break;
        }

    }

}