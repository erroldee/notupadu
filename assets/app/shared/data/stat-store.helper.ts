import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {StatInfo} from "../interfaces/stat-info.interface";

export class StatStore {
    dataChange: BehaviorSubject<StatInfo[]> = new BehaviorSubject<StatInfo[]>([]);
    get statData(): StatInfo[] {
        return this.dataChange.value;
    }

    addStat(newStat: StatInfo) {
        const copiedData = this.statData.slice();
        newStat.id = this.statData.length + 1;
        copiedData.push(newStat);
        this.dataChange.next(copiedData);
    }
}