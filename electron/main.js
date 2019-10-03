const {app, BrowserWindow} = require('electron');
const fetch = require("node-fetch");
const {exec} = require('child_process');


let win;

function isDev() {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}

function runFlask() {
  exec('./flask/dist/app', (err, stdout, stderr) => {
    console.log(err);
  });
}

function killFlask() {
  fetch('http://127.0.0.1:5000/pid/')
    .then(resp => resp.json())
    .then(({pid}) => {
      exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
        console.log(err);
      });
    });
}

function createWindow() {
  if (!isDev()) runFlask();
  win = new BrowserWindow({
    width: 760,
    height: 540,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
    killFlask();
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  killFlask();
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
