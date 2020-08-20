const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function move() {
  if (
    // if snake hits bottom wall
    (currentSnake[0] + width >= width * width && direction === width) ||
    // if snake hits right wall
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    // if snake hits left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    // if snake hits top wall
    (currentSnake[0] - width < 0 && direction === -width) ||
    // snake can't go into itself
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerId);
  }

  // remove last element from currentSnake array
  const tail = currentSnake.pop();
  // remove styling from last element
  squares[tail].classList.remove("snake");
  // add square in direction snake is heading
  currentSnake.unshift(currentSnake[0] + direction);
  // add styling to see it
  squares[currentSnake[0]].classList.add("snake");
}

move();

let timerId = setInterval(move, 1000);
// clearInterval(timerId);

// Let's generate random apples!
function generateApples() {
  do {
    // generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApples();

// - Keycodes
// - - 39 / Right Arrow
// - - 38 / Up Arrow
// - - 37 / Left Arrow
// - - 40 / Down Arrow

function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed!");
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log("up pressed!");
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log("left pressed!");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed!");
    direction = width;
  }
}

document.addEventListener("keydown", control);
