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
    this.indicatorHandler
    this.playerColors = ['red', 'blue', 'green', 'pink', 'cyan', 'black', 'orange', 'purple']
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

  // Heading tag for title
  const titleContainer = document.createElement('h1')
  titleContainer.innerText = this.args.title
  container.appendChild(titleContainer)
  
  // Player indicator text
  const indicatorContainer = document.createElement('p')
  indicatorContainer.innerText = `Player ${this.turn}'s turn!`
  indicatorContainer.id = 'indicator'
  container.appendChild(indicatorContainer)

  // Loop board grids
  for (let x = 0; x < this.boardSize; x++) {
    let row = document.createElement("div")
    row.className = "row"
    for (let y = 0; y < this.boardSize; y++) {
      let cell = document.createElement("div")
      cell.className = "grid"
      cell.id = `${this.args.gridName}_${x}${y}`
      cell.innerText = "+"
      cell.onclick = ((a, b) => this.toggle.call(this, a, b)).bind(cell, x, y)
      row.appendChild(cell)
    }
    container.appendChild(row)
  }
  body.appendChild(container)

  // Reset button
  const resetButton = document.createElement("button")
  const resetText = document.createTextNode("Restart")
  resetButton.appendChild(resetText)
  resetButton.className = "reset"
  resetButton.onclick = (() => this.reset.call(this)).bind(resetButton)
  container.appendChild(resetButton)

  // Reference indicator
  this.indicatorHandler = document.getElementById('indicator')
}

// Toggling grids
TicTacToe.prototype.toggle = function (x, y) {
  if (this.turn != 0 && this.playable == true && this.board[x][y] == 0) {
    this.board[x][y] = this.turn
    this.currentMoves++
    this.updateBoard()
    this.indicatorHandler.innerText = `Player ${this.turn}'s turn!`
  } else {
    this.indicatorHandler.innerText = this.playable
      ? "Already Chosen!"
      : "Game Done. Restart."
  }
}

// Reset game
TicTacToe.prototype.reset = function () {
  this.playable = true
  this.turn = 1
  this.currentMoves = 0
  this.indicatorHandler.innerText = `Player ${this.turn}'s turn!`
  this.initGame()
  this.updateBoard()
}

// Update board
TicTacToe.prototype.updateBoard = function () {
  let x, y, grid
  for (x = 0; x < this.boardSize; x++) {
    for (y = 0; y < this.boardSize; y++) {
      grid = document.getElementById(`${this.args.gridName}_${x}${y}`)
      grid.style.background = `linear-gradient(to bottom, ${
        this.playerColors[this.board[x][y] - 1]
      }, #e6e6e6)`
      grid.style.color = "#fff"
      grid.innerText = this.board[x][y]
      if (this.board[x][y] == 0) {
        grid.style.background = ""
        grid.style.color = ""
        grid.innerText = "+"
      }
    }
  }
}
