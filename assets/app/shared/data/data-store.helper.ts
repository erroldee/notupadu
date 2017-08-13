import {Injectable} from "@angular/core";
declare var sessionStorage: any;

@Injectable()
export class DataStore {
    clearSession() {
        sessionStorage.clear();
    };

    sessionStore(itemParam: string, itemValue: any) {
        sessionStorage.setItem(itemParam, JSON.stringify(itemValue));
    };

    sessionGet(itemParam: string): any {
        return JSON.parse(sessionStorage.getItem(itemParam));
    };
}