import {NgModule} from '@angular/core';

import {CoreModule} from '../../core/core.module';
import {SampleLoginRoute} from './sample-login.router';
import {SampleLoginComponent} from './sample-login.component';
import {MaterialDesignModule} from "../../material/material-design.module";

@NgModule({
    imports: [
        SampleLoginRoute,
        CoreModule,
        MaterialDesignModule
    ],
    declarations: [
        SampleLoginComponent
    ],
    bootstrap: [
        SampleLoginComponent
    ]
})
export class SampleLoginModule {}
