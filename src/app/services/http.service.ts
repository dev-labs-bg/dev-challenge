import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import {
    API_ENDPOINT, APPLICATION_TOKEN
} from '../config';
import { NotificationService } from '../shared/notification.service';

@Injectable()
export class HttpService {
    private accessToken;

    public headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': APPLICATION_TOKEN,
        'loginToken': localStorage.getItem('xp_login_token')
    });

    constructor(
        private http: Http,
        private notificationService: NotificationService
    ) {
        // Bind the `this` context
        this.handleError = this.handleError.bind(this);
    }

    /**
     * The Server might return 200, but with `success = false`,
     * example: requesting a missing item.
     * This is an error case too. Throw an error,
     * so the request does not continue!
     * Stop the further execution, go directly to the catch state.
     */
    checkServerSuccess(response) {
        if (! response.success) {
            throw(new Error(response.error));
        }

        return response;
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
            .map(this.checkServerSuccess)
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
            .map(this.checkServerSuccess)
            .catch(this.handleError);
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
            .map(this.checkServerSuccess)
            .catch(this.handleError);
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
            .map(this.checkServerSuccess)
            .catch(this.handleError);
    }

    upload(endPoint: string, data) {
        var formData = new FormData();
        _.forEach(data, (value, key) => {
            formData.append(key, value);
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
         if (this.readyState === 4) {
           console.log(this.responseText);
         }
        });

        xhr.open('POST', API_ENDPOINT + endPoint);
        xhr.setRequestHeader('authorization', APPLICATION_TOKEN);
        xhr.setRequestHeader('logintoken', localStorage.getItem('xp_login_token'));

        xhr.send(formData);
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

    buildErrorMessage(error: any) {
        if (! _.isEmpty(error.message)) {
            return `Server response: ${error.message}`;
        }

        return 'An error occurred. Please refresh and try again.';
    }

    handleError(error: any) {
        const errorMsg = this.buildErrorMessage(error);
        this.notificationService.fireError(errorMsg);

        return Observable.throw(errorMsg);
    }
}
