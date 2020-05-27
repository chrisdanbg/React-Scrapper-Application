const electron = require('electron');

const { app, BrowserWindow } = electron;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({});
  mainWindow.setTitle('YouTube Helper');
  mainWindow.loadURL('http://localhost:3000');
};

app.on('ready', createWindow);
