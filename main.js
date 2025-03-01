const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) app.quit();

let mainWindow;

app.whenReady().then(()=> {
    createWindow();

});

app.on('window-all-closed', () => {
        app.quit();
});



function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'logo/md-ricochet.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');


    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
