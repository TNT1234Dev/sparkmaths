let inputBuffer = [];
const secretCode = ['6', 'RCtrl', 'F8', 'w', 'w'];
const appRoot = document.getElementById('app-root');
const vault = document.getElementById('stealth-vault');

window.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key === 'Control' && e.location === 2) key = 'RCtrl';

    // THE PANIC BUTTON (ESC)
    if (key === 'Escape') {
        vault.classList.add('hidden');
        appRoot.style.filter = 'none';
        return;
    }

    inputBuffer.push(key);
    if (inputBuffer.length > secretCode.length) inputBuffer.shift();

    if (JSON.stringify(inputBuffer) === JSON.stringify(secretCode)) {
        activateVault();
    }
});

function activateVault() {
    vault.classList.remove('hidden');
    // Blur the background just in case a teacher sees the transition
    appRoot.style.filter = 'blur(10px)'; 
}

document.getElementById('start-btn').onclick = () => {
    document.getElementById('volume-check').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    // This is where our first game will launch!
};
