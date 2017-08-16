import {Injectable} from "@angular/core";
import {StatDetails} from "../models/stat-details.model";
declare var sessionStorage: any;

@Injectable()
export class DataStore {
    clearSession(): boolean {
        try {
            sessionStorage.clear();
            return true;
        } catch (e) {
            return false;
        }
    };

    sessionStore(itemParam: string, itemValue: any): boolean {
        try {
            sessionStorage.setItem(itemParam, JSON.stringify(itemValue));
            return true;
        } catch (e) {
            return false;
        }
    };

    sessionGet(itemParam: string): any {
        return JSON.parse(sessionStorage.getItem(itemParam));
    };
}