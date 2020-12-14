import "./styles/reset.scss";
import "./styles/index.scss";
import Game from "./scripts/castle/game.js"

const playGame = () => {
    let coverMessages = Array.from(document.getElementsByClassName("cover"));
    let rooms = Array.from(document.getElementsByClassName("room"));
    let game;

    coverMessages.forEach(msg => {
        msg.addEventListener('click', () => {
            rooms.forEach(room => {
                room.setAttribute('id','hidden')
            })
            game = new Game();
            game.newGame();
            msg.classList.remove('shown');
        })
    })

    document.addEventListener("life-update", ()=> {
        document.getElementsByClassName('life-count')[0].innerHTML = game.lifeCount;
    })

    document.addEventListener("commander-msg", ()=> {
        const r = game.currRoom.r;
        const c = game.currRoom.c;
        let msg = document.getElementsByClassName(`suit-value-[${r},${c}]`)[0];
        msg.innerHTML = "The commander should be always near the king... the crown should be in an adjacent room"
    })

    rooms.forEach(room => {
        room.addEventListener('click', () => {
            if (!game.dodgeHits) {
                room.setAttribute('id','shown');
                const roomValue = game.openRoom(room);
                if (roomValue) {
                    game.specialRooms(roomValue);
                }
            }
        })
    })

}

document.addEventListener('DOMContentLoaded', playGame());