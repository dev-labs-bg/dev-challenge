import {Injectable, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import * as _ from 'lodash';

import {User} from '../classes/user';
import {HttpService} from '../services/http.service';
import {Repository} from '../core/repository';

@Injectable()
export class UserService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('users/all'),
    };

    constructor(
        private httpService: HttpService
    ) { }

    setup() {
        return this.repository.setup(
            this.apiGetURLS.all,
            User
        );
    }

    /**
     * Get logged user api call
     *
     * @returns {Observable}
     */
    getLoggedUser() {
        return this.httpService.get('get-logged-user');
    }

    /**
     * Find users by category
     * 
     * @param {int} categoryId
     */
    findByCategory(categoryId) {
        let categoryUsers: User[] = [];
        let category_id = parseInt(categoryId, 10);

        _.forEach(this.repository.getData(),
            user => {
                if (user.category_id === category_id) {
                    categoryUsers.push(user);
                }
            }
        );

        return categoryUsers;
    }

}
