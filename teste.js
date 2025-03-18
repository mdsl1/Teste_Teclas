const player = document.getElementById("player");
let positionX = 50;
const speed = 10;
let isJumping = false;
const keysPressed = {}; // Objeto para armazenar as teclas pressionadas

function movePlayer() {
    let nextPositionX = positionX;

    if (keysPressed["ArrowRight"]) {
        nextPositionX += speed;
        player.classList.remove("standBy");
        player.classList.add("walking");
        player.classList.remove("reversed");
    } else if (keysPressed["ArrowLeft"]) {
        nextPositionX -= speed;
        player.classList.remove("standBy");
        player.classList.add("walking");
        player.classList.add("reversed");
    } else {
        player.classList.add("standBy");
        player.classList.remove("walking");
    }

    // Atualiza a posição temporariamente para verificar colisão
    player.style.left = nextPositionX + "px";

    if (!checkCollision()) {
        positionX = nextPositionX; // Move apenas se não houver colisão
    } else {
        player.style.left = positionX + "px"; // Reverte o movimento
    }
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

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacles = document.querySelectorAll(".obstacle");

    for (let obstacle of obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom
        ) {
            return true; // Colisão detectada
        }
    }
    return false;
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
    checkCollision(); // Verifica se o jogador colidiu com o obstáculo
    requestAnimationFrame(gameLoop);
}

// Inicia o loop de movimento
gameLoop();
