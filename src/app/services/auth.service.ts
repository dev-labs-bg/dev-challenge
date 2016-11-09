import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { HttpService } from './http.service';

// TODO: import { User } from "./user.interface";

@Injectable()
export class AuthService {
    private loginToken: string = null;
    public successfulRegistration: boolean = false;
    public successfulActivation: boolean = null;
    public loginFail: boolean = false;

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
        this.loginFail = false;

        // call login
        this.httpService.post('login', {
            email,
            password
        }).subscribe(
            response => {
                if (response.success) {
                    authService.toggleAuthentication(true, response.loginToken);
                    return true;
                } else {
                    this.loginFail = true;
                }

                return false;
            },
            error => console.log(error)
        );
    }

    /**
     * Get login token
     *
     * @param value
     * @returns this.loginToken
     */
    getLoginToken() {
        return this.loginToken;
    }

    /**
     * Set login token value
     *
     * @param value
     */
    setLoginToken(value) {
        this.loginToken = value;
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
            this.setLoginToken(loginToken);

            // TODO: Maybe not here?
            this.httpService.updateHeader("loginToken", loginToken);

            // TODO: Navigate to the requested route
            this.router.navigate(['dashboard']);
        } else {
            localStorage.removeItem('xp_login_token');
            this.setLoginToken(null);

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
        return Boolean(this.getLoginToken());
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

    activateAccount(email, token) {
        this.httpService.post('account/activate/'+ email +'/' + token).subscribe(
            response => {
                if (response.success) {
                    this.successfulActivation = true;
                } else {
                    this.successfulActivation = false;
                }
            },
            error => console.log(error)
        );
    }

    isUserLogged() {
        let authService = this;

        return new Promise(function (resolve, reject) {
            authService.httpService.get('get-logged-user').subscribe(
                response => resolve(response.success),
                error => reject(error)
            );
        });
    }
}
