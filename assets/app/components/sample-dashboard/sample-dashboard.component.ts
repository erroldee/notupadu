import {Component, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs/Rx";
import {DataStore} from "../../shared/data/data-store.helper";
import {CheckConfirm} from "../../shared/helpers/check-confirm.helper";
import {GetHelloWorldService} from "../../shared/services/get-hello-world.service";
import {LoginDetails} from "../../shared/models/login-details.model";
import {AllowLogout} from "../../shared/helpers/allow-logout.helper";

@Component({
    selector: 'sample-dashboard-component',
    styleUrls: ['sample-dashboard.css'],
    templateUrl: 'sample-dashboard.html'
})
export class SampleDashboardComponent implements OnDestroy {
    mustCheck: boolean = false;
    callServiceButtonText: string = 'Call Service Text';
    helloWorldSubscription: Subscription;
    testInspect: any = '';

    constructor(
        private _dataStore: DataStore,
        private _router: Router,
        private _checkConfirm: CheckConfirm,
        private _getHelloWorld: GetHelloWorldService,
        private _allowLogout: AllowLogout
    ) {}

    callService() {
        this.helloWorldSubscription = this._getHelloWorld.getService(new LoginDetails(
            'username',
            'password'
        )).subscribe(
            response => {
                this.testInspect = response;
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }

    toggleCheck() {
        this.mustCheck = !this.mustCheck;
    }

    canDeactivate(): Observable<boolean>|Promise<boolean>|boolean {
        this._allowLogout.setAllowLogout(false);

        if (!this.mustCheck) {
            return true;
        }

        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        const promise = this._checkConfirm.confirm('Are you sure?');

        //noinspection TypeScriptUnresolvedFunction
        return Observable.fromPromise(promise);
    }

    ngOnDestroy() {
        this._allowLogout.setAllowLogout(true);
        if (this.helloWorldSubscription) {
            this.helloWorldSubscription.unsubscribe();
        }
    }
}