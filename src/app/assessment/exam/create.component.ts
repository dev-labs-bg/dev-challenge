import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../../todos/todo';

@Component({
    selector: 'xp-assessment-exam-create',
    template: `
        <p>hello!</p>
        <div *ngFor="let question of todo.task.questions">
            <h2>{{ question.body }}</h2>
            <p *ngFor="let answer of question.answers">
                {{ answer.body }}
            </p>
        </div>
    `,
    styles: []
})
export class AssessmentExamCreateComponent implements OnInit {
    @Input() private todo: Todo;

    constructor() { }

    ngOnInit() {
    }

}
