// initialize electron framework



// app and browser window modules
const {app, BrowserWindow} = require('electron');


// create a new BrowserWindow
app.on('ready', function(){
    //do something
    mainWindow = new BrowserWindow({
        width:1000,
        height: 800,
        resizable: true

    });

    //load file for the main window
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    //open dev tools
    // mainWindow.webContents.openDevTools({
    //     mode: 'bottom'
    // });

});
