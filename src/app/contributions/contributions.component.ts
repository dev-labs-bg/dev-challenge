import { Component } from '@angular/core';

@Component({
    selector: 'xp-contributions',
    template: `
        <h1>Bonus Experience Points</h1>
        <p>Here you could fill out some interesting information about yourself and earn some experience points while you're at it!</p>
        <p>Each column below represents something that we value highly. Feel free to fill them in and gain some points after the admin validates. :)</p>
        <div class="form-group">
                <xp-stack-overflow></xp-stack-overflow>
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
