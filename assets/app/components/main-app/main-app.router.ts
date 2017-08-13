import {Route, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MainAppComponent} from "./main-app.component";
import {IsLoggedIn} from "../../shared/helpers/is-logged-in.helper";
import {CanLeave} from "../../shared/helpers/can-leave.helper";

const mainAppRoutes: Route[] = [
    {
        path: "",
        component: MainAppComponent,
        canActivate: [
            IsLoggedIn
        ],
        canDeactivate: [
            CanLeave
        ]
    }
];

export const MainAppRoute: ModuleWithProviders = RouterModule.forChild(mainAppRoutes);