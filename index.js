const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function move() {
  // remove last element from currentSnake array
  const tail = currentSnake.pop();
  console.log(tail);
  console.log(currentSnake);
  // remove styling from last element
  squares[tail].classList.remove("snake");
  // add square in direction snake is heading
  currentSnake.unshift(currentSnake[0] + direction);
  console.log(currentSnake);
  // add styling to see it
  squares[currentSnake[0]].classList.add("snake");
}

move();
