import {Component, OnInit } from '@angular/core';

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
    private currentMode = this.modes.ADDITIONAL_INFO;
    // TODO: new User();
    private user = { mainInfo: {}, timeInvestment: {}, additionalInfo: {} };

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
    }

    toggleMode(nextMode) {
        this.currentMode = nextMode;
    }

    handleMainInfoSubmit(mainInfo) {
        this.user.mainInfo = mainInfo;
        this.toggleMode(this.modes.TIME_INVESTMENT);
    }

    handleTimeInvestmentSubmit(timeInvestment) {
        this.user.timeInvestment = timeInvestment;
        this.toggleMode(this.modes.ADDITIONAL_INFO);
    }

    handleAdditionalInfoSubmit(additionalInfo) {
        this.user.additionalInfo = additionalInfo;
        // TODO:
        // get form data
        // let formData = this.registerForm.value;
        // formData.date_of_birth = this.currentDate;

        // register user
        // this.authService.register(formData);
    }
}
