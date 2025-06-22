const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', {
    getUsername: () => ipcRenderer.invoke('get-username'),
    addTask: ( title ) => ipcRenderer.invoke('add-task', title)
});