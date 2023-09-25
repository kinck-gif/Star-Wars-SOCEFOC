document.addEventListener("DOMContentLoaded", function () {
    // Botão "luke skywalker"
    const lukeButton = document.getElementById("luke-button");
    const lukeText = document.getElementById("luke-text");

    lukeButton.addEventListener("click", function () {
        // Mostrar o texto centralizado abaixo do botão
        lukeText.classList.toggle("hidden-text");
    });
});

const videoPlayer = document.getElementById('video-player');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const videoPaths = [
    'Videos/meme1.mp4',
    'Videos/meme4.mp4',
    'Videos/meme5.mp4'
];

let currentVideoIndex = 0;

function loadVideo() {
    videoPlayer.src = videoPaths[currentVideoIndex];
}

loadVideo();

leftArrow.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videoPaths.length) % videoPaths.length;
    loadVideo();
});

rightArrow.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoPaths.length;
    loadVideo();
});

// Adicionando funcionalidade de setas do lado do vídeo
const videoContainer = document.querySelector('.video-frame');

videoContainer.addEventListener('click', (e) => {
    const xPos = e.clientX - videoContainer.getBoundingClientRect().left;
    const width = videoContainer.clientWidth;

    if (xPos < width / 2) {
        // Clique à esquerda do vídeo (seta esquerda)
        currentVideoIndex = (currentVideoIndex - 1 + videoPaths.length) % videoPaths.length;
    } else {
        // Clique à direita do vídeo (seta direita)
        currentVideoIndex = (currentVideoIndex + 1) % videoPaths.length;
    }

    loadVideo();
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    if (e.code === 'ArrowLeft') {
        // Setas para a esquerda: retroceder para o vídeo anterior
        currentVideoIndex = (currentVideoIndex - 1 + videoPaths.length) % videoPaths.length;
        loadVideo();
    }

    if (e.code === 'ArrowRight') {
        // Setas para a direita: avançar para o próximo vídeo
        currentVideoIndex = (currentVideoIndex + 1) % videoPaths.length;
        loadVideo();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const homeLink = document.getElementById("home-link");
    
    homeLink.addEventListener("click", function (e) {
        e.preventDefault(); // Impede que o link recarregue a página
        location.reload(); // Recarrega a página
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const namesContainer = document.getElementById('names');
    const wordSlider = document.getElementById('word-slider');

    const data = [
        { name: 'Anakin Skywalker', icon: 'Imagens/darth-vader-icon.png', phrase: 'Eu sou seu pai!', colorClass: 'anakin' },
        { name: 'Padmé Amidala', icon: 'Imagens/padme_amidala-icon.png', phrase: 'Amor não é algo que podemos ignorar.', colorClass: 'padmé' },
        { name: 'Luke Skywalker', icon: 'Imagens/luke-icon.png', phrase: 'Que a Força esteja com você.', colorClass: 'luke' },
        { name: 'Leia Organa', icon: 'Imagens/leia-icon.png', phrase: 'A Força estará com você, sempre.', colorClass: 'leia' },
        { name: 'Han Solo', icon: 'Imagens/han-solo-icon.webp', phrase: 'É verdade, tudo. Tudo.', colorClass: 'han' },
        { name: 'Ben Solo', icon: 'Imagens/kylo-ren-icon.png', phrase: 'Nunca será como antes.', colorClass: 'ben'},
    ];

    data.forEach(item => {
        const nameCard = document.createElement('div');
        nameCard.classList.add('name-card');
    
        const icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = item.icon;
    
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = item.name;
    
        // Adicione a classe de cor correspondente à caixa de nome
        const nameBox = document.createElement('div');
        nameBox.classList.add('name-box');
        nameBox.classList.add(item.colorClass); // Adicione a classe de cor
    
        nameBox.appendChild(name);
    
        nameCard.appendChild(icon);
        nameCard.appendChild(nameBox);
        namesContainer.appendChild(nameCard);

        // Criar a caixa de palavras para cada nome
        const wordBox = document.createElement('div');
        wordBox.classList.add('word-box');
        wordBox.textContent = item.phrase || ''; // Adicione a frase se disponível
        wordSlider.appendChild(wordBox);

        // Evento de clique para mostrar/ocultar a caixa de palavras
        nameBox.addEventListener('click', () => {
            // Ocultar todas as caixas de palavras
            const allWordBoxes = document.querySelectorAll('.word-box');
            allWordBoxes.forEach(box => {
                box.style.display = 'none';
            });

            // Mostrar a caixa de palavras correspondente ao nome clicado
            wordBox.style.display = 'block';

            // Alterar a cor de fundo da caixa de palavras
            const colorClass = item.colorClass || ''; // Classe de cor correspondente
            wordBox.style.backgroundColor = getComputedStyle(nameBox).getPropertyValue('background-color');
        });
    });
});

let contador = 1;

setInterval( function(){
    document.getElementById('slide' + contador).checked = true;
    contador++;

    if(counter > 5 ) {
        contador = 1;
    }
}, 3000 );

// Elementos de áudio para cada música
const imperialMarchAudio = new Audio('music/Star Wars- The Imperial March.mp3');
const starWarsThemeAudio = new Audio('music/Star Wars Music.mp3');
const cantinaBandAudio = new Audio('music/cantina band.mp3');

// Funções para tocar e parar a música
function playImperialMarch() {
    stopAllMusic(); // Pare todas as músicas antes de tocar a desejada
    imperialMarchAudio.play();
}

function playStarWarsTheme() {
    stopAllMusic();
    starWarsThemeAudio.play();
}

function playCantinaBand() {
    stopAllMusic();
    cantinaBandAudio.play();
}

function stopAllMusic() {
    imperialMarchAudio.pause();
    imperialMarchAudio.currentTime = 0;
    starWarsThemeAudio.pause();
    starWarsThemeAudio.currentTime = 0;
    cantinaBandAudio.pause();
    cantinaBandAudio.currentTime = 0;
}

// Event listeners para os botões
document.getElementById('imperial-march-button').addEventListener('click', playImperialMarch);
document.getElementById('star-wars-theme-button').addEventListener('click', playStarWarsTheme);
document.getElementById('cantina-band-button').addEventListener('click', playCantinaBand);

