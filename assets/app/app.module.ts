import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ROUTES_CONFIG} from './app.router';
import {CoreModule} from './core/core.module';
import {DataStore} from './shared/data/data-store.helper';
import {LoadIfLoggedIn} from './shared/helpers/load-if-logged-in.helper';
import 'hammerjs';
import {MaterialDesignModule} from "./material/material-design.module";
import {AllowLogout} from "./shared/helpers/allow-logout.helper";
import {SplashScreenModule} from "./components/splash-screen/splash-screen.module";
import {ElectronConnection} from "./shared/helpers/electron-connection.helper";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        ROUTES_CONFIG,
        CoreModule,
        MaterialDesignModule,
        SplashScreenModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        DataStore,
        LoadIfLoggedIn,
        AllowLogout,
        ElectronConnection
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
