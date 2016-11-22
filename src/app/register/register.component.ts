import {Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'xp-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    currentDate = new Date();
    maxDate: Date = new Date();
    private mode: string = 'PREREQUISITES';
    // TODO: new User();
    private user = { mainInfo: {} };

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'password_confirmation': ['', Validators.required],
            'first_name': ['', Validators.required],
            'last_name': ['', Validators.required],
            'city': ['', Validators.required],
            'university': [''],
            'year_of_study': [''],
            'spent_time': ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'password_confirmation')});
    }

    toggleMode(nextMode) {
        this.mode = nextMode;
    }

    handleMainInfoSubmit(mainInfo) {
        this.user.mainInfo = mainInfo;
        this.toggleMode('CHOOSE_TIME_INVESTMENT');
    }

    onSubmit() {
        // get form data
        let formData = this.registerForm.value;
        formData.date_of_birth = this.currentDate;

        // register user
        this.authService.register(formData);
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }
}
