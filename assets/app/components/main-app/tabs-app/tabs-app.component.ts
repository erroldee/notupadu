import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {MenuTab} from "../../../shared/interfaces/menu-tab.interface";
import {ShortcutEvents} from "../../../shared/helpers/shortcut-events.helper";

@Component({
    selector: "tabs-app",
    styleUrls: ["tabs-app.css"],
    templateUrl: "tabs-app.html"
})

export class TabsAppComponent implements OnInit, OnDestroy {
    @Output() tabActivated: EventEmitter<string> = new EventEmitter<string>();

    activeTab: number = 0;
    menuTabs: MenuTab[] = [
        {
            icon: "insert_drive_file",
            title: "NOTES"
        },
        {
            icon: "show_chart",
            title: "STATS"
        },
        {
            icon: "help_outline",
            title: "ABOUT"
        }
    ];

    private notesSub: any;
    private statsSub: any;
    private aboutSub: any;

    constructor(
        private _shortcutEvents: ShortcutEvents,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.notesSub = this._shortcutEvents.showNoteEvent.subscribe(
            response => {
                this.activateTab(0);
            }
        );

        this.statsSub = this._shortcutEvents.showStatsEvent.subscribe(
            response => {
                this.activateTab(1);
            }
        );

        this.aboutSub = this._shortcutEvents.showAboutEvent.subscribe(
            response => {
                this.activateTab(2);
            }
        );
    }

    ngOnDestroy(): void {
        this.notesSub.unsubscribe();
        this.statsSub.unsubscribe();
        this.aboutSub.unsubscribe();
    }

    activateTab(idx) {
        this.activeTab = idx;
        this.tabActivated.emit(this.menuTabs[idx].title);
        this._changeDetectorRef.detectChanges();
    }
}