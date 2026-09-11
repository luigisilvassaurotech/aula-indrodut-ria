// ===== SELEÇÃO DE ELEMENTOS DO HTML =====
// Estes elementos são selecionados do DOM para serem manipulados pelo JavaScript
const mario = document.querySelector('.mario');
// Seleciona a imagem do Mario que será o personagem jogável
const pipe = document.querySelector('.pipe');
// Seleciona a imagem do cano que será o obstáculo do jogo
const startButton = document.querySelector('.start');
// Seleciona o botão de iniciar o jogo
const restartButton = document.querySelector('.restart');
// Seleciona o botão de reiniciar o jogo após Game Over
const gameOver = document.querySelector('.game-over');
// Seleciona o container da tela de Game Over

// ===== DEFINIÇÃO DE ÁUDIOS =====
// Cria novos objetos de áudio que serão tocados em diferentes momentos do jogo
const audioStart = new Audio('./sound/audio_theme.mp3');
// Áudio da música tema que toca durante o jogo
const audioGameOver = new Audio('./sound/audio_gameover.mp3');
// Áudio que toca quando o jogador bate no cano

// ===== VARIÁVEIS DE CONTROLE DO JOGO =====
// ID do intervalo (setInterval) que executa a lógica principal do jogo
let gameInterval = null;

// ===== FUNÇÃO PARA INICIAR O JOGO =====
// Esta função inicia uma nova partida do jogo
const startGame = () => {
  // Adiciona a animação do cano que faz ele se mover da direita para a esquerda
  pipe.classList.add('pipe-animation');
  
  // Oculta o botão de iniciar para evitar cliques acidentais
  startButton.style.display = 'none';
  
  // Oculta a tela de Game Over se ela estava visível (do jogo anterior)
  gameOver.style.display = 'none';

  // Reinicia o áudio do tema para começar do início
  audioStart.currentTime = 0;
  
  // Inicia a reprodução da música tema
  audioStart.play();

  // Verifica se o intervalo do jogo já não está rodando
  if (!gameInterval) {
    // Cria um intervalo que executa a função gameLoop a cada 10 milissegundos
    // Isso atualiza a detecção de colisão continuamente
    gameInterval = setInterval(gameLoop, 10);
  }
};

// ===== FUNÇÃO PARA REINICIAR O JOGO =====
// Esta função reinicia o jogo após uma colisão com o cano
const restartGame = () => {
  // Adiciona a animação do cano novamente
  pipe.classList.add('pipe-animation');
  
  // Remove a posição esquerda do cano (se havia sido definida durante a colisão)
  pipe.style.left = '';
  
  // Define o cano para iniciar da direita novamente
  pipe.style.right = '0';

  // Muda a imagem do Mario de volta para a animação normal (não a de morte)
  mario.src = './img/mario.gif';
  
  // Redefine o tamanho do Mario para o tamanho normal
  mario.style.width = '150px';
  
  // Posiciona o Mario de volta ao chão
  mario.style.bottom = '0';
  
  // Remove a margem esquerda do Mario (se havia sido definida durante a colisão)
  mario.style.marginLeft = '';

  // Oculta a tela de Game Over
  gameOver.style.display = 'none';
  
  // Oculta o botão de iniciar
  startButton.style.display = 'none';

  // Para o áudio de Game Over se ele estava tocando
  audioGameOver.pause();
  
  // Reinicia o áudio de Game Over
  audioGameOver.currentTime = 0;
  
  // Reinicia a música tema
  audioStart.currentTime = 0;
  
  // Inicia a reprodução da música tema
  audioStart.play();

  // Verifica se o intervalo do jogo já não está rodando
  if (!gameInterval) {
    // Cria um novo intervalo para continuar detectando colisões
    gameInterval = setInterval(gameLoop, 10);
  }
};

// ===== FUNÇÃO PARA FAZER O MARIO PULAR =====
// Esta função executa a animação de pulo do Mario
const jump = () => {
  // Verifica se o Mario já está pulando para evitar pulos múltiplos
  if (mario.classList.contains('jump')) return;

  // Adiciona a classe 'jump' que ativa a animação de pulo via CSS
  mario.classList.add('jump');
  
  // Usa setTimeout para remover a classe de pulo após 800 milissegundos
  // (quando a animação de pulo termina)
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
};

// ===== FUNÇÃO PRINCIPAL DO JOGO (GAME LOOP) =====
// Esta função é executada continuamente para verificar colisões e controlar o jogo
const gameLoop = () => {
  // Obtém a posição horizontal atual do cano (distância da esquerda)
  const pipePosition = pipe.offsetLeft;
  
  // Obtém a posição vertical atual do Mario (altura do chão em pixels)
  const marioPosition = parseInt(window.getComputedStyle(mario).bottom, 10);

  // Verifica se houve colisão entre Mario e o cano
  // Condições: o cano deve estar próximo ao Mario (pipePosition <= 120)
  // O cano deve estar visível na tela (pipePosition > 0)
  // O Mario não deve estar muito alto (marioPosition < 80 significa que não está pulando o suficiente)
  const hasCollision = pipePosition <= 120 && pipePosition > 0 && marioPosition < 80;

  // Se ocorreu uma colisão, o jogo termina
  if (hasCollision) {
    // Remove a animação do cano para congelá-lo na posição de colisão
    pipe.classList.remove('pipe-animation');
    
    // Define a posição esquerda do cano com a posição atual
    pipe.style.left = `${pipePosition}px`;

    // Remove a classe de pulo do Mario para pará-lo no ar
    mario.classList.remove('jump');
    
    // Define a posição vertical do Mario onde ocorreu a colisão
    mario.style.bottom = `${marioPosition}px`;
    
    // Muda a imagem do Mario para a imagem de morte/colisão
    mario.src = './img/game-over.png';
    
    // Redimensiona o Mario para o tamanho menor (aparência de morte)
    mario.style.width = '80px';
    
    // Adiciona uma margem esquerda para centralizar a imagem de morte
    mario.style.marginLeft = '50px';

    // Para a reprodução da música tema
    audioStart.pause();
    
    // Reinicia o áudio de Game Over
    audioGameOver.currentTime = 0;
    
    // Toca o áudio de Game Over
    audioGameOver.play();

    // Para o áudio de Game Over após 7 segundos (duração do áudio)
    setTimeout(() => {
      audioGameOver.pause();
    }, 7000);

    // Mostra a tela de Game Over
    gameOver.style.display = 'flex';
    
    // Para o intervalo do jogo
    clearInterval(gameInterval);
    
    // Define gameInterval como null para indicar que o jogo não está rodando
    gameInterval = null;
  }
};

// ===== ADICIONAR EVENT LISTENERS (EVENTOS) =====
// Estes listeners aguardam por interações do usuário

// Evento de clique no botão de iniciar
startButton.addEventListener('click', startGame);
// Quando clicado, inicia o jogo

// Evento de clique no botão de reiniciar
restartButton.addEventListener('click', restartGame);
// Quando clicado, reinicia o jogo após Game Over

// ===== EVENTOS DE TECLADO =====
// Detecta quando o usuário pressiona uma tecla
document.addEventListener('keydown', e => {
  // Se o usuário pressionar a barra de espaço, faz o Mario pular
  if (e.key === ' ') jump();
  
  // Se o usuário pressionar Enter, inicia o jogo
  if (e.key === 'Enter') startGame();
});

// ===== EVENTO DE TOQUE (MOBILE) =====
// Detecta quando o usuário toca a tela em um dispositivo móvel
document.addEventListener('touchstart', e => {
  // Se houver pelo menos um toque, faz o Mario pular
  if (e.touches.length) jump();
});