import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataStore} from '../../shared/data/data-store.helper';

@Component({
    selector: 'sample-login-component',
    styleUrls: ['sample-login.css'],
    templateUrl: 'sample-login.html'
})
export class SampleLoginComponent implements OnInit {
    constructor(
        private _dataStore: DataStore,
        private _router: Router
    ) {
        if (this._dataStore.getToken()) {
            this.redirectToDashboard();
        }
    }

    ngOnInit(): void {
        console.log(this.getParameterByName("test"));
    }

    getParameterByName(name: string, url?: string): any {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    login() {
        this._dataStore.setToken('token');
        this._router.navigate([this._dataStore.getRedirectURL()]);
    }

    redirectToDashboard() {
        this._router.navigate(['/dashboard']);
    }
}