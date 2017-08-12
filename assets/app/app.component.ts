import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataStore} from './shared/data/data-store.helper';
import {AllowLogout} from "./shared/helpers/allow-logout.helper";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private _router: Router,
        private _dataStore: DataStore,
        private _allowLogout: AllowLogout
    ) {}

    ngOnInit(): any {
        if (this.isLoggedIn()) {
            this._router.navigate(['/dashboard']);
        } else {
            this._router.navigate(['/login']);
        }
    }

    isLoggedIn(): boolean {
        return !!this._dataStore.getToken();
    }

    logOutUser() {
        this._router.navigate(["/login"]).then(() => {
            if (this._allowLogout.getAllowLogout()) {
                this._dataStore.clearEverything();
            }
        });
    }
}
