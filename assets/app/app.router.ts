import {RouterModule, Route, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SplashScreenComponent} from "./components/splash-screen/splash-screen.component";

const routes: Route[] = [
    {
        path: "",
        redirectTo: "/splash",
        pathMatch: "full"
    },
    {
        loadChildren: "app/components/main-app/main-app.module#MainAppModule",
        path: "main"
    },
    {
        path: "splash",
        component: SplashScreenComponent
    },
    {
        path: "**",
        redirectTo: "/main",
        pathMatch: "full"
    }
];

export const ROUTES_CONFIG: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true,
        preloadingStrategy: PreloadAllModules
    }
);
