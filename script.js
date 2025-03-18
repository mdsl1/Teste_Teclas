const player = document.getElementById("player");
let positionX = 50;
const speed = 10;
let isJumping = false;
const keysPressed = {}; // Objeto para armazenar as teclas pressionadas

function movePlayer() {
    if (keysPressed["ArrowRight"]) {
        positionX += speed;
        player.classList.remove("standBy");
        player.classList.add("walking");
        player.classList.remove("reversed");
    } else if (keysPressed["ArrowLeft"]) {
        positionX -= speed;
        player.classList.remove("standBy");
        player.classList.add("walking");
        player.classList.add("reversed");
    } else {
        player.classList.add("standBy");
        player.classList.remove("walking");
    }
    player.style.left = positionX + "px";
}

function jumpPlayer() {
    if (!isJumping) {
        isJumping = true;
        
        if (player.classList.contains("reversed")) {
            player.classList.add("reversedJump");
        }
        else{
            player.classList.add("jumping");
        }
        setTimeout(() => {
            isJumping = false;
            player.classList.remove("jumping");
            player.classList.remove("reversedJump");
        }, 600); // Tempo do pulo
    }
}

// Evento para detectar quando uma tecla é pressionada
document.addEventListener("keydown", function (event) {
    keysPressed[event.key] = true; // Marca a tecla como pressionada

    if (event.key === "ArrowUp") {
        jumpPlayer();
    }
});

// Evento para detectar quando uma tecla é solta
document.addEventListener("keyup", function (event) {
    delete keysPressed[event.key]; // Remove a tecla do objeto quando solta
});

// Atualiza o movimento continuamente
function gameLoop() {
    movePlayer();
    requestAnimationFrame(gameLoop);
}

// Inicia o loop de movimento
gameLoop();
