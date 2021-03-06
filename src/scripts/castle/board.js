import Room from "./rooms";


export default class Board {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.grid = this.makeGrid(row,col); 
        this.roomMap = {};
        this.roomKeys;

        this.makeGrid = this.makeGrid.bind(this);
        this.validComPos = this.validComPos.bind(this);
        this.validGenPos = this.validGenPos.bind(this);
        this.generateRandCrown = this.generateRandCrown.bind(this);
        this.generateRandCommander = this.generateRandCommander.bind(this);
        this.generateRandQueen = this.generateRandQueen.bind(this);
        this.shuffle = this.shuffle.bind(this);

        this.shuffle(this.row, this.col);
    }

    makeGrid(row, col) {
        const roomKeys = [];
        const grid = []
        for (let i = 0; i < row; i++) {
            grid.push([]);
            for (let j = 0; j < col; j++) {
                grid[i].push(null);
                roomKeys.push([i,j])
            }
        }
        this.roomKeys = roomKeys;
        return grid;
    }

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

    validComPos(crownPos, d) {
        const dRow = crownPos[0] + d[0];
        const dCol = crownPos[1] + d[1];
        if(dRow < 0 || dRow >= this.row || dCol < 0 || dCol >= this.col) {
            return false
        } else {
            return [dRow, dCol] 
        }
    }

    validGenPos(pos) {
        if (this.grid[pos[0]][pos[1]] === null) return true;
        return false
    }

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


    }

    populate(value,pos){
        switch(value) {
        case "prince":
            let prince = new Room("prince", "src/images/prince-walk.png", pos[0], pos[1])
            this.grid[pos[0]][pos[1]] = prince
            break;
        case "guard":
            let guard = new Room("guard", "src/images/guard.png", pos[0], pos[1])
            this.grid[pos[0]][pos[1]] = guard
            break;
        case "maid":
            let maid = new Room("maid", "src/images/maid-rest.png", pos[0], pos[1])
            this.grid[pos[0]][pos[1]] = maid
            break;
        case "storage":
            let storage = new Room("storage", "src/images/storage.png", pos[0], pos[1])
            this.grid[pos[0]][pos[1]] = storage
            break;
        }
    }



}