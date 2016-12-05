import { Component } from '@angular/core';

@Component({
    selector: 'xp-dashboard',
    template: `
        <xp-todos-list></xp-todos-list>
        <xp-experience-block></xp-experience-block>
        <xp-one-signal-notifications></xp-one-signal-notifications>
    `
})
export class DashboardComponent {

    constructor() { }

}
