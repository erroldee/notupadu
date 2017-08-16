export class DurationComputer {
    compute(duration: number): string {
        const hour = Math.floor(duration / 3600),
            minute = Math.floor((duration - (hour * 3600)) / 60),
            second = duration % 60,
            hourDisplay = (hour > 9) ? "" + hour : "0" + hour,
            minuteDisplay = (minute > 9) ? "" + minute : "0" + minute,
            secondDisplay = (second > 9) ? "" + second : "0" + second;

        return hourDisplay + ":" + minuteDisplay + ":" + secondDisplay;
    }
}