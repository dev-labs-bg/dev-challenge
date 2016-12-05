import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { QuestionService } from '../question.service';
import { NotificationService } from '../../../shared/notification.service';
import { Task } from '../../tasks/task';

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
    private subscription: Subscription;

    constructor(
        private questionService: QuestionService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
    }

    handleSubmit(formData) {
        this.subscription = this.questionService.create(formData).subscribe(
            response => {
                this.questionService.reset();
                this.notificationService.fireSuccess('Assessment added!');
            },
            error => console.log('Ah, record not created!', error)
        );
    }

}
