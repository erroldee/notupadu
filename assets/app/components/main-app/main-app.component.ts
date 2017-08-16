import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ElectronConnection} from "../../shared/helpers/electron-connection.helper";
import {ShortcutEvents} from "../../shared/helpers/shortcut-events.helper";

@Component({
    selector: 'main-app-component',
    styleUrls: ['main-app.css'],
    templateUrl: 'main-app.html',
    encapsulation: ViewEncapsulation.None
})

export class MainAppComponent implements OnInit {
    activeTab: string = "NOTES";
    notes: string = "";

    constructor(
        private _electronConnection: ElectronConnection,
        private _shortcutEvents: ShortcutEvents
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
    }

    onTimerCleared(stat: boolean) {
        this.notes = "";
    }

    onCopy(event: any) {
        event.preventDefault();
    }
}