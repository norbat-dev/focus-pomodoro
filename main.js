const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const os = require ('os')

function createWindow () {
    const win = new BrowserWindow({
        width: 350,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.handle('get-username', async () => {
        return os.userInfo().username;
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})