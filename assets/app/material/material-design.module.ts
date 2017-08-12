import {NgModule} from "@angular/core";
import {MdButtonModule, MdCardModule, MdSliderModule, MdSlideToggleModule, MdToolbarModule} from "@angular/material";

@NgModule({
    imports: [
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        MdSlideToggleModule,
        MdSliderModule
    ],
    exports: [
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        MdSlideToggleModule,
        MdSliderModule
    ]
})

export class MaterialDesignModule {}