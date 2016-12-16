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
import { Component, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { NotificationService } from './notification.service';

// That is the only way to import the plugin
const MediaStreamRecorder = require('msr');

@Component({
    selector: 'xp-audio-recorder',
    template: `
        <div class="mb-">
            <button *ngIf="mode === modes.STAND_BY" class="btn btn-primary" (click)="start()">
                <i class="glyphicon glyphicon-record" aria-hidden="true"></i>
                Start Recording
            </button>

            <div *ngIf="mode === modes.IN_PROGRESS">
                <button class="btn btn-default" (click)="stop()">
                    <i class="glyphicon glyphicon-stop" aria-hidden="true"></i>
                    Stop
                </button>
                &nbsp;&nbsp; {{ timerLimit - timerCurrentValue }} seconds remaining
            </div>

            <xp-audio-player
                *ngIf="mode === modes.RECORDING_MADE"
                [source]="blobURL">
            </xp-audio-player>
        </div>

        <div *ngIf="mode === modes.RECORDING_MADE">
            <button class="btn btn-danger" (click)="reset()">Reset</button>
            <button class="btn btn-success" (click)="upload()">{{ uploadText }}</button>
        </div>
    `,
    styles: []
})
export class AudioRecorderComponent implements OnDestroy {
    @Input() private uploadText: string = 'Upload';
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
