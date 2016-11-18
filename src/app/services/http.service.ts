import { Injectable, OnInit } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {
    API_ENDPOINT, API_AUTH_ENDPOINT, CLIENT_SECRET, CLIENT_ID
} from '../config';
import { NotificationService } from '../shared/notification.service';

@Injectable()
export class HttpService implements OnInit {
    private accessToken;

    public headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('xp_access_token'),
        'loginToken': localStorage.getItem('xp_login_token')
    });

    constructor(
        private http: Http,
        private notificationService: NotificationService
    ) {
        // Bind the `this` context
        this.handleError = this.handleError.bind(this);
    }

    ngOnInit() {
        this.setAccessToken();
    }

    /**
     * Get request
     *
     * @param endPoint
     * @param params
     * @returns {Observable<R>}
     */
    get(endPoint: string, params?: Object) {
        return this.http.get(API_ENDPOINT + endPoint, { headers: this.headers })
            .map((response: Response) => response.json())
            .map(response => {
                /**
                 * The Server might return 200, but with `success = false`,
                 * example: requesting a missing item.
                 * This is an error case too. Throw an error,
                 * so the request does not continue!
                 * Stop the further execution, go directly to the catch state.
                 */
                if (! response.success) {
                    throw(new Error(response.error));
                }

                return response;
            })
            .catch(this.handleError);
    }

    /**
     * Post request
     *
     * @param endPoint - api url
     * @param params - post data
     * @returns {Observable<R>}
     */
    post(endPoint: string, params?: Object) {

        const body = JSON.stringify(params);

        return this.http.post(API_ENDPOINT + endPoint, body, { headers: this.headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {
                return response;
            });
    }

    /**
     * Put request
     *
     * @param endPoint - api url
     * @param params - post data
     * @returns {Observable<R>}
     */
    put(endPoint: string, params?: Object) {

        const body = JSON.stringify(params);

        return this.http.put(API_ENDPOINT + endPoint, body, { headers: this.headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {
                return response;
            });
    }

    /**
     * Delete request
     *
     * @param endPoint
     * @param params
     * @returns {Observable<R>}
     */
    delete(endPoint: string, params?: Object) {

        return this.http.delete(API_ENDPOINT + endPoint, { headers: this.headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {
                return response;
            });
    }

    /**
     * Modify a header
     *
     * @param param - header key
     * @param value - header value
     */
    updateHeader(param, value) {
        this.headers.set(param, value);
    }

    /**
     * accessToken setter
     */
    setAccessToken() {
        this.accessToken = localStorage.getItem('xp_access_token');

        if (this.accessToken == null) {
            this.generateAccessToken();
        }
    }

    /**
     * Get the access token
     *
     * @returns string accessToken
     */
    getAccessToken() {
        return this.accessToken;
    }

    /**
     * Generate an access token
     *
     * @return void
     * TO DO: refactor this to an observable
     */
    generateAccessToken() {
        // set post params
        let oAuth2Params = new URLSearchParams();
        oAuth2Params.append('client_id', CLIENT_ID);
        oAuth2Params.append('client_secret', CLIENT_SECRET);
        oAuth2Params.append('username', 'account@devlabs.bg');
        oAuth2Params.append('password', '[H,U2F?vH^j9$j}4');
        oAuth2Params.append('grant_type', 'password');
        oAuth2Params.append('scope', '');
        let body = oAuth2Params.toString();

        // change content type so we could
        // make an oAuth2 request
        let oAuth2Headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        this.http.post(`${API_AUTH_ENDPOINT}/token`, body, { headers: oAuth2Headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {
                return response;
            }).subscribe(
            function (response) {
                localStorage.setItem('xp_access_token', 'Bearer ' + response.access_token);

                this.accessToken = response.access_token;
            }
        );
    }

    handleError(error: any) {
        const errorMsg = 'An error occurred. Please refresh and try again.';
        this.notificationService.fireError(errorMsg);

        return Observable.throw(errorMsg);
    }
}
