import { Component, OnInit } from '@angular/core';

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
        </div>

        <p *ngIf="(selectedTask != null)">
            Task type:
            <strong>{{ selectedTask?.assessment.type }}</strong>
        </p>

        <div [ngSwitch]="selectedTask?.assessment.id">
            <xp-admin-assessment-form-open-answer
                *ngSwitchCase="ASSESSMENT_TYPES.MICRO_PROJECT"
                [task]="selectedTask">
            </xp-admin-assessment-form-open-answer>

            <xp-admin-assessment-form-open-answer
                *ngSwitchCase="ASSESSMENT_TYPES.QUESTION"
                [task]="selectedTask">
            </xp-admin-assessment-form-open-answer>

            <xp-exam-answer-form
                *ngSwitchCase="ASSESSMENT_TYPES.EXAM"
                [task]="selectedTask">
            </xp-exam-answer-form>
        </div>
    `
})
export class AssessmentsComponent implements OnInit {
    private selectedTask: Task = null;
    private ASSESSMENT_TYPES = ASSESSMENT_TYPES;
    private Assessment = Assessment;

    constructor(
        private taskService: TaskService,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.taskService.repository.setup(
            this.taskService.apiGetURLS.all,
            Task
        );

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
