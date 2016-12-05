import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications';

@Component({
    selector: 'xp-dashboard',
    template: `
        <xp-todos-list></xp-todos-list>
        <xp-experience-block></xp-experience-block>
    `
})
export class DashboardComponent implements OnInit {

    constructor(
        private pushNotificationsService: PushNotificationsService
    ) { }

    ngOnInit() {
        this.pushNotificationsService.requestPermission();
        this.pushNotificationsService.create('Test', {body: 'something'}).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
    }

}
