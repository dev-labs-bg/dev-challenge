import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { HttpService } from './http.service';

// TODO: import { User } from "./user.interface";

@Injectable()
export class AuthService {
    isAuth: boolean = false;
    private loginToken: string = localStorage.getItem('cm_token');

    constructor(private router: Router, private httpService: HttpService) {
        /**
         * When the page loads,
         * check if the user is already authenticated or not
         */
        this.isAuthenticated().subscribe(
            authStatus => this.toggleAuthentication(authStatus, this.loginToken)
        );
    }

    login(email, password) {
        this.httpService.post('login', {
            email,
            password
        }).subscribe(
            response => {
                if (response.success) {
                    const { login_token } = response.user;
                    this.toggleAuthentication(true, login_token);
                } else {
                    console.log('Log-in error');
                    this.toggleAuthentication(false);
                }
            },
            error => {
                console.log('Log-in error', error);
                this.toggleAuthentication(false);
            }
        );
    }

    toggleAuthentication(isAuth: boolean, loginToken?: string) {
        this.isAuth = isAuth;

        if (isAuth) {
            localStorage.setItem('cm_token', loginToken);
            this.loginToken = loginToken;

            // TODO: Navigate to the requested route
            this.router.navigate(['dashboard']);

            // TODO: Maybe not here?
            this.httpService.updateHeaders(loginToken);

            console.log('LogIN successful!');
        } else {
            localStorage.removeItem('cm_token');
            this.loginToken = null;

            this.router.navigate(['login']);

            console.log('LogOUT successful!');
        }
    }

    logout() {
        this.httpService.post('logout').subscribe(
            response => {
                if (response.success) {
                    this.toggleAuthentication(false);
                }
            }
        );
    }

    isAuthenticated(): Observable<boolean> {
        const state = new Subject<boolean>();

        if (! this.loginToken) {
            state.next(false);
        }

        this.httpService.post('get-logged-user').subscribe(
            response => state.next(response.success),
            error => state.next(false)
        );

        return state.asObservable();
    }
}
