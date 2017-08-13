import {app} from "electron";
import {WindowObject} from "../objects/window.object";
import {CONSTANTS} from "../constants/constants";
const url = require('url');
const path = require('path');

export class SplashScreenModule {
    private window: WindowObject;
    private HTMLcontent: string = CONSTANTS.splashDevHTML;

    constructor() {
        this.appEvents();
    }

    appEvents() {
        this.window = new WindowObject({
            width: 628,
            height: 308,
            center: true,
            resizable: false,
            movable: false,
            minimizable: false,
            fullscreenable: false,
            title: "Notupadu",
            frame: false,
            transparent: true,
            backgroundColor: "#00FFFFFF"
        });
        this.loadSplashScreen();
        this.loadEvents();

    }

    loadSplashScreen() {
        if (CONSTANTS.production) {
            this.HTMLcontent = url.format({
                pathname: path.join(CONSTANTS.projectRoot, `/${CONSTANTS.splashProdHTML}`),
                protocol: 'file:',
                slashes: true
            });
        }
        this.window.loadURL(this.HTMLcontent);
    }

    loadEvents() {
        this.window.addListener("closed", () => {
            CONSTANTS.windowList[CONSTANTS.windowMapping["splash"]] = null;
        });
    }

    sendContent(channel: string, data: any) {
        this.window.obj.webContents.send(channel, data);
    }

    closeWindow() {
        this.window.obj.close();
    }
}