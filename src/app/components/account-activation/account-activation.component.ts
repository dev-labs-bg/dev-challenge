import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'xp-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        let email = param['email'];
        let token = param['token'];

        this.authService.activateAccount(email, token);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
