import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'xp-audio-player',
    template: `
        <button
            *ngIf="mode === modes.STAND_BY"
            class="btn btn-default"
            (click)="play()">
            Play
        </button>
        <button
            *ngIf="mode === modes.IN_PROGRESS"
            class="btn btn-warning"
            (click)="stop()">
            Playing... stop it.
        </button>
    `,
    styles: []
})
export class AudioPlayerComponent implements OnInit {
    @Input() private source;
    private audioPlayer;
    private modes = {
        STAND_BY: 'STAND_BY',
        IN_PROGRESS: 'IN_PROGRESS'
    };
    private mode = this.modes.STAND_BY;

    constructor() { }

    toggleMode(nextMode) {
        this.mode = nextMode;
    }

    ngOnInit() {
        if (! this.source) {
            return false;
        }

        this.audioPlayer = new Audio(this.source);
        this.audioPlayer.addEventListener('ended', () => this.stop());
    }

    play() {
        if (! this.audioPlayer) {
            return false;
        }

        this.audioPlayer.play();
        this.toggleMode(this.modes.IN_PROGRESS);
    }

    stop() {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.toggleMode(this.modes.STAND_BY);
    }
}
