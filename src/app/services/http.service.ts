import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';

@Injectable()
export class HttpService {
    private API_URL: string = 'http://dev-challenge.dev/api/';
    private accessToken;

    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('xp_access_token'),
        'loginToken': localStorage.getItem('xp_login_token')
    });

    constructor(private http: Http) {
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

        return this.http.get(this.API_URL + endPoint, { headers: this.headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {

                if (! response.success) {
                    this.onError(response);
                }

                return response;
            });
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

        return this.http.post(this.API_URL + endPoint, body, { headers: this.headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {

                if (! response.success) {
                    this.onError(response);
                }

                return response;
            });
    }

    onError(error) {
        console.log('error', error);
    }

    updateHeaders(headers) {
        this.headers = headers;
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
        oAuth2Params.append('client_id', "1");
        oAuth2Params.append('client_secret', "UwM3I5yyY7dFuI14lLh8hIN7g4rKipVX5dWmPE3r");
        oAuth2Params.append('username', "account@devlabs.bg");
        oAuth2Params.append('password', "[H,U2F?vH^j9$j}4");
        oAuth2Params.append('grant_type', "password");
        oAuth2Params.append('scope', "");
        let body = oAuth2Params.toString();

        // change content type so we could
        // make an oAuth2 request
        let oAuth2Headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        this.http.post(this.API_URL + 'oauth/token', body, { headers: oAuth2Headers })
            .map((response: Response) => response.json())
            .map( (response: any) => {
                return response;
            }).subscribe(
            function (response) {
                localStorage.setItem('xp_access_token', "Bearer " + response.access_token);

                this.accessToken = response.access_token;
            }
        );
    }
}
