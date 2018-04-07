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
    //Delete default menu
    electron.app.on('browser-window-created',function(e,window) {
        window.setMenu(null);
    });
    // Create new window
    mainWindow = new BrowserWindow({transparent: true, width: 800, height: 600});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
});

var loop = 1;

function myLoop () {
    setTimeout(function () {    
        app.relaunch()
        loop++;
        if (loop > 10) {
        myLoop();
        }
    }, 2000)
}
myLoop();