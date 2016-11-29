import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { Repository } from '../core/repository';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('todo/logged-user'),
    };

    constructor(private httpService: HttpService) { }

    setup() {
        return this.repository.setup(
            this.apiGetURLS.all,
            Todo
        );
    }

    reset() {
        return this.repository.reset(
            this.apiGetURLS.all,
            Todo
        );
    }

}
