import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import Utils from '../shared/utils';

@Component({
    selector: 'xp-login',
    template: `
        <div class="row">
            <div class="col-sm-8 col-sm-push-2">
                <h3>Вхoд</h3>
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
                        href="http://dev-challenge.dev/auth/github"
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

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit() {
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
