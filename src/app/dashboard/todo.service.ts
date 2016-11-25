import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { Repository } from '../core/repository';

@Injectable()
export class TodoService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('todo/logged-user'),
    };

    constructor(private httpService: HttpService) { }

}
