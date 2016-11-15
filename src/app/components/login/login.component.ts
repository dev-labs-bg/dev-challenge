import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'xp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    authSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    )
    {
        // navigate away if user is logged
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['dashboard']);
        }
    }

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
