const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 9; // Size of the snake and food
let snake = [];
// let score = 0;
snake[0] = { x: 9 * box, y: 9 * box };

let food = {
    x: Math.floor(Math.random() * 15) * box,
    y: Math.floor(Math.random() * 15) * box
};

let score = 0;
let direction;
let game;

// Load the snake head image
const snakeHeadImg = new Image();
snakeHeadImg.src = 'assets/pepe_head.png';

document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

function collision(newHead, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            // Draw the snake head
            ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
        } else {
            ctx.fillStyle = "#9ba8ae";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = "#9ba8ae";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    }

    ctx.fillStyle = "#9ba8ae";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15) * box,
            y: Math.floor(Math.random() * 15) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeX >= canvas.width ||
        snakeY < 0 || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        gameOver();
        return;
    }

    snake.unshift(newHead);

    ctx.fillStyle = "#9ba8ae";
    ctx.font = "20px Arial";
    ctx.fillText(score, 1 * box, 1.6 * box);
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "#9ba8ae";
    ctx.font = "20px Arial";
    ctx.fillText(" $733733", canvas.width / 4, canvas.height / 2 - 20);
    ctx.fillText("    Play", canvas.width / 4, canvas.height / 2 + 10);
    ctx.fillText("Score: " + score, canvas.width / 4, canvas.height / 2 + 40);

    canvas.addEventListener("click", resetGame);d
}

function resetGame() {
    snake = [];
    snake[0] = { x: 8 * box, y: 8 * box };
    food = {
        x: Math.floor(Math.random() * 15) * box,
        y: Math.floor(Math.random() * 15) * box
    };
    score = 0;
    direction = null;
    canvas.removeEventListener("click", resetGame);
    game = setInterval(draw, 100);
}

snakeHeadImg.onload = function() {
    game = setInterval(draw, 100);
}
