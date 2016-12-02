import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'xp-contributions-status',
    template: `
        <span class="label label-success">
            Awarded!
        </span>
        <div class="alert alert-success">
            <p>Points earned: {{ points }}</p>
        </div>
    `,
    styles: []
})
export class StatusComponent implements OnInit {
    @Input() points: number;

    constructor() { }

    ngOnInit() {
        //
    }

}
