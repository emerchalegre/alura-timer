const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const template = require('./template');

let mainWindow = null;
let tray = null;
app.on('ready', () => {

	console.log("Aplicação iniciada");


	mainWindow = new BrowserWindow({
    width: 1024,
    height: 600
  });
	//mainWindow.loadURL("https://www.alura.com.br");
	tray = new Tray(__dirname+'/app/img/icon-tray.png');
	const tpl = template.geraTrayTemplate(mainWindow);
	let menuTray = Menu.buildFromTemplate(tpl);
	tray.setContextMenu(menuTray);
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
	console.log("Aplicação finalizada");
	app.quit();
});

let windowSobre = null;
ipcMain.on('abrir-janela-sobre', () => {
	if(windowSobre == null) {
		windowSobre = new BrowserWindow({
	 		width: 300,
	 		height: 200
	 	});

		windowSobre.on('close', () => {
			windowSobre = null;
		});
	}


	windowSobre.loadURL(`file://${__dirname}/app/sobre.html`);
})

ipcMain.on('fechar-janela-sobre', () => {
		windowSobre.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
	console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
	data.salvaDados(curso, tempoEstudado);
});
