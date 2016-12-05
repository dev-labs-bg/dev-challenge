import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../../todos/todo';
import { AssessmentService } from '../assessment.service';

@Component({
    selector: 'xp-assessment-exam-create',
    template: `
        <div *ngFor="let question of todo.task.questions">
            <xp-assessment-exam-form-item
                [todoId]="todo.assessment.todoId"
                [questionId]="todo.assessment.questionId"
                [question]="question">
            </xp-assessment-exam-form-item>
        </div>
    `,
    styles: []
})
export class AssessmentExamCreateComponent implements OnInit {
    @Input() private todo: Todo;

    constructor(private assessmentService: AssessmentService) { }

    ngOnInit() {
    }

}
