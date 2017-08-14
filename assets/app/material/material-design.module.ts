import {NgModule} from "@angular/core";
import {
    MdButtonModule, MdCardModule, MdIconModule, MdSliderModule, MdSlideToggleModule, MdTabsModule,
    MdToolbarModule
} from "@angular/material";

@NgModule({
    imports: [
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        MdTabsModule,
        MdIconModule
    ],
    exports: [
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        MdTabsModule,
        MdIconModule
    ]
})

export class MaterialDesignModule {}