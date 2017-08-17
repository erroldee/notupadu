import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {ElectronConnection} from "../../shared/helpers/electron-connection.helper";
import {ShortcutEvents} from "../../shared/helpers/shortcut-events.helper";

@Component({
    selector: 'main-app-component',
    styleUrls: ['main-app.css'],
    templateUrl: 'main-app.html',
    encapsulation: ViewEncapsulation.None
})

export class MainAppComponent implements OnInit {
    @ViewChild("noteTextarea") noteTextarea;

    activeTab: string = "NOTES";
    notes: string = "";
    isReadOnly: boolean = true;
    notesPlaceholder: string = "Press play start taking notes";

    constructor(
        private _electronConnection: ElectronConnection,
        private _shortcutEvents: ShortcutEvents,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (this._electronConnection.hasConn) {
            this._electronConnection.listen("shortcut:note", () => {
                this._shortcutEvents.showNote();
            });

            this._electronConnection.listen("shortcut:stats", () => {
                this._shortcutEvents.showStats();
            });

            this._electronConnection.listen("shortcut:about", () => {
                this._shortcutEvents.showAbout();
            });

            this._electronConnection.listen("shortcut:timer", () => {
                this._shortcutEvents.toggleTimer();
            });
        }
    }

    onActivateTab(activeTab: string) {
        this.activeTab = activeTab;
        this._changeDetectorRef.detectChanges();
    }

    onTimerCleared(stat: boolean) {
        if (stat) {
            this.notes = "";
            this.isReadOnly = false;
            this.noteTextarea.nativeElement.focus();
            this.notesPlaceholder = "Notes";
        } else {
            this.isReadOnly = true;
            this.notesPlaceholder = "Press play start taking notes";
        }

        this._changeDetectorRef.detectChanges();
    }

    onCutCopy(event: any) {
        event.preventDefault();
    }
}