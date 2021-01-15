# Kings Crown Game 
<img src="/src/images/readme.png"/>

## Background and Overview
Welcome to Kings Crown! The goal is to find the crown with your life intact. The castle is represented by 15 rooms (3 rows, 5 columns). The crown is in one of these rooms. But the kings crown is not alone, and behind these rooms you may find:
- Queen: The queen is not too far from the king and should be on the same floor as the king
- Guards: You've find a guard and will have to dodge their attacks to avoid getting hurt
- Commander: Faster and more deadly than the guards, so beware
- Maids: Nothing happens, the maids are just doing their work
- Storage Room: If you find a storage room, luck you can heal up and rest
- Prince: The Prince likes tp play with the guards and he reveals the location of a guard 
The game ends when the player loses both life points or finds the crown.

## Functionality & MVP
### Main Features
- [x] A board of 15 rooms
- [x] There are six types of rooms (Commander, guards, maids, queen, king, prince, storage)
- [x] Player has two life counts
- [x] Opening a room with a knight will begin a mini game (dodging hits)


## Technologies
- JS, HTML, CSS

## Highligt Features and Challenges

### Additional Mini-Game
<img src="/src/images/readme-dodge.png"/>
A special feature for this game was having the mini game of dodging hits within the main game of opening the rooms. How this part works is once the player opens the room, it will initiate the mini-game where the player icon will show up on the bottom of a grid and sword icons animations will start to drop at some speed and the player has to use the arrow keys to avoid it and reach the top of the grid.

### Shuffle Board
To enhance user experience, each new game will shuffle the board so that the room positions are not the same as the previous game. This was particularly challenging because certain rooms have a connection with another room (ex:commander is always adjacent to crown, queen always on same row as crown), so with each shuffle, it must still preserve the relationships. I achieved this with an extensive shuffle method, that would first assign the rooms with the most relationship positions in the board and then shuffle the rest of the rooms and place them randomly on the board.

```jsx
    generateRandCrown(row,col) {
        const r = Math.floor(Math.random() * row);
        const c = Math.floor(Math.random() * col);
        let crown = new Room("crown", "src/images/crown.png", r,c);
        this.grid[r][c] = crown;
        return [r,c];
    }

    generateRandCommander(crownPos) {
        const deltas = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[1,-1],[1,0],[1,1]];
        const possiblePos = [];

        deltas.forEach(d => {
            let add = this.validComPos(crownPos, d);
            if (add) possiblePos.push(add)
        })

        let randI = Math.floor(Math.random() * possiblePos.length);
        let comPos = possiblePos[randI];
        let commander = new Room("commander", "src/images/commander.png", comPos[0],comPos[1]);
        this.grid[comPos[0]][comPos[1]] = commander;
    }

    generateRandQueen(crownRow) {
        const possible = []
        for (let i=0; i < this.col; i++) {
            let pos = [crownRow,i];
            if (this.validGenPos(pos))possible.push(pos);
        }
        let randI = Math.floor(Math.random() * possible.length);
        let qPos = possible[randI];
        let queen = new Room("queen", "src/images/queen.png", qPos[0], qPos[1]);
        this.grid[qPos[0]][qPos[1]] = queen;
    }

    ...

    
    shuffle(row, col) {
    let crownPos = this.generateRandCrown(row,col);
    this.generateRandCommander(crownPos);
    this.generateRandQueen(crownPos[0]);

    let remaining = ["prince", "guard", "guard", "guard", "guard", "guard", "guard",
        "maid", "maid", "maid", "storage", "storage"]

    for (let i = remaining.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }

    this.roomKeys.forEach(room => {
        let i = room[0];
        let j = room[1];
        if (this.grid[i][j] === null) {
            let populateValue = remaining.shift();
            this.populate(populateValue,[i,j]);
        }
        let value = this.grid[i][j].value;
        if (!this.roomMap[value]) this.roomMap[value] = [];
        this.roomMap[value].push([i,j]);
    })

```


