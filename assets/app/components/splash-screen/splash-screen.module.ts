import {NgModule} from "@angular/core";
import {CoreModule} from "../../core/core.module";
import {MaterialDesignModule} from "../../material/material-design.module";
import {IsLoggedIn} from "../../shared/helpers/is-logged-in.helper";
import {CanLeave} from "../../shared/helpers/can-leave.helper";
import {CheckConfirm} from "../../shared/helpers/check-confirm.helper";
import {SplashScreenComponent} from "./splash-screen.component";

@NgModule({
    imports: [
        CoreModule,
        MaterialDesignModule
    ],
    declarations: [
        SplashScreenComponent
    ],
    providers: [
        IsLoggedIn,
        CanLeave,
        CheckConfirm
    ],
    bootstrap: [
        SplashScreenComponent
    ]
})
export class SplashScreenModule {}