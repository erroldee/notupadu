import {NgModule} from "@angular/core";
import {
    MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdSliderModule, MdSlideToggleModule, MdTableModule,
    MdTabsModule,
    MdToolbarModule
} from "@angular/material";
import {CdkTableModule} from "@angular/cdk";

@NgModule({
    imports: [
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        MdTabsModule,
        MdIconModule,
        MdInputModule,
        MdTableModule,
        CdkTableModule
    ],
    exports: [
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        MdTabsModule,
        MdIconModule,
        MdInputModule,
        MdTableModule,
        CdkTableModule
    ]
})

export class MaterialDesignModule {}