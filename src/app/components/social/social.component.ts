import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {AuthService} from "../../core/auth.service";
import {User} from "../../classes/user";
import {UserService} from "../../shared/user.service";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'xp-social',
  template: `
       <h1>Successfull registration!</h1>
       <p>Just a little more and we're done</p>
       <div [ngSwitch]="currentMode">
            <xp-register-time-investment
                *ngSwitchCase="modes.TIME_INVESTMENT"
                (onSubmit)="handleTimeInvestmentSubmit($event)">
            </xp-register-time-investment>
            <xp-register-additional-info
                *ngSwitchCase="modes.ADDITIONAL_INFO"
                (onSubmit)="handleAdditionalInfoSubmit($event)">
            </xp-register-additional-info>
        </div>
  `,
  styles: []
})
export class SocialComponent implements OnInit {
    private subscription: Subscription;
    private user: User;
    private token: string = '';
    private modes = {
        TIME_INVESTMENT: 0,
        ADDITIONAL_INFO: 1,
    }
    private currentMode = this.modes.TIME_INVESTMENT;
    private userProps: { spent_time: string, category_id: number, date_of_birth: number,
    city: string, university: string, year_of_study: number} = {
        spent_time: '',
        category_id: -1,
        date_of_birth: -1,
        city: '',
        university: '',
        year_of_study: -1,
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                let routeUser = JSON.parse(param['user']);
                this.token = param['token'];

                this.user = this.userService.repository.find(routeUser.id);
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    handleTimeInvestmentSubmit(timeInvestment) {
        this.userProps.spent_time = timeInvestment.spent_time;
        this.userProps.category_id = timeInvestment.category_id;

        this.currentMode = this.modes.ADDITIONAL_INFO;
    }

    handleAdditionalInfoSubmit(additionalInfo) {
        this.userProps.city = additionalInfo.city;
        this.userProps.university = additionalInfo.university;
        this.userProps.year_of_study = additionalInfo.year_of_study;
        this.userProps.date_of_birth = additionalInfo.date_of_birth;

        this.completeSocialReg();
    }

    completeSocialReg() {
        this.httpService.post('complete-social-reg/' + this.user.id, this.userProps).subscribe(
            response => {
                let user = User.newInstance(response.data);
                this.userService.repository.update(user);
                this.authService.toggleAuthenticationState(true, user, this.token, true);
            },
            error => console.log('Oops... registration failed :(', error)
        );
    }

}
