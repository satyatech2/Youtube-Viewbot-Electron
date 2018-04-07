const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow} = electron;
// Require electron-log in the app
var log = require('electron-log');
var fs = require('fs');
let mainWindow;

// Listen for app to be ready 
app.on('ready', function(){
    // Logging
    log.error();
    log.debug();
    log.warn();
    log.transports.file.level = 'error', 'debug', 'warn';
    log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';
    log.transports.file.maxSize = 5 * 1024 * 1024;
    log.transports.file.file = __dirname + '/log.txt';
    log.transports.file.streamConfig = { flags: 'w' };
    log.transports.file.stream = fs.createWriteStream('log.txt');
    // Delete default menu
    electron.app.on('browser-window-created',function(e,window) {
        window.setMenu(null);
    });
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL('https://github.com');
});

//Close app when exited
app.on('window-all-closed', () => {
    app.quit()
})