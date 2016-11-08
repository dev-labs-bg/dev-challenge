import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { HttpService } from './http.service';

// TODO: import { User } from "./user.interface";

@Injectable()
export class AuthService {
    private loginToken: string = localStorage.getItem('xp_login_token');
    successfulRegistration: boolean = false;

    constructor(
        private router: Router,
        private httpService: HttpService
    ) {}

    /**
     * Login API request
     *
     * @param email
     * @param password
     * @returns void
     */
    login(email, password) {
        // instantiate authService
        let authService = this;

        // call login
        this.httpService.post('login', {
            email,
            password
        }).subscribe(
            response => {
                if (response.success) {
                    authService.toggleAuthentication(true, response.loginToken);
                    return true;
                }

                return false;
            },
            error => console.log(error)
        );
    }

    /**
     * Change authentication state
     *
     * @param isAuth - is the user logged in
     * @param loginToken - user's login token if logged in
     * @returns void
     */
    toggleAuthentication(isAuth: boolean, loginToken?: string) {
        if (isAuth) {
            localStorage.setItem('xp_login_token', loginToken);
            this.loginToken = loginToken;

            // TODO: Maybe not here?
            this.httpService.updateHeader("loginToken", loginToken);

            // TODO: Navigate to the requested route
            this.router.navigate(['dashboard']);
        } else {
            localStorage.removeItem('xp_login_token');
            this.loginToken = null;

            this.httpService.updateHeader("loginToken", null);

            this.router.navigate(['login']);
        }
    }

    /**
     * Logout API request
     *
     * @returns void
     */
    logout() {
        this.httpService.post('logout').subscribe(
            response => {
                if (response.success) {
                    this.toggleAuthentication(false);
                }
            }
        );
    }

    /**
     * Check if user is authenticated
     *
     * @returns {Observable<boolean>}
     */
    isAuthenticated(): boolean {
        return Boolean(this.loginToken);
    }

    /**
     * Get logged user
     *
     * @returns {Observable<T>}
     */
    getLoggedUser() {
        this.httpService.get('get-logged-user').subscribe(
            response => {
                if (response.success) {
                    return response.user
                }

                return false;
            },
            error => console.log(error)
        );
    }

    register(data) {
        this.httpService.post('register', data).subscribe(
            response => {
                if (response.success) {
                    this.successfulRegistration = true;
                    this.router.navigate(['login']);
                }

                return false;
            },
            error => console.log(error)
        );
    }
}
