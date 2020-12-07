import Player from './player';
import Broadsword from './broadswords';

let canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 400;
let ctx = canvas.getContext('2d'); //accss to canvas 2d methods
const bg = new Image();
bg.src = "src/images/background.png";


const mc = new Player(canvas.width, canvas.height)

let weaponCache = []
for (let count=0; count < 4; count++) {
    const weapon = new Broadsword(canvas.width, canvas.height)
    weaponCache.push(weapon)
}


function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.drawImage(bg, 0,0, canvas.width, canvas.height); //background
    mc.drawPlayer(ctx)
    weaponCache.forEach (weapon => {
        weapon.moveItem(ctx, canvas)
    })
    requestAnimationFrame(animate);
}

animate();

const speed = 10;
window.addEventListener('keydown', function(e) {
    mc.movePlayer(canvas, e);
    mc.drawPlayer(ctx)
});