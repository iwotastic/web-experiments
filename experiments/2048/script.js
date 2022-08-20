// Declare helper functions
const $ = q => document.querySelector(q)
const rand = (l, u) => Math.floor(Math.random() * (u - l) + l)

// Declare items that can be placed at random with different frequencies
const itemsToPlace = [2, 2, 2, 2, 2, 4, 4, 4, 8]

// Declare default board config, can be chaged later by Ctrl-S
let cols = 4
let rows = 4

// Define per game state
let score = 0
let map = []

// Keep track of high scores
let highScore = 0

const resetMap = () => {
  // Clear map
  map = []

  // Fill with 0s for empty tiles at given map size
  for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < cols; j++) {
      row.push(0)
    }
    map.push(row)
  }
}

const placeRandom = () => {
  // Check for placeability...
  let isPlaceable = false
  map.forEach(r => {
    r.forEach(c => {
      if (c === 0) { // Is this an empty tile?
        isPlaceable = true // Yay, the game ain't over yet!
      }
    })
  })

  if (!isPlaceable) return false // Boo, the game is very much over

  // Come up with an item to place
  const itemToPlace = itemsToPlace[rand(0, itemsToPlace.length)]
  let placed = false

  // Repeat until it is placed
  do {
    let x = rand(0, cols)
    let y = rand(0, rows)
    if (map[x][y] === 0) {
      map[x][y] = itemToPlace
      placed = true
    }
  }while (!placed)

  // Return true, we were able to place...
  return true
}

// Push any updates to map to the visible elements (make the user able to see what's happening)
const displayMap = () => {
  // Display grid...
  $("#container").textContent = "+-------".repeat(cols) + "+\n" + map.map(r => {
    return "|" + r.map(c => {
      return c === 0 ? "" : c // Only display numbers for occupied cells
    }).join("\t|") + "\t|"
  }).join("\n" + "+-------".repeat(cols) + "+\n") + "\n" + "+-------".repeat(cols) + "+" 

  // Display score...
  $("#score").textContent = score

  // Display high score...
  $("#high_score").textContent = highScore
}

// Give the user an empty map with two random blocks
const resetGameState = () => {
  score = 0
  resetMap()
  placeRandom()
  placeRandom()
  displayMap()
}

const placeAndCheckForEnd = () => {
  if (!placeRandom()) { // If we weren't able to place...
    let didMakeNewHishScore = false
    if (score > highScore) {
      highScore = score
      didMakeNewHishScore = true
    }
    // Tell the user and reset
    alert("GAME OVER!\nYour final score was: " + score + (didMakeNewHishScore ? "\n\nYOU ARE A RECORD BREAKER!\nNew high score!" : "\n\nBetter luck next time..."))
    resetGameState()
  }
}

// ,__ Let's get this party started...
// \/  With a new game...
// o   Of 2048!
resetGameState()

const moveLeft = () => {
  map = map.map(r => { // Iterate over rows
    let row = r
    for (let i = 1; i < row.length; i++) { // Go through the row...
      if (row[i] !== 0) { // Is there an occupied cell...
        for (let j = 0; j < i; j++) { // Find left-most cell...
          if (row[j] === 0) { // Fill empty tiles or ...
            row[j] = row[i]
            row[i] = 0
            break;
          }else if (row[j] === row[i] && (row[j + 1] === 0 || j + 1 === i)) { // Merge with like tiles ...
            score += row[i] / 2
            row[j] = row[i] * 2
            row[i] = 0
            break;
          }
        }
      }
    }

    return row
  })

  placeAndCheckForEnd()
  displayMap()
}

const moveRight = () => {
  map = map.map(r => { // Iterate over rows
    let row = r
    for (let i = row.length - 2; i >= 0; i--) { // Go through the row...
      if (row[i] !== 0) { // Is there an occupied cell...
        for (let j = row.length - 1; j > i; j--) { // Find right-most cell...
          if (row[j] === 0) { // Fill empty tiles or ...
            row[j] = row[i]
            row[i] = 0
            break;
          }else if (row[j] === row[i] && (row[j - 1] === 0 || j - 1 === i)) { // Merge with like tiles ...
            score += row[i] / 2
            row[j] = row[i] * 2
            row[i] = 0
            break;
          }
        }
      }
    }

    return row
  })

  placeAndCheckForEnd()
  displayMap()
}

const moveUp = () => {
  for (let c = 0; c < rows; c++) { // Iterate over colums
    for (let r = 1; r < cols; r++) { // Iterate over the column...
      if (map[r][c] !== 0) { // Is there an occupied cell...
        for (let i = 0; i < r; i++) { // Find top-most cell...
          if (map[i][c] === 0) { // Fill empty tiles or...
            map[i][c] = map[r][c]
            map[r][c] = 0
            break;
          }else if (map[i][c] === map[r][c] && (map[i + 1][c] === 0 || i + 1 === r)) { //Merge with like tiles
            score += map[r][c] / 2
            map[i][c] = map[r][c] * 2
            map[r][c] = 0
            break;
          }
        }
      }
    }
  }

  placeAndCheckForEnd()
  displayMap()
}

const moveDown = () => {
  for (let c = rows - 1; c >= 0; c--) { // Iterate over colums
    for (let r = cols - 2; r >= 0; r--) { // Iterate over the column...
      if (map[r][c] !== 0) { // Is there an occupied cell...
        for (let i = cols - 1; i > r; i--) { // Find bottom-most cell...
          if (map[i][c] === 0) { // Fill empty tiles or...
            map[i][c] = map[r][c]
            map[r][c] = 0
            break;
          }else if (map[i][c] === map[r][c] && (map[i - 1][c] === 0 || i - 1 === r)) { //Merge with like tiles
            score += map[r][c] / 2
            map[i][c] = map[r][c] * 2
            map[r][c] = 0
            break;
          }
        }
      }
    }
  }

  placeAndCheckForEnd()
  displayMap()
}

// Bind keyboard listener
$("body").addEventListener("keydown", e => {
  // handle movment ...
  if (e.key === "ArrowLeft") {
    e.preventDefault()
    moveLeft()
  }else if (e.key === "ArrowRight") {
    e.preventDefault()
    moveRight()
  }else if (e.key === "ArrowUp") {
    e.preventDefault()
    moveUp()
  }else if (e.key === "ArrowDown") {
    e.preventDefault()
    moveDown()
  }else if (e.key === "s" && (window.navigator.userAgent.indexOf("Mac") != -1 ? e.metaKey : e.ctrlKey)) {
    // Handle map resize
    e.preventDefault()
    let newRows = parseInt(prompt("How many rows?"))
    while (Number.isNaN(newRows) || newRows < 3) {
      newRows = parseInt(prompt("How many rows?"))
    }
    rows = newRows

    let newCols = parseInt(prompt("How many columns?"))
    while (Number.isNaN(newCols) || newCols < 3) {
      newCols = parseInt(prompt("How many columns?"))
    }
    cols = newCols

    resetGameState()
  }else if (e.key === "Enter" && (window.navigator.userAgent.indexOf("Mac") != -1 ? e.metaKey : e.ctrlKey)) {
    // Handle new game
    e.preventDefault()
    resetGameState()
  }
})