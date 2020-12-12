import "./styles/reset.scss";
import "./styles/index.scss";
import Game from "./scripts/castle/game.js"

const ready = () => {
    let overlayMessages = Array.from(document.getElementsByClassName("overlay"));
    let rooms =  Array.from(document.getElementsByClassName("room"));
    let game;

    document.addEventListener("life-update", ()=> {
        document.getElementsByClassName('life-count')[0].innerHTML = game.lifeCount;
    })

    document.addEventListener("commander-msg", ()=> {
        const r = game.currRoom.r;
        const c = game.currRoom.c;
        let msg = document.getElementsByClassName(`suit-value-[${r},${c}]`)[0];
        msg.innerHTML = "The commander should be always near the king... the crown should be in an adjacent room"
    })

    overlayMessages.forEach(msg => {
        msg.addEventListener('click', () => {
            rooms.forEach(room => {
                room.setAttribute('id','hidden')
            })
            game = new Game();
            game.newGame();
            msg.classList.remove('shown');
        })
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

    //need a close door/ restart thing
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready())
} else {
    ready();
}
