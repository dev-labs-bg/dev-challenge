import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
    private API_URL: string = 'http://api.XXX.dev/';
    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'loginToken': localStorage.getItem('cm_token')
    });

    constructor(private http: Http) {

    }

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

    updateHeaders(nextToken) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'loginToken': nextToken
        });
    }
}
