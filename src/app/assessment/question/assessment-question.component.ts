import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../../todos/todo';

@Component({
    selector: 'xp-assessment-question',
    template: `
        <h2>Assessment: Answer a Question</h2>
        <p>{{ todo.assessment.description }}</p>

        <xp-assessment-question-create>
        </xp-assessment-question-create>
    `
})
export class AssessmentQuestionComponent implements OnInit {
    @Input() private todo: Todo;

    constructor() { }

    ngOnInit() {
    }

}
