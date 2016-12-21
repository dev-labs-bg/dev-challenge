import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { User } from '../classes/user';

@Injectable()
export class AuthService {
    private loginToken: string = null;
    private loggedUser: User;
    public successfulActivation: boolean = null;
    public loginFail: boolean = false;
    private loggedIn: boolean = false;
    private isServerAuthCheckPerformed: boolean = false;

    constructor(
        private router: Router,
        private httpService: HttpService
    ) {}

    init() {
        this.toggleServerAuthenticationCheck();
    }

    /**
     * Access the flag if user is logged-in or not.
     *
     * @return {boolean}
     */
    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    /**
     * Change the app authentication state
     * and therefore perform all necessary initializations / resets / clean-up
     * depending on if user logs in or out.
     *
     * @param {boolean}    isAuth - flag if user is authenticated
     * @param {User}       user
     * @param {string}     loginToken
     * @param {boolean}    redirect - if user should be redirected or not
     */
    toggleAuthenticationState(
        isAuth: boolean,
        user?: User,
        loginToken?: string,
        redirect: boolean = false
    ): void {
        this.loggedIn = isAuth;

        if (isAuth) {
            localStorage.setItem('xp_login_token', loginToken);
            this.setLoginToken(loginToken);
            this.setLoggedUser(user);

            this.httpService.updateHeader('loginToken', loginToken);

            // redirect only if current route is login
            if (this.router.url === '/login' || redirect) {
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
     * Toggle an API call that checks if user is currently logged-in or not.
     * Having this info available, toggle the authentication set-up logic,
     * inside the `toggleAuthenticationState` method.
     *
     * @return {Promise<boolean>}
     */
    toggleServerAuthenticationCheck(): Promise<boolean> {
       return new Promise( resolve => {
            this.httpService.get('get-logged-user').subscribe(
                response => {
                    this.toggleAuthenticationState(true, response.user, response.loginToken);
                    this.isServerAuthCheckPerformed = true;

                    resolve(true);
                },
                error => {
                    this.toggleAuthenticationState(false);
                    this.isServerAuthCheckPerformed = true;

                    resolve(false);
                }
            );
        });
    }

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
                authService.toggleAuthenticationState(true, response.user, response.loginToken);
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
     * Logout API request
     *
     * @returns void
     */
    logout() {
        this.httpService.post('logout').subscribe(
            response => {
                this.toggleAuthenticationState(false);
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
                    this.toggleAuthenticationState(true, response.user, response.loginToken);

                    let adminGuardUser: User = User.newInstance(response.user);
                    resolve(adminGuardUser.isAdmin());
                },
                error => {
                    this.toggleAuthenticationState(false);
                    // `resolve`, no `reject`, since we're using this method on a guard
                    resolve(false);

                    console.log('Could not check if user is admin.', error);
                }
            );
        });
    }
}
