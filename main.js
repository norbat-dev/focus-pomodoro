const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const os = require ('os')
const DatabaseManager = require('./src/db')

let db;

async function createWindow () {
    const win = new BrowserWindow({
        width: 350,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
  win.loadFile('index.html')
}

app.whenReady().then(async () => {

    db = new DatabaseManager();
    try {
        await db.connect();
        await db.init();
    } catch (err) {
        console.error('Błąd bazy danych:', err);
    }

    ipcMain.handle('get-username', async () => {
        return os.userInfo().username;
    });

    ipcMain.handle('get-today-task', async () => {
        try {
            const tasks = await db.getTodayTasks();
            return tasks;
        } catch (err) {
            console.error('Błąd bazy danych:', err);
        }
    });
    

    ipcMain.handle('add-task', async (event, title) => {
        try {
            await db.addNewTask(title);
        } catch (err) {
            console.error('Błąd bazy danych:', err);
        }
    });

    createWindow()


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', async () => {
    if (db) await db.close();
    if (process.platform !== 'darwin') {
        app.quit()
    }
})