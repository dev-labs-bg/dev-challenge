import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Question } from './question';
import { HttpService } from '../../services/http.service';
import { Repository } from '../../core/repository';
import * as _ from 'lodash';

@Injectable()
export class QuestionService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('question/all'),
    };
    dataChanged = new EventEmitter();

    constructor(
        private httpService: HttpService
    ) { }

    /**
     * Setup question data
     *
     * @returns {TeardownLogic|any|AnonymousSubscription|Object|Subscription}
     */
    setup() {
        return this.repository.setup(
            this.apiGetURLS.all,
            Question
        );
    }

    /**
     * Reset question data
     *
     * @returns {TeardownLogic|any|AnonymousSubscription|Object|Subscription}
     */
    reset() {
        return this.repository.reset(
            this.apiGetURLS.all,
            Question
        );
    }

    findByTaskId(taskId) {
        let questions = [];

        _.forEach(this.repository.getData(),
            question => {
                if (question.task_id == taskId) {
                    questions.push(question);
                }
            }
        );

        return questions;
    }

    saveExam(data) {
        return this.httpService.post('save-exam', data);
    }

    create(data) {
        return this.httpService.post('question', data);
    }

    update(id, data) {
        return this.httpService.put('question/' + id, data);
    }

    delete(id) {
        return this.httpService.delete('question/' + id);
    }
}
