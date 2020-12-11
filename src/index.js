import "./styles/reset.scss";
import "./styles/index.scss";
import Game from "./scripts/castle/game.js"

const ready = () => {
    let overlayMessages = Array.from(document.getElementsByClassName("overlay"));
    let rooms =  Array.from(document.getElementsByClassName("room"));
    let game = new Game();

    document.addEventListener("life-update", ()=> {
        document.getElementsByClassName('life-count')[0].innerHTML = game.lifeCount;
    })

    document.addEventListener("commander-msg", ()=> {
        const r = game.shownRooms[game.shownRooms.length-1][0];
        const c = game.shownRooms[game.shownRooms.length-1][1];
        let msg = document.getElementsByClassName(`suit-value-[${r},${c}]`)[0];
        msg.innerHTML = "The commander should be always near the king... the crown should be in an adjacent room"
    })



    overlayMessages.forEach(msg => {
        msg.addEventListener('click', () => {
            msg.classList.remove('shown');
            game.newGame();
        })
    })

    rooms.forEach(room => {
        room.addEventListener('click', () => {
            room.setAttribute('id','shown');
            const roomValue = game.openRoom(room);
            if (roomValue) {
                game.specialRooms(roomValue);
            }
            if (game.ckloseGame()) {
                //life === 0 || no more rooms?
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
