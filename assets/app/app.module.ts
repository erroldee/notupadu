import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
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
import {DurationComputer} from "./shared/helpers/duration-computer.helper";
import {StatStore} from "./shared/data/stat-store.helper";
import {ShortcutEvents} from "./shared/helpers/shortcut-events.helper";

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
        DataStore,
        LoadIfLoggedIn,
        AllowLogout,
        ElectronConnection,
        DurationComputer,
        StatStore,
        ShortcutEvents
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
