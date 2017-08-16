import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {StatStore} from "../../../shared/data/stat-store.helper";
import {StatDataSource} from "../../../shared/helpers/stat-data-source.helper";

@Component({
    selector: "stats-app",
    styleUrls: ["stats-app.css"],
    templateUrl: "stats-app.html"
})

export class StatsAppComponent implements OnInit {
    displayedColumns = ['statId', 'statDateTime', 'statDuration'];
    dataSource: StatDataSource | null;

    constructor(
        private _statStore: StatStore,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): any {
        this.dataSource = new StatDataSource(this._statStore);
        this._changeDetectorRef.detectChanges();
    }
}