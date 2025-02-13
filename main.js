const { app, BrowserWindow, ipcMain } = require('electron');

app.whenReady().then(()=> {
    createWindow();
});

app.on('window-all-closed', () => {
        app.quit();
});

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
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

