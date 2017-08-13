import {NgModule} from "@angular/core";
import {MainAppRoute} from "./main-app.router";
import {CoreModule} from "../../core/core.module";
import {MaterialDesignModule} from "../../material/material-design.module";
import {MainAppComponent} from "./main-app.component";
import {IsLoggedIn} from "../../shared/helpers/is-logged-in.helper";
import {CanLeave} from "../../shared/helpers/can-leave.helper";
import {CheckConfirm} from "../../shared/helpers/check-confirm.helper";

@NgModule({
    imports: [
        CoreModule,
        MainAppRoute,
        MaterialDesignModule
    ],
    declarations: [
        MainAppComponent
    ],
    providers: [
        IsLoggedIn,
        CanLeave,
        CheckConfirm
    ],
    bootstrap: [
        MainAppComponent
    ]
})
export class MainAppModule {}