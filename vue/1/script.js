const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];

let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
/**
 *  отвечает за направление движения змейки
 */
let direction = 'right';
/**
 * отвечает за скорость движения змейки
 */
let speed = 800;

function initializeGameBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cells.push(cell);
      gameBoard.appendChild(cell);
    }
  }
}

function render() {
  cells.forEach((cell) => cell.classList.remove('snake', 'food'));

  snake.forEach((segment) => {
    const index = segment.x + segment.y * boardSize;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.x + food.y * boardSize;
  cells[foodIndex].classList.add('food');
}

function update() {
  const head = Object.assign({}, snake[0]);

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    resetGame();
    return;
  }

  if (isCollisionWithSelf(head)) {
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    generateFood();
  } else {
    snake.pop();
    snake.unshift(head);
  }
}

function isCollisionWithSelf(head) {
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = 'right';
  generateFood();
  updateScore(snake.length);
}

initializeGameBoard();

function gameLoop() {
  update();
  render();
  updateScore(snake.length);
  setTimeout(gameLoop, speed);
}

const moveUsingKeydown = (event) => {
  switch(event.key) {
    case 'ArrowLeft':
      direction = 'left'; 
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'r':
    case 'R': 
      resetGame();
      break;
  }
};
document.addEventListener('keydown', moveUsingKeydown);


function setDirection(newDirection) {
  const opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
  };
  
  if (newDirection !== opposites[direction]) {
      direction = newDirection;
  }
}
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

upBtn.addEventListener('click', () => setDirection('up'));
downBtn.addEventListener('click', () => setDirection('down'));
leftBtn.addEventListener('click', () => setDirection('left'));
rightBtn.addEventListener('click', () => setDirection('right'));


document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            setDirection('up');
            break;
        case 'ArrowDown':
            setDirection('down');
            break;
        case 'ArrowLeft':
            setDirection('left');
            break;
        case 'ArrowRight':
            setDirection('right');
            break;
    }
});

const speedInput = document.getElementById('speedInput');

speedInput.addEventListener('change', (e) => {
    const newSpeed = parseInt(e.target.value);
    
    if (newSpeed >= 100 && newSpeed <= 2000) {
        speed = newSpeed;
    } else {
        e.target.value = speed;
    }
});


updateScore(snake.length);
gameLoop();

function updateScore(score) {
  let scoreElm = document.getElementById('score')
  scoreElm.textContent = score
}