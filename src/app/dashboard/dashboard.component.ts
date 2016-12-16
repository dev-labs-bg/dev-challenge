import { Component } from '@angular/core';

@Component({
    selector: 'xp-dashboard',
    template: `
        <xp-experience-block></xp-experience-block>

        <xp-todos-list></xp-todos-list>

        <xp-one-signal-notifications></xp-one-signal-notifications>
    `
})
export class DashboardComponent {

    constructor() { }

}
