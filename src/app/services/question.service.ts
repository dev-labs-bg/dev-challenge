import { Injectable } from '@angular/core';
import { Question } from "../classes/question";
import { HttpService } from "./http.service";
import { Subscription } from "rxjs/Rx";

var _ = require('lodash');

@Injectable()
export class QuestionService {
    private questions: Question[] = [];

    constructor(
         private httpService: HttpService
    ) { }

    getAll(): Subscription | Question[] {
        if (this.questions.length > 0)
            return this.questions;

        return this.httpService.get('question/all').subscribe(
            response => {
                this.questions = response.questions.map(
                    el => Question.newQuestion(el)
                )
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
                if (question.task_id == taskId)
                    questions.push(question);
            }
        )

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

    updateMainArray(question: Question) {
        let id = question.id;
        let questionIndex = _.findIndex(this.questions, { id });

        this.questions[questionIndex] = question;

        return this.questions;
    }

}
