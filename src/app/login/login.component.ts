import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import Utils from '../shared/utils';

import { GITHUB_ENDPOINT } from '../config';

@Component({
    selector: 'xp-login',
    template: `
        <div class="row">
            <div class="col-sm-8 col-sm-push-2">
                <h3>Вхoд</h3>
                <div *ngIf="message.length" class="alert alert-danger">{{ message }}</div>
                <form [formGroup]="form" (ngSubmit)="onSubmit()">
                    <div class="form-group"
                        [class.has-error]="
                            ! form.controls['email'].valid &&
                            form.controls['email'].touched
                        ">
                        <input
                            #email
                            type="email"
                            name="email"
                            class="form-control"
                            formControlName="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div class="form-group"
                        [class.has-error]="
                            ! form.controls['password'].valid &&
                            form.controls['password'].touched
                        ">
                        <input
                            type="password"
                            name="password"
                            class="form-control"
                            formControlName="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        [disabled]="! form.valid">
                        Хайде!
                    </button>
                    <a
                        href="{{ GITHUB_ENDPOINT }}"
                        class="btn btn-link btn-lg">
                        ... or login with github
                    </a>
                </form>
            </div>
        </div>
    `
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    message: string = '';
    GITHUB_ENDPOINT: string = GITHUB_ENDPOINT;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {

        if (this.router.url === '/login/duplicate-email') {
            this.message = 'Email has already been taken';
        }

        // init form and set rules
        this.form = this.formBuilder.group({
            'email': ['', Validators.compose([
                Validators.required, this.validatorMailFormat
            ])],
            'password': ['', Validators.required]
        });
    }

    validatorMailFormat(control: FormControl) {
        if (! Utils.isValidEmail(control.value)) {
            return { 'incorrectMailFormat': true };
        }

        return null;
    }

    onSubmit() {
        const { email, password } = this.form.value;

        this.authService.login(email, password);
    }
}
