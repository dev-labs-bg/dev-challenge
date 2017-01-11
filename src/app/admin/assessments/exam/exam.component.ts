import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Question } from '../question';
import { Task } from '../../tasks/task';
import { QuestionService } from '../question.service';

@Component({
    selector: 'xp-admin-assessments-exam',
    template: `
        <div [ngSwitch]="currentMode">
            <xp-admin-assessments-exam-create
                *ngSwitchCase="modes.CREATE"
                [task]="task"
                (onExamChange)="handleExamChange($event)">
            </xp-admin-assessments-exam-create>
            <xp-admin-assessments-exam-edit
                *ngSwitchCase="modes.EDIT"
                [questions]="questions"
                [task]="task"
                (onExamChange)="handleExamChange($event)">
            </xp-admin-assessments-exam-edit>
        </div>
    `
})
export class AdminAssessmentsExamComponent implements OnInit {
    @Input() private task: Task;
    @Output() private onExamChange = new EventEmitter();
    private questions: Question[];
    private modes = {
        CREATE: 0,
        EDIT: 1
    };
    private currentMode: number = -1;
    private subscription: Subscription;

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.setMode();

        /**
         * When the questionsService data is changed, we need to update
         * the questions @Input we're passing to the child components,
         * so they have fresh data too.
         */
        this.subscription = this.questionService.dataChanged.subscribe(
            () => this.setMode()
        );
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
        const questions: Question[] = this.questionService.findByTaskId(this.task.id);

        if (questions.length) {
            this.currentMode = this.modes.EDIT;
            this.questions = questions;
        } else {
            this.currentMode = this.modes.CREATE;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    handleExamChange(value) {
        this.onExamChange.emit(value);
    }

}
