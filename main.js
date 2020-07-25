
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

let mainWindow;

let devMode = false;

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  devMode = true;
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  })

  let indexPath

  if (devMode && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath)

  if (devMode) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .catch(err => console.log('Error loading React DevTools: ', err))
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
