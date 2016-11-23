import {Component, OnInit } from '@angular/core';

import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'xp-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    private modes = {
        PREREQUISITES: 0,
        MAIN_INFO: 1,
        TIME_INVESTMENT: 2,
        ADDITIONAL_INFO: 3
    };
    private currentMode = this.modes.PREREQUISITES;
    // TODO: new User();
    // private user = { mainInfo: {}, timeInvestment: {}, additionalInfo: {} };
    private user: User = new User();
    private userProps: { password: string, spent_time: string, city: string,
        university: string, year_of_study: number, date_of_birth: number } = {
        password: '',
        spent_time: '',
        city: '',
        university: '',
        year_of_study: -1,
        date_of_birth: -1
    };

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
    }

    toggleMode(nextMode) {
        this.currentMode = nextMode;
    }

    handleMainInfoSubmit(mainInfo) {
        const { email, password, first_name } = mainInfo;

        this.user.email = email;
        this.user.first_name = first_name;
        this.userProps.password = password;

        this.toggleMode(this.modes.TIME_INVESTMENT);
    }

    handleTimeInvestmentSubmit(timeInvestment) {
        this.userProps.spent_time = timeInvestment.spent_time;

        this.toggleMode(this.modes.ADDITIONAL_INFO);
    }

    handleAdditionalInfoSubmit(additionalInfo) {
        const {
            last_name, city, university, year_of_study, date_of_birth
        } = additionalInfo;

        this.user.last_name = last_name;
        this.userProps.city = city;
        this.userProps.university = university;
        this.userProps.year_of_study = year_of_study;
        this.userProps.date_of_birth = date_of_birth;

        this.authService.register(this.user, this.userProps);
    }
}
