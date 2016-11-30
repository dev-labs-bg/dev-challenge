import { Component, OnInit, Input } from '@angular/core';

import { QuestionService } from '../question.service';
import { Task } from '../../tasks/task';
import { Question } from '../question';

@Component({
    selector: 'xp-admin-assessments-micro-project',
    template: `
        <h2>Complete a micro-project</h2>

        <div [ngSwitch]="currentMode">
            <xp-admin-assessments-micro-project-create
                *ngSwitchCase="modes.CREATE"
                [task]="task">
            </xp-admin-assessments-micro-project-create>
            <xp-admin-assessments-micro-project-edit
                *ngSwitchCase="modes.EDIT"
                [task]="task"
                [question]="assessmentEntry">
            </xp-admin-assessments-micro-project-edit>
        </div>
    `
})
export class AdminAssessmentsMicroProjectComponent implements OnInit {
    @Input() private task: Task;
    private assessmentEntry: Question;
    private modes = {
        CREATE: 0,
        EDIT: 1
    };
    private currentMode: number = -1;

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        const assessmentEntry = this.questionService.findByTaskId(this.task.id);

        if (assessmentEntry.length) {
            this.currentMode = this.modes.EDIT;
            // there will always be 1 item, if any
            this.assessmentEntry = assessmentEntry[0];
        } else {
            this.currentMode = this.modes.CREATE;
        }
    }

}
