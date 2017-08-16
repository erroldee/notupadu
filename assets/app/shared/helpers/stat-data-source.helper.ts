import {DataSource} from "@angular/cdk";
import {StatStore} from "../data/stat-store.helper";
import {StatInfo} from "../interfaces/stat-info.interface";
import {Observable} from "rxjs/Observable";

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to the stat data base, StatStore. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class StatDataSource extends DataSource<any> {
    constructor(private _statStore: StatStore) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<StatInfo[]> {
        return this._statStore.dataChange;
    }

    disconnect() {}
}