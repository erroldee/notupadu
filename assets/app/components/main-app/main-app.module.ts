import {NgModule} from "@angular/core";
import {MainAppRoute} from "./main-app.router";
import {CoreModule} from "../../core/core.module";
import {MaterialDesignModule} from "../../material/material-design.module";
import {MainAppComponent} from "./main-app.component";
import {IsLoggedIn} from "../../shared/helpers/is-logged-in.helper";
import {CanLeave} from "../../shared/helpers/can-leave.helper";
import {CheckConfirm} from "../../shared/helpers/check-confirm.helper";
import {TimerAppComponent} from "./timer-app/timer-app.component";
import {TabsAppComponent} from "./tabs-app/tabs-app.component";
import {StatsAppComponent} from "./stats-app/stats-app.component";
import {HelpAppComponent} from "./help-app/help-app.component";

@NgModule({
    imports: [
        CoreModule,
        MainAppRoute,
        MaterialDesignModule
    ],
    declarations: [
        MainAppComponent,
        TabsAppComponent,
        TimerAppComponent,
        StatsAppComponent,
        HelpAppComponent
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