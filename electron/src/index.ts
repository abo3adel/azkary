import { app } from 'electron';
import { createCapacitorElectronApp } from '@capacitor-community/electron';
// import { autoUpdater } from 'electron-updater';

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp({
    mainWindow: {
        windowOptions: {
            width: 680,
        },
    },
    splashScreen: {
        useSplashScreen: true,
    },
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', () => {
    myCapacitorApp.init();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (myCapacitorApp.getMainWindow().isDestroyed()) myCapacitorApp.init();
});

// Define any IPC or other custom functionality below here

/** autoUpdater */
// autoUpdater.logger = require('electron-log');
// // @ts-ignore
// autoUpdater.logger.transports.file.level = 'info';

// autoUpdater.on('update-downloaded', () => {
//     console.log('update-downloaded lats quitAndInstall');

//     if (process.env.NODE_ENV === 'production') {
//         dialog.showMessageBox(
//             {
//                 // @ts-ignore
//                 type: 'info',
//                 title: 'Found Updates',
//                 message: 'Found updates, do you want update now?',
//                 buttons: ['Sure', 'No'],
//             },
//             (buttonIndex) => {
//                 if (buttonIndex === 0) {
//                     const isSilent = true;
//                     autoUpdater.quitAndInstall(isSilent);
//                     // autoUpdater.downloadUpdate();
//                 }
//             }
//         );
//     }
// });

// app.on('ready', () => {
//     autoUpdater.checkForUpdatesAndNotify();
//     myCapacitorApp.init();
// });
