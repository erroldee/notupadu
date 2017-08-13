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
        // this._router.navigate(['/splash']);
    }

    /*logOutUser() {
        this._router.navigate(["/login"]).then(() => {
            if (this._allowLogout.getAllowLogout()) {
                this._dataStore.clearEverything();
            }
        });
    }*/
}
