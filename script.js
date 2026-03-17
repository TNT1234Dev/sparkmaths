let sequence = [];
const secret = ['6', 'RCtrl', 'F8', 'w', 'w'];
const vault = document.getElementById('vault');
const gameScreen = document.getElementById('game-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key === 'Control' && e.location === 2) key = 'RCtrl';
    
    if (key === 'Escape') vault.classList.add('hidden'); // PANIC BUTTON
    if (key === 'p' || key === 'P') isPaused = !isPaused; // PAUSE BUTTON

    sequence.push(key);
    if (sequence.length > secret.length) sequence.shift();
    if (JSON.stringify(sequence) === JSON.stringify(secret)) {
        vault.classList.remove('hidden');
    }
});

document.getElementById('confirm-vol').onclick = () => {
    document.getElementById('volume-warning').classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGame();
    gameLoop();
};

// --- FLAPPY BIRD (MATHS JUMPER) LOGIC ---
let birdY = 300; let velocity = 0; let gravity = 0.25; let isPaused = false;
let pipes = []; let score = 0;

function resetGame() {
    birdY = 300; velocity = 0; pipes = []; score = 0;
    pipes.push({ x: 400, gapTop: 200 });
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Numpad5') velocity = -5; // Jump
});

function gameLoop() {
    if (vault.classList.contains('hidden') || isPaused) {
        requestAnimationFrame(gameLoop);
        return;
    }

    // Physics
    velocity += gravity;
    birdY += velocity;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Bird (Looks like a purple dot/variable)
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    ctx.arc(50, birdY, 12, 0, Math.PI * 2);
    ctx.fill();

    // Draw Pipes (Look like bar charts)
    ctx.fillStyle = '#9ca3af';
    pipes.forEach((pipe, index) => {
        pipe.x -= 2;
        ctx.fillRect(pipe.x, 0, 50, pipe.gapTop); // Top pipe
        ctx.fillRect(pipe.x, pipe.gapTop + 150, 50, canvas.height); // Bottom pipe

        if (pipe.x === 50) score++;
        if (pipe.x < -50) pipes.splice(index, 1);
    });

    if (pipes.length < 2 && pipes[pipes.length-1].x < 200) {
        pipes.push({ x: 400, gapTop: Math.random() * 300 + 50 });
    }

    // Death Check
    if (birdY > canvas.height || birdY < 0) resetGame();

    // Score (Labelled as Accuracy)
    ctx.fillStyle = '#4c1d95';
    ctx.font = 'bold 16px DM Sans';
    ctx.fillText('Accuracy: ' + score + '%', 20, 30);

    requestAnimationFrame(gameLoop);
}
