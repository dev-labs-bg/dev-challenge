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

// That is the only way to import the plugin
const MediaStreamRecorder = require('msr');

@Component({
    selector: 'xp-audio-recorder',
    template: `
        <button class="btn btn-primary" (click)="start()">Start</button>
        <button class="btn btn-default" (click)="stop()">Stop</button>
        <button class="btn btn-default" (click)="save()">Save</button>
        <button class="btn btn-success" (click)="play()">Play</button>
        <button class="btn btn-success" (click)="download()">Download</button>
        <button class="btn btn-success" (click)="upload()">Upload</button>
    `,
    styles: []
})
export class AudioRecorderComponent implements OnInit {
    @Output() private onUpload = new EventEmitter();
    private mediaRecorder; // :MediaStreamRecorder instance
    private blobURL;

    constructor() { }

    ngOnInit() {

    }

    start() {
        const mediaConstraints = {
            audio: true
        };

        const onMediaSuccess = stream => {
            this.mediaRecorder = new MediaStreamRecorder(stream);
            this.mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            this.mediaRecorder.ondataavailable = (blob) => {
                // POST/PUT "Blob" using FormData/XHR2
                this.blobURL = URL.createObjectURL(blob);
            };
            this.mediaRecorder.start(60 * 1000);
        };

        function onMediaError(e) {
            console.error('media error', e);
        }

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    }

    stop() {
        this.mediaRecorder.stop();
    }

    download() {
        this.mediaRecorder.save();
    }

    play() {
        const audioPlayer = new Audio();
        audioPlayer.src = this.blobURL;
        audioPlayer.play();
    }

    upload() {
        this.onUpload.emit(this.blobURL);
    }

}
