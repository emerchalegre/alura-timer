const data = require('./data');

module.exports = {
  geraTrayTemplate(win) {
    let template = [
      {
        'label': 'Cursos'
      },
      {
        type: 'separator'
      }
    ];

    let cursos = data.pegaNomeDosCursos();
    cursos.forEach(curso => {
      template.push({
        'label': curso,
        type: 'radio',
        click: () => {
          win.send('curso-trocado', curso);
        }
      })
    });
    return template;
  }
}
