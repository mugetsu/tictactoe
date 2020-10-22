# tictactoe
dynamic board and player tictactoe game

## Optimization
- Remove unnecessary third-party dependencies (jQuery, Bootstrap)
- Removed unnecessary css, only use what's needed for the page
- Removed unnecessary js, use native js
- Wording like `times` changes depending on actual score value
- Instead of a static game board, created a loop to construct the game board
- Configurable game settings

## Usage
```js
const Board = new TicTacToe({
    title: 'Tic Tac Toe',
    boardSize: 3,
    movesToWin: 3,
    players: 2,
    gridName: 'Grid'
})
```

`title` set title heading for the game
`boardSize` defines the board size (odd numbers)
`movesToWin` defines winning criteria (e.g. 3 in a row to win)
`players` number of players
`gridName` name for a grid instance
