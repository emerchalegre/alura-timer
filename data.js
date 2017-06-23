const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
  salvaDados(curso, tempoEstudado) {
      let path = __dirname + '/data/' + curso + '.json';

      if(fs.existsSync(path)) {
        this.adicionaTempoAoCurso(path, tempoEstudado);
      } else {
        this.criaArquivoDeCurso(path, {});
        this.adicionaTempoAoCurso(path, tempoEstudado);
      }
  },
  adicionaTempoAoCurso(path, tempoEstudado) {
    let dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempoEstudado
    };

    jsonfile.writeFile(path, dados, {spaces: 2})
        .then(() => console.log("Tempo salvo com sucesso!!"))
        .catch(err => console.log(err));
  },
  criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
      return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
                .then(() => console.log("Arquivo Criado"))
                .catch(err => console.log(err) );
  },
  pegaDadosCurso(curso) {
    let path = __dirname + '/data/' + curso + '.json';
    return jsonfile.readFile(path);
  },
  pegaNomeDosCursos() {
    let arquivos = fs.readdirSync(__dirname + '/data/');
    let cursos = arquivos.map(arquivo => {
       return arquivo.substr(0, arquivo.lastIndexOf('.'));
    })
    return cursos;
  }
}
