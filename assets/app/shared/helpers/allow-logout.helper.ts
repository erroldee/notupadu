import {Injectable} from '@angular/core';

@Injectable()
export class AllowLogout {
    private logoutEnabled: boolean = true;

    setAllowLogout(state: boolean) {
        this.logoutEnabled = state;
    }

    getAllowLogout(): boolean {
        return this.logoutEnabled;
    }
}