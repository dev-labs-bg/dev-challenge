import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'xp-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
    private selectedTask: Task = null;

    constructor(
        private taskService: TaskService,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.taskService.getAll();
        this.questionService.getAll();
    }

    onTaskChange(value): null | void {
        if (value == null || value === 0) {
            return null;
        }

        // find selected task out of tasks array
        this.selectedTask = this.taskService.find(value);
    }

    isType(type) {
        return (this.selectedTask != null &&
        this.selectedTask.assessment.mappedType() === type);
    }

}
