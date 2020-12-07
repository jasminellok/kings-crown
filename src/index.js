import "./styles/reset.scss";
import "./styles/index.scss";

let canvas = document.querySelector("canvas");
//console.log(canvas) //being read on browser

canvas.width = 300;
canvas.height = 300;

let ctx = canvas.getContext('2d'); //accss to canvas 2d methods

const player = new Image();
player.src = "src/images/thief48_64.png";
const bg = new Image();
bg.src = "src/images/background.png";

let playerXPos = 100;
let playerYPos = 100;


function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.drawImage(bg, 0,0, canvas.width, canvas.height); //background
    ctx.drawImage(player, 48, 128, 48, 64, playerXPos, playerYPos, 70, 90); //player src pos, canvas pos
    requestAnimationFrame(animate);
}

animate();

const speed = 10;
window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case "ArrowRight":
            if (playerXPos < (canvas.width-70)) {playerXPos += speed};
            animate();
            break;
        case "ArrowLeft":
            if (playerXPos > 1) {playerXPos -= speed};
            animate();
            break;
        case "ArrowUp":
            if (playerYPos > 1) {playerYPos -= speed};
            animate();
            break;
        case "ArrowDown":
            if (playerYPos < (canvas.height-100)) {playerYPos += speed};
            animate();
            break;
    }
});