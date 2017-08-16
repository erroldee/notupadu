import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {DataStore} from "../../../shared/data/data-store.helper";
import {StatDetails} from "../../../shared/models/stat-details.model";
import {DurationComputer} from "../../../shared/helpers/duration-computer.helper";
import {StatStore} from "../../../shared/data/stat-store.helper";
import {CONSTANTS} from "../../../shared/constants/constants";
import {ShortcutEvents} from "../../../shared/helpers/shortcut-events.helper";

@Component({
    selector: "timer-app",
    styleUrls: ["timer-app.css"],
    templateUrl: "timer-app.html"
})

export class TimerAppComponent implements OnInit, OnDestroy {
    @Output() timerCleared: EventEmitter<boolean> = new EventEmitter<boolean>();
    timerStarted: boolean = false;
    timerObj: any;
    timeDisplay: string = "00:00:00";
    timeCounter: number = 0;
    timeStamp: number = 0;

    toggleEvent: any;

    constructor(
        private _durationComputer: DurationComputer,
        private _statStore: StatStore,
        private _shortcutEvents: ShortcutEvents
    ) {}

    ngOnInit() {
        this.toggleEvent = this._shortcutEvents.toggleTimerEvent.subscribe(
            response => {
                this.toggleTimer();
            }
        );
    }

    ngOnDestroy() {
        this.toggleEvent.unsubscribe();
    }

    toggleTimer() {
        if (!this.timerStarted) {
            this.timeStamp = new Date().getTime();
            this.timerObj = setInterval(this.updateTimer.bind(this), 1000);
            this.timerCleared.emit(true);
        } else {
            const stat = new StatDetails(this.timeCounter, this.timeStamp);

            clearInterval(this.timerObj);
            this.addStatToTable(stat);
            this.updateTimer(true);
        }

        this.timerStarted = !this.timerStarted;
    }

    addStatToTable(stat) {
        const timestamp = new Date(stat.timestamp),
            month = CONSTANTS.monthArray[timestamp.getMonth()],
            date = timestamp.getDate(),
            year = timestamp.getFullYear(),
            hour = (timestamp.getHours() > 12) ? timestamp.getHours() - 12 :
                ((timestamp.getHours() < 10) ? "0" + timestamp.getHours() : timestamp.getHours()),
            minute = (timestamp.getMinutes() < 10) ? "0" + timestamp.getMinutes() : timestamp.getMinutes(),
            AMPM = (timestamp.getHours() > 12) ? "PM" : "AM";

        this._statStore.addStat({
            datetime: month + " " + date + ", " + year + " " + hour + ":" + minute + " " + AMPM,
            stat: this._durationComputer.compute(stat.duration),
        });
    }

    updateTimer(reset) {
        if (reset) {
            this.timeCounter = 0;
        } else {
            this.timeCounter++;
        }

        this.timeDisplay = this._durationComputer.compute(this.timeCounter);
    }
}