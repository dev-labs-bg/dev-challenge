import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {AuthService} from "../../services/auth.service";
import {User} from "../../classes/user";

@Component({
  selector: 'xp-social',
  template: ``,
  styles: []
})
export class SocialComponent implements OnInit {
    private subscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) { }

  ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {

                let routeUser = JSON.parse(param['user']);
                let token = param['token'];

                return this.authService.toggleAuthentication(true, routeUser, token, true);
            }
        );
  }

  ngOnDestroy() {
        this.subscription.unsubscribe();
  }

}
