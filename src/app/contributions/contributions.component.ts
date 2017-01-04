import { Component } from '@angular/core';

@Component({
    selector: 'xp-contributions',
    template: `
        <h1>Bonus Experience Points</h1>
        <p>You can earn experience points for each of the 4 activities listed below.</p>
        <p>
            Each of these represents something that we value highly.
            Feel free to make a submission,
            a person from our team will take a look and
            will assign to you <strong>up to 25 bonus experience points</strong> per activity.
        </p>
        <hr />
        <div class="form-group">
            <xp-stack-overflow></xp-stack-overflow>
            <hr />
            <xp-public-activity></xp-public-activity>
            <xp-side-project></xp-side-project>
            <xp-open-source></xp-open-source>
        </div>
    `,
    styles: []
})
export class ContributionsComponent {

    constructor() {}

}
