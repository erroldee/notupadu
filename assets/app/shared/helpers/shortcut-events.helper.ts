import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class ShortcutEvents {
    showNoteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    showStatsEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    showAboutEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    toggleTimerEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    showNote() {
        this.showNoteEvent.emit(true);
    }

    showStats() {
        this.showStatsEvent.emit(true);
    }

    showAbout() {
        this.showAboutEvent.emit(true);
    }

    toggleTimer() {
        this.toggleTimerEvent.emit(true);
    }
}