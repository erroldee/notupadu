import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'main-app-component',
    styleUrls: ['main-app.css'],
    templateUrl: 'main-app.html',
    encapsulation: ViewEncapsulation.None
})

export class MainAppComponent {
    activeTab: number = 0;
    menuTabs: MenuTab[] = [
        {
            icon: "note_add",
            title: "NEW"
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
    timerStarted: boolean = false;
    timerObj: any;
    hourDisplay: string = "00";
    minuteDisplay: string = "00";
    secondDisplay: string = "00";
    timeKeeper: number[] = [];
    timeCounter: number = 0;

    constructor() {}

    activateTab(idx) {
        this.activeTab = idx;
    }

    toggleTimer() {
        if (!this.timerStarted) {
            this.timerObj = setInterval(this.updateTimer.bind(this), 1000);
        } else {
            clearInterval(this.timerObj);
            this.timeKeeper.push(this.timeCounter);
            this.updateTimer(true);
        }

        this.timerStarted = !this.timerStarted;
    }

    updateTimer(reset) {
        if (reset) {
            this.timeCounter = 0;
        } else {
            this.timeCounter++;
        }

        const hour = Math.floor(this.timeCounter / 3600),
            minute = Math.floor((this.timeCounter - (hour * 3600)) / 60),
            second = this.timeCounter % 60;

        this.hourDisplay = (hour > 9) ? "" + hour : "0" + hour;
        this.minuteDisplay = (minute > 9) ? "" + minute : "0" + minute;
        this.secondDisplay = (second > 9) ? "" + second : "0" + second;
    }
}