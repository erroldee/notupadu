import {NgModule} from '@angular/core';

import {CoreModule} from '../../core/core.module';
import {SampleDashboardRoute} from './sample-dashboard.router';
import {SampleDashboardComponent} from './sample-dashboard.component';
import {DashboardModalComponent} from './dashboard-modal/dashboard-modal.component';
import {IsLoggedIn} from '../../shared/helpers/is-logged-in.helper';
import {CanLeave} from '../../shared/helpers/can-leave.helper';
import {CheckConfirm} from '../../shared/helpers/check-confirm.helper';
import {GetHelloWorldService} from '../../shared/services/get-hello-world.service';
import {SampleVendorModule} from "../../shared/vendors/sample-vendor/sample-vendor.module";
import {MaterialDesignModule} from "../../material/material-design.module";

@NgModule({
    imports: [
        CoreModule,
        SampleDashboardRoute,
        SampleVendorModule,
        MaterialDesignModule
    ],
    declarations: [
        SampleDashboardComponent,
        DashboardModalComponent
    ],
    providers: [
        IsLoggedIn,
        CanLeave,
        CheckConfirm,
        GetHelloWorldService
    ],
    bootstrap: [
        SampleDashboardComponent
    ]
})
export class SampleDashboardModule {}