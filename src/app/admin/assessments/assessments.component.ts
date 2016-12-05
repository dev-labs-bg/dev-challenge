import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ASSESSMENT_TYPES } from '../../assessment/constants';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task';
import { QuestionService } from './question.service';
import { Assessment } from './assessment';

@Component({
    selector: 'xp-assessments',
    template: `
        <h1>Assessment Center</h1>
        <h2>Please select a task</h2>

        <div class="form-group">
            <label for="task">Task</label>
            <xp-loading-indicator [wait]="subscription">
                <select
                    name="task"
                    id="task"
                    (ngModelChange)="onTaskChange($event)" [ngModel]="task_id">
                    <option value="0" disabled selected>Select Task</option>
                    <option *ngFor="let task of taskService.repository.getData()"
                            value="{{ task.id }}">
                        {{ task.title }}
                    </option>
                </select>
            </xp-loading-indicator>
        </div>

        <p *ngIf="(selectedTask != null)">
            Task type:
            <strong>{{ selectedTask?.assessment.type }}</strong>
        </p>

        <div [ngSwitch]="selectedTask?.assessment.id">
            <xp-admin-assessments-micro-project
                *ngSwitchCase="ASSESSMENT_TYPES.MICRO_PROJECT"
                [task]="selectedTask">
            </xp-admin-assessments-micro-project>

            <xp-admin-assessments-question
                *ngSwitchCase="ASSESSMENT_TYPES.QUESTION"
                [task]="selectedTask">
            </xp-admin-assessments-question>

            <xp-admin-assessments-exam
                *ngSwitchCase="ASSESSMENT_TYPES.EXAM"
                [task]="selectedTask">
            </xp-admin-assessments-exam>
        </div>
    `
})
export class AssessmentsComponent implements OnInit {
    private selectedTask: Task = null;
    private ASSESSMENT_TYPES = ASSESSMENT_TYPES;
    private Assessment = Assessment;
    private subscription: Subscription;

    constructor(
        private taskService: TaskService,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.subscription = this.taskService.setup();

        this.questionService.getAll();
    }

    onTaskChange(value): null | void {
        if (value == null || value === 0) {
            return null;
        }

        // find selected task out of tasks array
        this.selectedTask = this.taskService.repository.find(value);
    }

}
