import {app} from "electron";
import {WindowObject} from "../objects/window.object";
import {MenuObject} from "../objects/menu.object";
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import {CONSTANTS} from "../constants/constants";
import {OnDestroy, OnInit} from "@angular/core";
const url = require('url');
const path = require('path');
const electronShortcut = require("electron-localshortcut");

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
            minWidth: 560,
            minHeight: 680
        });

        this.loadMain();
        this.loadEvents();
        this.buildMenu();
        this.buildShortcuts();
    }

    loadMain() {
        if (CONSTANTS.production) {
            this.HTMLcontent = url.format({
                pathname: path.join(CONSTANTS.projectRoot, `/${CONSTANTS.mainProdHTML}`),
                protocol: 'file:',
                slashes: true
            });
        }
        this.window.loadURL(this.HTMLcontent);
    }

    loadEvents() {
        this.window.addListener("closed", () => {
            CONSTANTS.windowList[CONSTANTS.windowMapping["main"]] = null;
        });
    }

    buildMenu() {
        this.menu = [
            {
                label: "File",
                submenu: [
                    {
                        label: "Quit",
                        accelerator: process.platform === "darwin" ? "Command + Q" : "Ctrl + Q",
                        click() {
                            CONSTANTS.windowList[CONSTANTS.windowMapping['main']].closeWindow();
                        }
                    }
                ]
            }
        ];

        if (CONSTANTS.production) {
            const inspector: any = {
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
            };

            this.menu.push(inspector);
        }

        if (process.platform === "darwin") {
            this.menu.unshift({});
        }

        this.menuObj = new MenuObject(this.menu);
        this.window.setMenu(this.menuObj.obj);
    }

    buildShortcuts() {
        electronShortcut.register(
            this.window.obj,
            (process.platform === "darwin") ? "Command+N" : "Ctrl+N",
            () => {
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