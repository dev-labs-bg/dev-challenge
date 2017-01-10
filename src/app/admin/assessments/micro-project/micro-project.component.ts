import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { QuestionService } from '../question.service';
import { Task } from '../../tasks/task';
import { Question } from '../question';

@Component({
    selector: 'xp-admin-assessments-micro-project',
    template: `
        <div [ngSwitch]="currentMode">
            <xp-admin-assessments-micro-project-create
                *ngSwitchCase="modes.CREATE"
                [task]="task"
                (onTaskChange)="handleTaskChange($event)">
            </xp-admin-assessments-micro-project-create>
            <xp-admin-assessments-micro-project-edit
                *ngSwitchCase="modes.EDIT"
                [task]="task"
                [question]="assessmentEntry"
                (onTaskChange)="handleTaskChange($event)">
            </xp-admin-assessments-micro-project-edit>
        </div>
    `
})
export class AdminAssessmentsMicroProjectComponent implements OnInit, OnChanges {
    @Input() private task: Task;
    @Output() private onTaskChange = new EventEmitter();
    private assessmentEntry: Question;
    private modes = {
        CREATE: 0,
        EDIT: 1
    };
    private currentMode: number = -1;

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.setMode();
    }

    /**
     * When component task / question is changed,
     * not always the component is re-rendered.
     * In some cases we just need to update it,
     * without going through the ngOnInit.
     * Otherwise, we end up with not-updated values (set in ngOnInit).
     */
    ngOnChanges() {
        this.setMode();
    }

    setMode() {
        const assessmentEntry = this.questionService.findByTaskId(this.task.id);

        if (assessmentEntry.length) {
            this.currentMode = this.modes.EDIT;
            // there will always be 1 item, if any
            this.assessmentEntry = assessmentEntry[0];
        } else {
            this.currentMode = this.modes.CREATE;
        }
    }

    handleTaskChange(value) {
        this.onTaskChange.emit(value);
    }
}
