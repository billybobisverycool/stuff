const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blocks = [];
const blockSize = 50; // Size of the block

// Player properties
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 60,
    color: 'blue',
    speed: 5,
    gravity: 1,
    jumpStrength: 15,
    velocityY: 0,
    grounded: false
};

// Simple block structure
class Block {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, blockSize, blockSize);
    }
}

// Initialize the world with some blocks
function init() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const block = new Block(i * blockSize, j * blockSize, 'green');
            blocks.push(block);
        }
    }
}

// Handle player movement and physics
function handlePlayerMovement() {
    const keys = {};

    window.addEventListener('keydown', (e) => {
        keys[e.code] = true;
    });
    window.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });

    // Horizontal movement
    if (keys['KeyA']) player.x -= player.speed;
    if (keys['KeyD']) player.x += player.speed;

    // Jumping
    if (keys['Space'] && player.grounded) {
        player.velocityY = -player.jumpStrength;
        player.grounded = false;
    }

    // Apply gravity
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Ground check
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height; // Reset position to ground
        player.velocityY = 0;
        player.grounded = true;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw all blocks
    blocks.forEach(block => block.draw());

    // Draw the player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw player's right hand
    ctx.fillStyle = 'red'; // Hand color
    ctx.fillRect(player.x + player.width, player.y + 10, 10, 10); // Right hand

    handlePlayerMovement();

    requestAnimationFrame(gameLoop); // Loop
}

init();
gameLoop();
