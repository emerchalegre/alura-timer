/* jshint esversion: 6 */
const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data');
const template = require('./template');
const process = require('process');

let mainWindow = null;
let tray = null;
app.on('ready', () => {

	console.log("Aplicação iniciada");

	mainWindow = new BrowserWindow({
    width: 550,
    height: 300,
		maximizable : false,
		title: 'Alura Timer',
		webPreferences: {
			devTools: true
		}
  });
	//mainWindow.loadURL("https://www.alura.com.br");
	tray = new Tray(__dirname+'/app/img/icon-tray.png');
	const tpl = template.geraTrayTemplate(mainWindow);
	let menuTray = Menu.buildFromTemplate(tpl);
	tray.setContextMenu(menuTray);

	let templateMenu = template.geraMenuPrincipalTemplate(app);

	let menuPrincipal = Menu.buildFromTemplate(templateMenu);

	Menu.setApplicationMenu(menuPrincipal);

	globalShortcut.register('CmdOrCtrl+Shift+P', () => {
		mainWindow.send('atalho-iniciar-parar');
	});

	//mainWindow.openDevTools();
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
	console.log("Aplicação finalizada");
	app.quit();
});

let windowSobre = null;
ipcMain.on('abrir-janela-sobre', () => {
	if(windowSobre === null) {
		windowSobre = new BrowserWindow({
	 		width: 300,
	 		height: 230,
			frame: false,
			alwaysOnTop: true
	 	});

		windowSobre.on('close', () => {
			windowSobre = null;
		});
	}

	windowSobre.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
		windowSobre.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
	console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
	data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
	let novoTemplate = template.adicionarCursoNoTray(novoCurso, mainWindow);
	let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
	tray.setContextMenu(novoTrayMenu);
});
