import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xp-contributions',
  template: `
    <h1>Greetings, friend</h1>
    <p>Here you could fill out some interesting information about yourself and earn some experience points while you're at it!</p>
    <p>Each column below represents something that we value highly. Feel free to fill them in and gain some points after the admin validates. :)</p>
    <div class="form-group">
        <h2>Stack overflow account</h2>
        <p>Try to earn some points by giving your stack overflow account</p>
        <a href="javascript:;" (click)="showStackOverflow()">Click here</a>
        <xp-stack-overflow
            *ngIf="stackOverflow"
            (onCancel)="handleCancel($event)">
        </xp-stack-overflow>
    </div>
  `,
  styles: []
})
export class ContributionsComponent implements OnInit {
    private stackOverflow: boolean = false;

    constructor() { }

    ngOnInit() {
        //
    }

    showStackOverflow() {
        return this.stackOverflow = true;
    }

    handleCancel() {
        return this.stackOverflow = false;
    }

}
