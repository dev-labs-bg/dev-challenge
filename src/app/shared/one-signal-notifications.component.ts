import { Component, OnInit } from '@angular/core';

import { ONE_SIGNAL_APP_KEY } from '../config';
import { AuthService } from '../services/auth.service';
import { User } from '../classes/user';

@Component({
  selector: 'xp-one-signal-notifications',
  template: ``,
  styles: []
})
export class OneSignalNotificationsComponent implements OnInit {
    private loggedUser: User;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();

        let OneSignalClient = window['OneSignal'] || [];

        OneSignalClient.push(["init", {
            appId: ONE_SIGNAL_APP_KEY,
            autoRegister: true, /* Set to true to automatically prompt visitors */
            subdomainName: 'http://dev-challenge.onesignal.com',
            notifyButton: {
                enable: true /* Set to false to hide */
            },
            persistNotification: false,
        }]);

        OneSignalClient.push(["sendTags", {email: this.loggedUser.email}]);
    }

}
