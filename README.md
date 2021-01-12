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
### Bonus Features
- [ ] Opening the rooms will have audio effects as well as animation effects

## Technologies
- JS, HTML, CSS

### Potential Challenges
<img src="/src/images/readme-dodge.png"/>
The biggest challenge was having the mini game of dodging hits within the main game of opening the rooms. How this part works is once the player opens the room, it will initiate the mini-game where the player icon will show up on the bottom of a grid and sword icons animations will start to drop at some speed and the player has to use the arrow keys to avoid it and reach the top of the grid.

## Implementation Timeline
### December 7
* Finish dodging hits mini game 

### December 8
* Game logic for rendering the board with randomized rooms (King, Commander, and Queen first)
* Functionality for the rooms (ex: clicking on maid will open another room)
* Adding and reducing life counts 

### December 9
* Splash page with description, rules and instructions
* Connecting minigame and board

### December 10
* CSS and finding/ creating images to use

### December 11
* Finish styling
* Finish README


