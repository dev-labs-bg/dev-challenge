import { Component, OnInit, Input } from '@angular/core';

import { QuestionService } from '../question.service';
import { Task } from '../../tasks/task';

@Component({
    selector: 'xp-admin-assessments-micro-project',
    template: `
        <h2>Complete a micro-project</h2>

        <xp-admin-assessments-micro-project-create [task]="task">
        </xp-admin-assessments-micro-project-create>
    `
})
export class AdminAssessmentsMicroProjectComponent implements OnInit {
    @Input() private task: Task;
    private modes = {
        CREATE: 0,
        EDIT: 1
    };
    private currentMode: number = -1;

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.currentMode = this.questionService.findByTaskId(this.task.id).length ? this.modes.EDIT : this.modes.CREATE;
    }

}
