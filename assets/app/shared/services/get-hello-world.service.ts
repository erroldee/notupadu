import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {LoginDetails} from "../models/login-details.model";
import {CONSTANTS} from "../constants/constants";

@Injectable()
export class GetHelloWorldService {
    constructor(
        private _http: Http
    ) {}

    getService(loginDetails: LoginDetails) {
        const BODY = JSON.stringify(loginDetails);
        const HEADERS = new Headers({
            "Content-Type": "application/json"
        });

        return this._http.get(
            CONSTANTS.getHelloWorldURL,
            {
                headers: HEADERS
            }
        ).map(
            response => {
                return response.json()
            }
        ).catch(
            error => Observable.throw(error.json())
        );
    }
}