import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'xp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // init form and set rules
        this.loginForm = this.formBuilder.group({
            'email': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    // login form submission
    onSubmit() {
        // get form values
        const { email, password } = this.loginForm.value;

        // call login
        this.authService.login(email, password);
    }

}
