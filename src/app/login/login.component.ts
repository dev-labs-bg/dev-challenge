import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';

import { AuthService } from '../core/auth.service';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'xp-login',
    template: `
        <div class="center-block login-form">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        id="email"
                        formControlName="email"
                        placeholder="Email"
                        required
                    />
                    <div
                        *ngIf="loginForm.controls['email'].hasError('required') &&
                        loginForm.controls['email'].touched"
                        class="alert alert-danger">
                        You must specify an email.
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        class="form-control"
                        id="password"
                        formControlName="password"
                        placeholder="Password"
                        required
                    />
                    <div
                        *ngIf="loginForm.controls['password'].hasError('required') &&
                        loginForm.controls['password'].touched"
                        class="alert alert-danger">
                        You must specify a password
                    </div>
                </div>
                <button
                    type="submit"
                    class="btn btn-default"
                    [disabled]="!loginForm.valid">
                    Submit
                </button>
                <span>OR</span>
                <a href="http://dev-challenge.dev/auth/github">
                    Login with github
                </a>
            </form>
        </div>
    `,
    styles: [`
        .login-form {
            width: 600px;
        }
    `]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private httpService: HttpService,
        private http: Http,
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

    // githubLogin() {
    //     this.httpService.get('auth/github').subscribe(
    //         response => this.http.get(response.data)
    //             .map((response: Response) => response.json())
    //             .subscribe(
    //                 data => console.log(data)
    //             )
    //     );
    // }

}
