const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const A_KEY = 65;
const D_KEY = 68;
const W_KEY = 87;
const S_KEY = 83;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

let gameRunning = true; // Variável para controlar o estado do jogo

const playerRadius = 15; // Raio da bola do jogador
const triangleWidth = 10; // Largura dos triângulos
const triangleHeight = 20; // Altura dos triângulos

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: "#fff",
    speed: 5, // Velocidade do jogador
};

const enemies = [];
const maxEnemies = 10; // Número máximo de inimigos permitidos na tela
let enemySpawnInterval = 2000; // Intervalo inicial de geração de inimigos (2 segundos)

function createEnemy() {
    if (enemies.length < maxEnemies) {
        const enemy = {
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30,
            color: "#ff0000",
            speed: Math.random() * 2 + 1,
        };
        enemies.push(enemy);
    }

    // Reduza o intervalo de geração de inimigos gradualmente
    if (enemySpawnInterval > 500) {
        enemySpawnInterval -= 100; // Reduza o intervalo em 100 milissegundos a cada novo inimigo
    }
}

setInterval(createEnemy, enemySpawnInterval);

function keyDownHandler(event) {
    if (!gameRunning) return; // Não processe as teclas se o jogo não estiver em execução

    if (event.keyCode === LEFT_ARROW_KEY || event.keyCode === A_KEY) {
        leftPressed = true;
    } else if (event.keyCode === RIGHT_ARROW_KEY || event.keyCode === D_KEY) {
        rightPressed = true;
    } else if (event.keyCode === UP_ARROW_KEY || event.keyCode === W_KEY) {
        upPressed = true;
    } else if (event.keyCode === DOWN_ARROW_KEY || event.keyCode === S_KEY) {
        downPressed = true;
    }
}

function keyUpHandler(event) {
    if (!gameRunning) return; // Não processe as teclas se o jogo não estiver em execução

    if (event.keyCode === LEFT_ARROW_KEY || event.keyCode === A_KEY) {
        leftPressed = false;
    } else if (event.keyCode === RIGHT_ARROW_KEY || event.keyCode === D_KEY) {
        rightPressed = false;
    } else if (event.keyCode === UP_ARROW_KEY || event.keyCode === W_KEY) {
        upPressed = false;
    } else if (event.keyCode === DOWN_ARROW_KEY || event.keyCode === S_KEY) {
        downPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

const backgroundMusic = document.getElementById("backgroundMusic");

function playBackgroundMusic() {
    backgroundMusic.play();
}

function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

playBackgroundMusic(); // Comece a tocar a música quando o jogo inicia

function updatePlayerPosition() {
    if (!gameRunning) return; // Não atualize a posição do jogador se o jogo não estiver em execução

    if (leftPressed && player.x - playerRadius > 0) {
        player.x -= player.speed;
    } else if (rightPressed && player.x + playerRadius < canvas.width) {
        player.x += player.speed;
    }

    if (upPressed && player.y - playerRadius > 0) {
        player.y -= player.speed;
    } else if (downPressed && player.y + playerRadius < canvas.height) {
        player.y += player.speed;
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();

    // Desenhe os triângulos nos lados direito e esquerdo da bola
    ctx.fillStyle = "#ff0000"; // Cor dos triângulos

    // Triângulo direito
    ctx.beginPath();
    ctx.moveTo(player.x + playerRadius, player.y);
    ctx.lineTo(player.x + playerRadius + triangleWidth, player.y - triangleHeight / 2);
    ctx.lineTo(player.x + playerRadius + triangleWidth, player.y + triangleHeight / 2);
    ctx.closePath();
    ctx.fill();

    // Triângulo esquerdo
    ctx.beginPath();
    ctx.moveTo(player.x - playerRadius, player.y);
    ctx.lineTo(player.x - playerRadius - triangleWidth, player.y - triangleHeight / 2);
    ctx.lineTo(player.x - playerRadius - triangleWidth, player.y + triangleHeight / 2);
    ctx.closePath();
    ctx.fill();
}

function gameOver() {
    gameRunning = false;

    // Exiba uma tela de "Game Over" com um botão para reiniciar o jogo
    const gameOverScreen = document.createElement("div");
    gameOverScreen.innerHTML = `
        <div id="gameOverScreen" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center;">
            <div style="text-align: center; color: #fff;">
                <h1>Game Over</h1>
                <button onclick="restartGame()">Começar Novamente</button>
            </div>
        </div>
    `;
    document.body.appendChild(gameOverScreen);

    pauseBackgroundMusic(); // Pausar a música quando o jogo termina
}

function restartGame() {
    // Remova a tela de "Game Over"
    const gameOverScreen = document.getElementById("gameOverScreen");
    if (gameOverScreen) {
        gameOverScreen.remove();
    }

    // Reinicie o jogo redefinindo as variáveis do jogo
    gameRunning = true;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    enemies.length = 0; // Limpe a matriz de inimigos
    enemySpawnInterval = 2000; // Reinicie o intervalo de geração de inimigos

    // Redefina as variáveis de controle de movimento do jogador
    leftPressed = false;
    rightPressed = false;
    upPressed = false;
    downPressed = false;

    playBackgroundMusic(); // Retome a reprodução da música

    // Chame a função update para reiniciar o jogo
    update();
}

function update() {
    if (gameRunning) {
        playBackgroundMusic();
        updatePlayerPosition();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Verificar colisões com inimigos
        enemies.forEach((enemy, index) => {
            if (
                player.x - playerRadius < enemy.x + enemy.width &&
                player.x + playerRadius > enemy.x &&
                player.y - playerRadius < enemy.y + enemy.height &&
                player.y + playerRadius > enemy.y
            ) {
                gameOver();
            }

            if (enemy.y > canvas.height) {
                enemies.splice(index, 1);
            }

            enemy.y += enemy.speed;
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });

        drawPlayer();

        requestAnimationFrame(update);
    }
}

update();
