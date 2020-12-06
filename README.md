# Kings Crown Game 

## Background and Overview
Kings Crown is a game where your goal as a player is to find the crown. The castle is represeneted by by 15 rooms (3 rows, 5 columns). The king, and his crown, is in one of these rooms. But the kings is not alone, and behind these rooms you may find:
- Queen: The queen is not too far from the king and should be on the same floor as the king
- Knights: You've find a knight and will have to dodge their attacks to avoid getting hurt
- Commander: While exchanging blows, you lose a life point. But you do escape and know that the Commander stays close to the king so the king should be in one of the adjacent rooms
- Maids: Maids will show you other other rooms, some which may allow you to rest and heal up
- Prince: The Prince likes tp play with the knights and he reveals the location of a knight. 
The game ends when the player loses both life points or finds the crown.

## Functionality & MVP
### Main Features
- [ ] A board of 15 rooms
- [ ] There are six types of rooms (Commander, knights, maids, queen, king, prince)
- [ ] Player has two life counts
- [ ] Opening a room with a knight will begin a timmed mini game (doging hits)
### Bonus Features
- [ ] Opening the rooms will have audio effects as well as animation effects

## Technologies
- JS, HTML, CSS, p5.js
### Potential Challenges
The biggest challenge I see is having the mini game of dodging hits within the main game of opening the rooms. How this part will work is once the player opens the room, it will initiate the mini-game where the player icon will show up on the bottom of a grid and sword icons animations will start to drop at some speed and the player has to use the arrow keys to avoid it and reach the top of the grid. I will looking into using canvas / p5.js to do this.

## Wireframe
<img src="/src/images/wireframe.png" width="400" height="300"/>

## Implementation Timeline
### December 7
* Game logic for rendering the board with randomized rooms (King, Commander, and Queen first)
* Functionality for the rooms (ex: clicking on maid will open another room)
* Adding and reducing life counts 

### December 8
* Dodging hits mini game 

### December 9
* Dodging hits mini game finish
* Splash page with description, rules and instructions

### December 10
* CSS and finding/ creating images to use
* Audio and animation effects on rooms and doors 

### December 11
* Finish styling
* Finish README


