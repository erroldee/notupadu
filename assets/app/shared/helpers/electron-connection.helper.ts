import {Injectable} from '@angular/core';

@Injectable()
export class ElectronConnection {
    hasConn: boolean = false;
    ipcRenderer: any;

    constructor() {
        if (electron) {
            this.hasConn = true;
            this.ipcRenderer = electron.ipcRenderer;
        }
    }

    emit(event: string, data: any) {
        if (this.hasConn) {
            this.ipcRenderer.send(event, data);
        } else {
            console.log("Electron not loaded...");
        }
    }

    listen(event: string, callback: any) {
        if (this.hasConn) {
            this.ipcRenderer.on(event, callback);
        } else {
            console.log("Electron not loaded...");
        }
    }
}