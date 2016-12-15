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
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { NotificationService } from './notification.service';

// That is the only way to import the plugin
const MediaStreamRecorder = require('msr');

@Component({
    selector: 'xp-audio-recorder',
    template: `
        <button *ngIf="mode === modes.STAND_BY" class="btn btn-primary" (click)="start()">Start</button>

        <div *ngIf="mode === modes.IN_PROGRESS">
            <button class="btn btn-default" (click)="stop()">Stop</button>
            / {{ timerLimit - timerCurrentValue }} seconds remaining
        </div>

        <div *ngIf="mode === modes.RECORDING_MADE">
            <xp-audio-player [source]="blobURL"></xp-audio-player>

            <button class="btn btn-danger" (click)="reset()">Reset</button>
            <button class="btn btn-success" (click)="upload()">Upload</button>
        </div>
    `,
    styles: []
})
export class AudioRecorderComponent implements OnDestroy {
    @Output() private onUpload = new EventEmitter();
    private mediaRecorder; // :MediaStreamRecorder instance
    private blobURL;
    private audio;
    private mediaConstraints = {
        audio: true
    };
    private modes = {
        STAND_BY: 'STAND_BY',
        IN_PROGRESS: 'IN_PROGRESS',
        RECORDING_MADE: 'RECORDING_MADE'
    };
    private mode = this.modes.STAND_BY;
    private timer: Subscription;
    private timerCurrentValue: number = 0;
    private timerLimit: number = 60; // seconds

    constructor(private notificationService: NotificationService) { }

    toggleMode(nextMode) {
        this.mode = nextMode;
    }

    start() {
        const onMediaSuccess = stream => {
            this.mediaRecorder = new MediaStreamRecorder(stream);
            this.mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            this.mediaRecorder.ondataavailable = (blob) => {
                this.audio = blob;
                this.blobURL = URL.createObjectURL(blob);
            };
            this.mediaRecorder.start(this.timerLimit * 1000);
        };

        const onMediaError = e => this.notificationService.fireError(
            'An error occurred when trying to record an audio.'
        );

        navigator.getUserMedia(this.mediaConstraints, onMediaSuccess, onMediaError);
        this.toggleMode(this.modes.IN_PROGRESS);

        // Add 1 second buffer
        const limit = this.timerLimit * 1000;
        this.startTimer(limit);
    }

    stop() {
        this.mediaRecorder.stop();
        this.clearTimer();

        this.toggleMode(this.modes.RECORDING_MADE);
    }

    reset() {
        this.timer.unsubscribe();

        this.mediaRecorder = null;
        this.audio = null;
        this.blobURL = null;

        this.toggleMode(this.modes.STAND_BY);
    }

    upload() {
        this.onUpload.emit(this.audio);
    }

    clearTimer() {
        this.timerCurrentValue = 0;

        if (this.timer) {
            this.timer.unsubscribe();
        }
    }

    startTimer(duration) {
        this.clearTimer();

        this.timer = Observable.timer(0, 1000)
            .subscribe( t => {
                this.timerCurrentValue = t;

                if (this.timerCurrentValue * 1000 >= duration) {
                    this.stop();
                    this.clearTimer();
                }
            });
    }

    ngOnDestroy() {
        if (this.timer) {
            this.timer.unsubscribe();
        }
    }
}
