import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { HttpService } from './http.service';

// TODO: import { User } from "./user.interface";

@Injectable()
export class AuthService {
    isAuth: boolean = false;
    private loginToken: string = localStorage.getItem('xp_login_token');

    constructor(
        private router: Router,
        private httpService: HttpService
    ) {}

    login(email, password) {
        // instantiate authService
        let authService = this;

        // call login
        this.httpService.post('login', {
            email,
            password
        }).subscribe(
            response => authService.toggleAuthentication(response.success, response.loginToken),
            error => console.log(error)
        );
    }

    toggleAuthentication(isAuth: boolean, loginToken?: string) {
        this.isAuth = isAuth;

        if (isAuth) {
            localStorage.setItem('xp_login_token', loginToken);
            this.loginToken = loginToken;

            // TODO: Navigate to the requested route
            this.router.navigate(['dashboard']);

            // TODO: Maybe not here?
            this.httpService.updateHeaders(loginToken);

            console.log('LogIN successful!');
        } else {
            localStorage.removeItem('xp_login_token');
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

        this.httpService.get('get-logged-user').subscribe(
            response => state.next(response.success),
            error => state.next(false)
        );

        return state.asObservable();
    }
}
