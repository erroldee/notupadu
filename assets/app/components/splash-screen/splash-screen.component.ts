import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ElectronConnection} from "../../shared/helpers/electron-connection.helper";

@Component({
    selector: 'splash-screen-component',
    styleUrls: ['splash-screen.css'],
    templateUrl: 'splash-screen.html'
})

export class SplashScreenComponent implements OnInit {
    updateStatus: string = "Check Update";
    errorUpdate: boolean = false;

    constructor(
        private _router: Router,
        private _electronConn: ElectronConnection,
        private _changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        if (this._electronConn.hasConn) {
            this._electronConn.emit("updater:start", "start");
            this.startElectronListener();
        }
    }

    startElectronListener() {
        this._electronConn.listen("updater:status", this.displayUpdate.bind(this));
    }

    displayUpdate(event, data) {
        this.updateStatus = data.message;
        this.errorUpdate = data.error;

        this._changeDetector.detectChanges();

        if (data.finish && !data.forUpdate) {
            setTimeout(this.startApplication.bind(this), 1000);
        }
    }

    startApplication() {
        this._electronConn.emit("application:start", "start");
    }
}