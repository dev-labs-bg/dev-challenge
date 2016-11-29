import { Component, OnInit } from '@angular/core';

import { ASSESSMENT_TYPES } from '../../assessment/constants';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task';
import { QuestionService } from './question.service';
import { Assessment } from './assessment';

@Component({
  selector: 'xp-assessments',
  templateUrl: './assessments.component.html'
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
