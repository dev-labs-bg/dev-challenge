import {Injectable, EventEmitter} from '@angular/core';
import {User} from '../classes/user';
import {HttpService} from '../services/http.service';
import {Subscription} from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class UserService {
    private users: User[] = [];
    public usersChange: EventEmitter<User[]> = new EventEmitter<User[]>();

    constructor(
        private httpService: HttpService
    ) { }

    getAll(): User[] | Subscription {
        if (this.users.length > 0) {
            return this.users;
        }

        return this.httpService.get('users/all').subscribe(
            response => {
                this.users = response.users.map(
                    el => User.newUser(el)
                );

                this.usersChange.emit(this.users);
            },
            error => console.log('Oops, no users found')
        );
    }

    getUsers() {
        return this.users;
    }

    getById(id) {
        return _.find(this.users, { id });
    }

}
