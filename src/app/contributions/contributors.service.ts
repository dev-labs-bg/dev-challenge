import {Injectable} from '@angular/core';

import {Repository} from '../core/repository';
import {HttpService} from '../services/http.service';
import {User} from '../classes/user';

@Injectable()
export class ContributorsService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('users/contributors'),
    };

    constructor(
        private httpService: HttpService
    ) { }

    setup() {
        this.repository.setup(
            this.apiGetURLS.all,
            User
        )
    }

}
