import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'xp-audio-player',
    template: `
        <button class="btn btn-default" (click)="play()">Play</button>
    `,
    styles: []
})
export class AudioPlayerComponent implements OnInit {
    @Input() private source;
    private audioPlayer;

    ngOnInit() {
        this.audioPlayer = new Audio(this.source);
    }

    play() {
        this.audioPlayer.play();
    }

    constructor() { }

}
