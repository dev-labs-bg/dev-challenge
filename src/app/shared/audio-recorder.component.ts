/**
 * Cross-browser audio recording using the MediaStreamRecorder.js library, see
 * https://github.com/streamproc/MediaStreamRecorder
 *
 * It supports Chrome, Firefox, Opera and Microsoft Edge.
 * It even works on Android browsers.
 * It follows latest MediaRecorder API standards and provides similar APIs.
 *
 * TODO: Convert WAV to MP3 to reduce audio file size
 *  - https://github.com/zhuker/lamejs
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NotificationService } from './notification.service';

// That is the only way to import the plugin
const MediaStreamRecorder = require('msr');

@Component({
    selector: 'xp-audio-recorder',
    template: `
        <button *ngIf="mode === modes.STAND_BY" class="btn btn-primary" (click)="start()">Start</button>
        <button *ngIf="mode === modes.IN_PROGRESS" class="btn btn-default" (click)="stop()">Stop</button>

        <div *ngIf="mode === modes.RECORDING_MADE">
            <button class="btn btn-default" (click)="play()">Play</button>
            <button class="btn btn-danger" (click)="reset()">Reset</button>
            <button class="btn btn-success" (click)="upload()">Upload</button>
        </div>
    `,
    styles: []
})
export class AudioRecorderComponent implements OnInit {
    @Output() private onUpload = new EventEmitter();
    private mediaRecorder; // :MediaStreamRecorder instance
    private blobURL;
    private mediaConstraints = {
        audio: true
    };
    private modes = {
        STAND_BY: 'STAND_BY',
        IN_PROGRESS: 'IN_PROGRESS',
        RECORDING_MADE: 'RECORDING_MADE'
    };
    private mode = this.modes.STAND_BY;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {

    }

    toggleMode(nextMode) {
        this.mode = nextMode;
    }

    start() {
        const onMediaSuccess = stream => {
            this.mediaRecorder = new MediaStreamRecorder(stream);
            this.mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            this.mediaRecorder.ondataavailable = (blob) => {
                // POST/PUT "Blob" using FormData/XHR2
                this.blobURL = URL.createObjectURL(blob);
            };
            this.mediaRecorder.start(60 * 1000);
        };

        const onMediaError = e => this.notificationService.fireError(
            'An error occurred when trying to record an audio.'
        );

        navigator.getUserMedia(this.mediaConstraints, onMediaSuccess, onMediaError);
        this.toggleMode(this.modes.IN_PROGRESS);
    }

    stop() {
        this.mediaRecorder.stop();
        this.toggleMode(this.modes.RECORDING_MADE);
    }

    reset() {
        this.mediaRecorder = null;
        this.toggleMode(this.modes.STAND_BY);
    }

    play() {
        const audioPlayer = new Audio(this.blobURL);
        audioPlayer.play();
    }

    upload() {
        this.onUpload.emit(this.blobURL);
    }

}
