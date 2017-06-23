/* jshint esversion: 6 */
const timer = require('./timer');

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let imgsnot = ['img/play-button.png', 'img/stop-button.png'];
let play = false;

module.exports = {
  executarAoParar(curso, tempo, botaoPlay) {
    if(play) {
      timer.parar(curso);
      play = false;
      imgs = imgs.reverse();
      botaoPlay.src = imgs[0];
      this.exibeNotificacao(`O curso ${curso} parado`);

    }
  },
  executarAoIniciar(curso, tempo, botaoPlay) {
    timer.iniciar(tempo);
    play = true;
    imgs = imgs.reverse();
    botaoPlay.src = imgs[0];
    this.exibeNotificacao(`O curso ${curso} iniciado`);
  },
  exibeNotificacao(msg) {
    new Notification('Alura Timer ', {
      body: msg,
      icon: imgsnot[0]
    });
  },
  executar(curso, tempo, botaoPlay) {
    if(play) {
      this.executarAoParar(curso, tempo, botaoPlay);
    } else {
      this.executarAoIniciar(curso, tempo, botaoPlay);
    }
  }
};
