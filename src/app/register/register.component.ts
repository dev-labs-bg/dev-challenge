import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { User } from '../classes/user';
import { AuthService } from '../core/auth.service';
import { REGISTRATION_MODES } from './constants';

@Component({
    selector: 'xp-register',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <div [ngSwitch]="currentMode">

                <xp-register-prerequisites
                    *ngSwitchCase="modes.PREREQUISITES"
                    (onToggleMode)="toggleMode(modes.MAIN_INFO)">
                </xp-register-prerequisites>

                <xp-register-main-info
                    *ngSwitchCase="modes.MAIN_INFO"
                    (onSubmit)="handleMainInfoSubmit($event)"
                    [user]="user">
                </xp-register-main-info>

                <xp-register-time-investment
                    *ngSwitchCase="modes.TIME_INVESTMENT"
                    (onSubmit)="handleTimeInvestmentSubmit($event)"
                    (goToPreviousStep)="toggleMode($event)"
                    [userProps]="userProps">
                </xp-register-time-investment>

                <xp-register-additional-info
                    *ngSwitchCase="modes.ADDITIONAL_INFO"
                    (onSubmit)="handleAdditionalInfoSubmit($event)"
                    (goToPreviousStep)="toggleMode($event)">
                </xp-register-additional-info>

                <xp-register-verify-email
                    [email]="user.email"
                    *ngSwitchCase="modes.VERIFY_EMAIL">
                </xp-register-verify-email>

            </div>
        </xp-loading-indicator>
    `
})
export class RegisterComponent {
    private subscription: Subscription;
    private modes: any = REGISTRATION_MODES;
    
    private currentMode = this.modes.PREREQUISITES;
    private user: User = new User();
    // Additional user attributes
    private userProps: { password: string, spent_time: string, city: string,
        university: string, year_of_study: number, date_of_birth: string, category_id: number } = {
        password: '',
        spent_time: '',
        city: '',
        university: '',
        year_of_study: -1,
        date_of_birth: '',
        category_id: -1
    };

    constructor(private authService: AuthService) {}

    toggleMode(nextMode) {
        this.currentMode = nextMode;
    }

    handleMainInfoSubmit(mainInfo) {
        const { email, password, first_name, last_name } = mainInfo;

        this.user.email = email;
        this.user.first_name = first_name;
        this.user.last_name = last_name;
        this.userProps.password = password;

        this.toggleMode(this.modes.TIME_INVESTMENT);
    }

    handleTimeInvestmentSubmit(timeInvestment) {
        this.userProps.spent_time = timeInvestment.spent_time;
        this.userProps.category_id = timeInvestment.category_id;

        this.toggleMode(this.modes.ADDITIONAL_INFO);
    }

    handleAdditionalInfoSubmit(additionalInfo) {
        const {
            city, university, year_of_study, date_of_birth
        } = additionalInfo;

        this.userProps.city = city;
        this.userProps.university = university;
        this.userProps.year_of_study = year_of_study;
        this.userProps.date_of_birth = date_of_birth + "-01-01";

        this.subscription = this.authService.register(this.user, this.userProps).subscribe(
            response => this.toggleMode(this.modes.VERIFY_EMAIL),
            error => console.log('Registration failed!', error)
        );
    }
}
