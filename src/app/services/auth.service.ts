import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from './http.service';
import { User } from '../classes/user';

@Injectable()
export class AuthService {
    private loginToken: string = null;
    private loggedUser: User;
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
                authService.toggleAuthentication(true, response.user, response.loginToken);
                return true;
            },
            error => {
                console.log('Login failed!', error);

                this.loginFail = true;
                return false;
            }
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
     * Get the logged user
     *
     * @returns {User}
     */
    getLoggedUser() {
        return this.loggedUser;
    }

    /**
     * Set the logged user instance
     *
     * @param user
     */
    setLoggedUser(user: User) {
        return this.loggedUser = User.newInstance(user);
    }

    /**
     * Change authentication state
     *
     * @param isAuth - is the user logged in
     * @param loginToken - user's login token if logged in
     * @returns void
     */
    toggleAuthentication(isAuth: boolean, user?: User, loginToken?: string) {
        if (isAuth) {
            localStorage.setItem('xp_login_token', loginToken);
            this.setLoginToken(loginToken);
            this.setLoggedUser(user);

            // TODO: Maybe not here?
            this.httpService.updateHeader('loginToken', loginToken);

            // redirect only if current route is login
            if (this.router.url === '/login') {
                this.router.navigate(['dashboard']);
            }
        } else {
            localStorage.removeItem('xp_login_token');
            this.setLoginToken(null);
            this.loggedUser = null;

            this.httpService.updateHeader('loginToken', null);

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
                this.toggleAuthentication(false);
            },
            error => console.log('Logout failed! ', error)
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

    register(user: User, userProps) {
        const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: userProps.password,
            spent_time: userProps.spent_time,
            date_of_birth: userProps.date_of_birth,
            city: userProps.city,
            university: userProps.university,
            year_of_study: userProps.year_of_study,
            category_id: userProps.category_id,
        };

        return this.httpService.post('register', data);
    }

    /**
     * Activate account api request
     *
     * @param email - user email
     * @param token - user token
     * @returns void
     */
    activateAccount(email, token) {
        this.httpService.post(`account/activate/${email}/${token}`).subscribe(
            response => {
                this.successfulActivation = true;
            },
            error => {
                this.successfulActivation = false;

                console.log('Account activation failed!', error);
            }
        );
    }

    /**
     * Get logged user from api and
     * send it back as a Promise.
     * User for canActivate guard
     *
     * @returns {Promise<T>|Promise}
     */
    isUserLogged(): Promise<boolean> | boolean {
        let userInstance = this.getLoggedUser();

        if (userInstance != null) {
            return true;
        }

        return new Promise(resolve => {
            this.httpService.get('get-logged-user').subscribe(
                response => {
                    this.toggleAuthentication(true, response.user, response.loginToken);
                    resolve(true);
                },
                error => {
                    this.toggleAuthentication(false);
                    // `resolve`, no `reject`, since we're using this method on a guard
                    resolve(false);

                    console.log('Could not check if user is logged-in. ', error);
                }
            );
        });
    }

    /**
     * Check if the user is admin via API and
     * send it back as a Promise.
     * User for canActivate admin guard
     *
     * @returns {Promise<T>|Promise}
     */
    isUserAdmin(): Promise<boolean> | boolean {
        let userInstance = this.getLoggedUser();

        if (userInstance != null) {
            return userInstance.isAdmin();
        }

        return new Promise((resolve, reject) => {
            this.httpService.get('get-logged-user').subscribe(
                response => {
                    this.toggleAuthentication(true, response.user, response.loginToken);

                    let adminGuardUser: User = User.newInstance(response.user);
                    resolve(adminGuardUser.isAdmin());
                },
                error => {
                    this.toggleAuthentication(false);
                    // `resolve`, no `reject`, since we're using this method on a guard
                    resolve(false);

                    console.log('Could not check if user is admin.', error);
                }
            );
        });
    }
}
