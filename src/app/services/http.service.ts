import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';

@Injectable()
export class HttpService {
    private API_URL: string = 'http://dev-challenge.dev/';
    private accessToken;

    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'loginToken': localStorage.getItem('xp_login_token')
    });

    constructor(private http: Http) {
        this.setAccessToken();
    }

    post(endPoint: string, params?: Object, headers?: Headers) {

        // const body = JSON.stringify(params);
        const body = params;

        let requestHeaders = headers ? headers : this.headers;

        return this.http.post(this.API_URL + endPoint, body, { headers: requestHeaders })
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

    setAccessToken() {
        let accessToken = localStorage.getItem('xp_access_token');

        if (accessToken != null) {
            this.accessToken = accessToken;
        } else {
            this.generateAccessToken();
        }
    }

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
                localStorage.setItem('xp_access_token', response.access_token);

                this.accessToken = response.access_token;
            }
        );
    }
}
