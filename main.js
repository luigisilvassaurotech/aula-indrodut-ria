// Selecao de elementos
const mario = document.QuerySelector(.mario)
const pipe = document.QuerySelector(.pipe)
const startButton = document.QuerySelector(.startButton)
const restartButton = document.QuerySelector(.restartButton)
const gameOver = document.QuerySelector(.gameOver)
// Definicao de audio
const audioStart = new audio('soung/audio_theme.mp3')
// variaveis de controle de jogo
let gameInternal = null
// funcao para iniciar o jogo
const startGame = () => {
    pipe.classList.add('pipe-animation');
    startButton.style.display = 'none'
     gameOver.style.display = 'none'
     audioStart.currentTime = 0;
     audioStart.play();
      if(gameInternal) {
        gameInterval.setInterval(gameLoop, 10);
      }
};