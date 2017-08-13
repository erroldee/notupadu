import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {SampleConsoleDirective} from './directives/sample-console.directive';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        SampleConsoleDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HttpModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        SampleConsoleDirective
    ]
})
export class CoreModule {}