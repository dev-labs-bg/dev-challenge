import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'xp-register-main-info',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['email'].valid &&
                    form.controls['email'].touched
                ">
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
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['password'].valid &&
                    form.controls['password'].touched
                ">
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
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['password_confirmation'].valid &&
                    form.controls['password_confirmation'].touched
                ">
                <label for="password_confirmation">Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    class="form-control"
                    id="password_confirmation"
                    formControlName="password_confirmation"
                    placeholder="Confirm Password"
                    required
                />
                <div *ngIf="form.controls['password_confirmation'].touched">
                    <div
                        *ngIf="form.hasError('mismatchedPasswords')"
                        class="alert alert-danger">
                        Passwords do not match.
                    </div>
                </div>
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['first_name'].valid &&
                    form.controls['first_name'].touched
                ">
                <label for="first_name">First name</label>
                <input
                    type="first_name"
                    name="first_name"
                    class="form-control"
                    id="first_name"
                    formControlName="first_name"
                    placeholder="First Name"
                    required
                />
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['last_name'].valid &&
                    form.controls['last_name'].touched
                ">
                <label for="last_name">Last name</label>
                <input
                    type="last_name"
                    name="last_name"
                    class="form-control"
                    id="last_name"
                    formControlName="last_name"
                    placeholder="Last Name"
                />
             </div>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                Next
            </button>
        </form>
    `
})
export class MainInfoComponent implements OnInit {
    @Output() onSubmit = new EventEmitter();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'password_confirmation': ['', Validators.required],
            'first_name': ['', Validators.required],
            'last_name': ['']
        }, {
           validator: this.matchingPasswords('password', 'password_confirmation')
        });
    }

    private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
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

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }
}
