const { app, BrowserWindow, ipcMain } = require('electron');


if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(()=> {
    createWindow();
    createShortcut();
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
    mainWindow.setIcon('/images/md-ricochet.ico');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    
function createShortcut() {
    if (process.platform === 'win32') {
        const path = require('path');
        const fs = require('fs');
        const desktopPath = path.join(require('os').homedir(), 'Desktop');
        const shortcutPath = path.join(desktopPath, 'MyElectronApp.lnk');

        const exePath = process.execPath; // Path to the Electron app executable

        // Create shortcut using a batch script
        const script = `@echo off
        powershell "$s=(New-Object -COM WScript.Shell).CreateShortcut('${shortcutPath}'); $s.TargetPath='${exePath}'; $s.Save()"`;

        const scriptPath = path.join(__dirname, 'create_shortcut.bat');
        fs.writeFileSync(scriptPath, script);

        require('child_process').exec(scriptPath);
    }
}
} 

