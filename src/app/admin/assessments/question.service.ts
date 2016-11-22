import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import {Question} from './question';
import {HttpService} from '../../services/http.service';
import * as _ from 'lodash';

@Injectable()
export class QuestionService {
    private questions: Question[] = [];

    constructor(
         private httpService: HttpService
    ) { }

    getAll(): Subscription | Question[] {
        if (this.questions.length > 0) {
            return this.questions;
        }

        return this.httpService.get('question/all').subscribe(
            response => {
                this.questions = response.questions.map(
                    el => Question.newQuestion(el)
                );
            }
        );
    }

    getQuestions() {
        return this.questions;
    }

    findByTaskId(taskId) {
        let questions = [];

        _.forEach(this.questions,
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

    add(question: Question) {
        this.questions.push(question);
    }

    update(id, data) {
        return this.httpService.put('question/' + id, data);
    }

    find(id) {
        return _.find(this.questions, { id });
    }

    delete(id) {
        return this.httpService.delete('question/' + id);
    }

    remove(id) {
        return _.remove(this.questions, { id });
    }

    updateMainArray(question: Question) {
        let id = question.id;
        let questionIndex = _.findIndex(this.questions, { id });

        this.questions[questionIndex] = question;

        return this.questions;
    }

}
