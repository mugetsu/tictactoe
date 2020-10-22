class TicTacToe {
  constructor(customArgs) {
    this.args = {
      title: "Tic Tac Toe", // game title
      movesToWin: 3, // defines winning criteria (eg: 3 in a row to win)
      boardSize: 3, // odd numbers only
      players: 2, // number of players
      gridName: "grid", // grid instance name
    }
    this.args = Object.assign(this.args, customArgs) // merge custom and default args
    this.turn = 1 // indicate who's turn is it
    this.playable = true // if game is playable
    this.currentMoves = 0 // moves made
    this.board // grid container
    this.boardSize
    this.totalMoves // available moves
    this.movesToWin
    this.initGame()
    this.buildBoard()
  }
}

// Initialize game configurations
TicTacToe.prototype.initGame = function () {
  let size = this.args.boardSize
  let movesToWin = this.args.movesToWin
  let players = this.args.players
  let arr = new Array(),
    x,
    y
  if (size < 3 || size % 2 !== 0) {
    for (x = 0; x < size; x++) {
      arr[x] = new Array()
      for (y = 0; y < size; y++) {
        arr[x][y] = 0
      }
    }
    this.boardSize = size
    this.board = arr.slice(0)
    this.totalMoves = size * size
  } else {
    console.log("Invalid board dimension.")
    return
  }
  if (movesToWin > size) {
    console.log("movesToWin must not be lower than boardSize.")
    return
  } else {
    this.movesToWin = movesToWin
  }

  if (players > size) {
    console.log(
      `Players ${
        size + 1
      } and above does not have any chances to win! Max players: ${size}`
    )
    return
  }
}

// Build board game
TicTacToe.prototype.buildBoard = function () {
  let container
  let body = document.body

  // Grid container
  container = document.createElement("div")
  container.id = "tic-tac-toe"
  container.classList.add("container")
  container.style.width = `${this.boardSize * 100 + 30}px`

  // Loop board grids
  for (let x = 0; x < this.boardSize; x++) {
    let row = document.createElement("div")
    row.className = "row"
    for (let y = 0; y < this.boardSize; y++) {
      let cell = document.createElement("div")
      cell.className = "grid"
      cell.id = `${this.args.gridName}_${x}${y}`
      cell.innerText = "+"
      row.appendChild(cell)
    }
    container.appendChild(row)
  }
  body.appendChild(container)
}
