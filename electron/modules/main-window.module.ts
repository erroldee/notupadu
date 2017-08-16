import {app} from "electron";
import {WindowObject} from "../objects/window.object";
import {MenuObject} from "../objects/menu.object";
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import {CONSTANTS} from "../constants/constants";
const url = require('url');
const path = require('path');
const electronShortcut = require("electron-localshortcut");
const log = require("electron-log");

export class MainWindowModule {
    private window: WindowObject;
    private menuObj: MenuObject;
    private menu: MenuItemConstructorOptions[];
    private HTMLcontent: string = CONSTANTS.mainDevHTML;

    constructor() {
        this.appEvents();
    }

    appEvents() {
        this.window = new WindowObject({
            width: 560,
            height: 640,
            minWidth: 560,
            minHeight: 640
        });

        log.info("PRODUCTION = " + CONSTANTS.production);

        this.loadMain();
        this.loadEvents();
        this.buildShortcuts();
        this.buildMenu();
    }

    loadMain() {
        if (CONSTANTS.production) {
            this.HTMLcontent = url.format({
                pathname: path.join(CONSTANTS.projectRoot, `/${CONSTANTS.mainProdHTML}`),
                protocol: 'file:',
                slashes: true
            });
        }

        this.window.loadURL(this.HTMLcontent + "#/main");
    }

    loadEvents() {
        this.window.addListener("closed", () => {
            CONSTANTS.windowList[CONSTANTS.windowMapping["main"]] = null;
        });
    }

    buildMenu() {
        if (!CONSTANTS.production) {
            this.menu = [{
                label: "Debug",
                submenu: [
                    {
                        role: "reload"
                    },
                    {
                        label: "Inspect",
                        accelerator: process.platform === "darwin" ? "Command + Alt + I" : "Ctrl + Shift + I",
                        click(item: any, focusedWindow: any) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                ]
            }];

            if (process.platform === "darwin") {
                this.menu.unshift({});
            }

            this.menuObj = new MenuObject(this.menu);
            this.window.setMenu(this.menuObj.obj);
        } else {
            this.window.setMenu(null);
        }
    }

    buildShortcuts() {
        electronShortcut.register(
            this.window.obj,
            (process.platform === "darwin") ? "Command+N" : "Ctrl+N",
            () => {
                console.log("note called");
                this.sendContent("shortcut:note", "start");
            }
        );

        electronShortcut.register(
            this.window.obj,
            (process.platform === "darwin") ? "Command+S" : "Ctrl+S",
            () => {
                this.sendContent("shortcut:stats", "start");
            }
        );

        electronShortcut.register(
            this.window.obj,
            (process.platform === "darwin") ? "Command+H" : "Ctrl+H",
            () => {
                this.sendContent("shortcut:about", "start");
            }
        );

        electronShortcut.register(
            this.window.obj,
            (process.platform === "darwin") ? "Command+Space" : "Ctrl+Space",
            () => {
                this.sendContent("shortcut:timer", "start");
            }
        );
    }

    sendContent(channel: string, data: any) {
        this.window.obj.webContents.send(channel, data);
    }

    closeWindow() {
        electronShortcut.unregisterAll(this.window.obj);
        this.window.obj.close();
    }
}