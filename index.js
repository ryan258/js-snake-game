const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

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

function startGame() {
  // remove snake and apple
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");

  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  // readd new score to browser
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApple();
  // readd the class of snake to our new currentSnake
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

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

  // deal with snake's head getting the apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    // remove the apple (class)
    squares[appleIndex].classList.remove("apple");
    // grow snake by one with a class
    squares[tail].classList.add("snake");
    // grow snake array by 1
    currentSnake.push(tail);
    // generate new apple
    generateApple();
    // add 1 to the score
    score++;
    // display score
    scoreDisplay.textContent = score;
    // speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  // add styling to see it
  squares[currentSnake[0]].classList.add("snake");
}

// Let's generate random apples!
function generateApple() {
  do {
    // generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApple();

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
startButton.addEventListener("click", startGame);
