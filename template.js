/* jshint esversion: 6 */
const data = require('./data');
const process = require('process');
const { ipcMain } = require('electron');

let templateInicial;

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
    if(cursos.length > 0) {
      cursos.forEach(curso => {
        template.push({
          'label': curso,
          type: 'radio',
          checked: false,
          click: () => {
            win.send('curso-trocado', curso);
          }
        });
      });

    }
    this.templateInicial = template;
    return template;
  },
  adicionarCursoNoTray(curso, win) {
    this.templateInicial.push({
      label: curso,
      type: 'radio',
      click: () => {
        win.send('curso-trocado', curso);
      },
      checked: true
    });
    return this.templateInicial;
  },
  geraMenuPrincipalTemplate(app) {
    let templateMenu = [
      {
          label: 'View',
          submenu: [
            {
              role: 'toggledevtools'
            },
            {
              role: 'reload'
            }
          ]
      },
  		{
  			label: 'Sobre',
  			submenu: [
  				{
  					label: 'Sobre o Alura Timer',
            accelerator: 'CmdOrCtrl+I',
            click: () => {
              ipcMain.emit('abrir-janela-sobre');
            }
  				}
  			]
  		}
  	];
    if(process.platform == 'darwin') {
  		templateMenu.unshift([
  			{
  				label: app.getName()
  			}
  		]);
  	}
    return templateMenu;
  }
};
