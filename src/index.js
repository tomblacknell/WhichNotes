
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let win = new BrowserWindow({
    width: 1200,
    height: 750,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.webContents.openDevTools()
  win.loadFile('./index.html')
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

