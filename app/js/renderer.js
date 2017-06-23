/* jshint esversion: 6 */
const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');
const controle = require('./controle');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {

    let cursos = data.pegaNomeDosCursos();
    if(cursos.length > 0) {
      curso.textContent = cursos[0];
      data.pegaDadosCurso(cursos[0])
        .then(dados => tempo.textContent = dados.tempo)
        .catch(err => console.log(err));
    }

};

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

/*let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;*/
botaoPlay.addEventListener('click', () => {
  if(curso.textContent) {
    controle.executar(curso.textContent, tempo, botaoPlay);
    /*if(play) {
      timer.parar(curso.textContent);
      play = false;
      new Notification('Alura Timer ', {
        body: `O curso ${curso.textContent} parado`,
        icon: 'img/stop-button.png'
      });
    } else {
      timer.iniciar(tempo);
      play = true;
      new Notification('Alura Timer ', {
        body: `O curso ${curso.textContent} iniciado`,
        icon: 'img/play-button.png'
      });
    }
    imgs = imgs.reverse();
    botaoPlay.src = imgs[0];*/
  }
});

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
  controle.executarAoParar(curso.textContent, tempo, botaoPlay);
  data.pegaDadosCurso(nomeCurso)
    .then(dados => tempo.textContent = dados.tempo)
    .catch(err => {
      console.log(err);
      tempo.textContent = "00:00:00";
    });
  curso.textContent = nomeCurso;
});

botaoAdicionar.addEventListener('click', () => {
  let novoCurso = campoAdicionar.value;
  if(novoCurso) {
    controle.executarAoParar(curso.textContent, tempo, botaoPlay);
    curso.textContent = novoCurso;
    tempo.textContent = "00:00:00";
    campoAdicionar.value = "";
    ipcRenderer.send('curso-adicionado', novoCurso);
  }
});

ipcRenderer.on('atalho-iniciar-parar', () => {
  let click = new MouseEvent('click');
  botaoPlay.dispatchEvent(click);
});
