import {app, ipcMain} from "electron";
import {CONSTANTS} from "./electron/constants/constants";
import {SplashScreenModule} from "./electron/modules/splash-screen.module";
import {MainWindowModule} from "./electron/modules/main-window.module";
const {autoUpdater} = require("electron-updater");
const log = require("electron-log");

interface UpdaterStatus {
    error: boolean;
    forUpdate: boolean;
    finish: boolean;
    message: string;
}

class ElectronApp {
    constructor() {
        this.startLogger();
        this.startAutoUpdater();
        this.startApp();
    }

    startLogger(): void {
        autoUpdater.logger = log;
        autoUpdater.logger.transports.file.level = "info";
        log.info("App starting");
    }

    startAutoUpdater() {
        autoUpdater.on('checking-for-update', () => {
            this.sendStatusToWindow({
                error: false,
                finish: false,
                forUpdate: false,
                message: "Checking for update..."
            });
        });

        autoUpdater.on('update-available', (info) => {
            this.sendStatusToWindow({
                error: false,
                finish: false,
                forUpdate: false,
                message: "Update available."
            });
        });

        autoUpdater.on('update-not-available', (info) => {
            this.sendStatusToWindow({
                error: false,
                finish: true,
                forUpdate: false,
                message: "Update not available."
            });
        });

        autoUpdater.on('error', (err) => {
            this.sendStatusToWindow({
                error: true,
                finish: true,
                forUpdate: false,
                message: "Failed to fetch update."
            });
        });

        autoUpdater.on('download-progress', (progressObj) => {
            let log_message = "Download speed: " + progressObj.bytesPerSecond;
            log_message = log_message + ' - Downloaded ' + progressObj.percent.toFixed(2) + '%';
            log_message = log_message + ' (' + progressObj.transferred.toFixed(2) + "/" + progressObj.total.toFixed(2) + ')';
            this.sendStatusToWindow({
                error: false,
                finish: false,
                forUpdate: false,
                message: log_message
            });
        });

        autoUpdater.on('update-downloaded', (info) => {
            this.sendStatusToWindow({
                error: false,
                finish: true,
                forUpdate: true,
                message: "Update downloaded; will install in 5 seconds"
            });
            // Wait 5 seconds, then quit and install
            // In your application, you don't need to wait 5 seconds.
            // You could call autoUpdater.quitAndInstall(); immediately
            setTimeout(function() {
                autoUpdater.quitAndInstall();
            }, 5000);
        });
    }

    startApp() {
        CONSTANTS.app = app;
        CONSTANTS.projectRoot = __dirname;
        this.appListener();
    }

    appListener() {
        CONSTANTS.app.on("ready", () => {
            CONSTANTS.windowMapping["splash"] = CONSTANTS.windowList.length;
            CONSTANTS.windowList.push(new SplashScreenModule());
        });

        CONSTANTS.app.on("window-all-closed", () => {
            CONSTANTS.app.quit();
        });

        ipcMain.on("updater:start", () => {
            autoUpdater.checkForUpdates();
        });

        ipcMain.on("application:start", () => {
            console.log("start app");
            CONSTANTS.windowMapping["main"] = CONSTANTS.windowList.length;
            CONSTANTS.windowList.push(new MainWindowModule());
            CONSTANTS.windowList[CONSTANTS.windowMapping["splash"]].closeWindow();
        });
    }

    sendStatusToWindow(data: UpdaterStatus) {
        CONSTANTS.windowList[CONSTANTS.windowMapping["splash"]].sendContent("updater:status", data);
    }
}

new ElectronApp();