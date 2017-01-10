import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { QuestionService } from '../question.service';
import { NotificationService } from '../../../shared/notification.service';
import { Task } from '../../tasks/task';
import { TaskService } from '../../tasks/task.service';

@Component({
    selector: 'xp-admin-assessments-micro-project-create',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <xp-admin-assessment-form-open-answer
                submitText="Create"
                [task]="task"
                (onSubmit)="handleSubmit($event)">
            </xp-admin-assessment-form-open-answer>
        </xp-loading-indicator>
    `
})
export class AdminAssessmentsMicroProjectCreateComponent implements OnInit {
    @Input() private task: Task;
    @Output() private taskChanged = new EventEmitter();
    private subscription: Subscription;

    constructor(
        private questionService: QuestionService,
        private notificationService: NotificationService,
        private taskService: TaskService
    ) { }

    ngOnInit() {
    }

    handleSubmit(formData) {
        this.subscription = this.questionService.create(formData).subscribe(
            response => {
                this.taskService.reset();
                this.questionService.reset();
                this.taskChanged.emit(70);
                this.notificationService.fireSuccess('Assessment added!');
            },
            error => console.log('Ah, record not created!', error)
        );
    }

}
