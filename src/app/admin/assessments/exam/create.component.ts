import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { QuestionService } from '../question.service';
import { Task } from '../../tasks/task';
import { NotificationService } from '../../../shared/notification.service';

@Component({
    selector: 'xp-admin-assessments-exam-create',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <xp-admin-assessment-form-exam
                [task]="task"
                (onSubmit)="handleSubmit($event)">
            </xp-admin-assessment-form-exam>
        </xp-loading-indicator>
    `
})
export class AdminAssessmentsExamCreateComponent implements OnInit {
    @Input() private task: Task;
    private subscription: Subscription;

    constructor(
        private questionService: QuestionService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
    }

    handleSubmit(formData) {
        return this.subscription = this.questionService.saveExam(formData).subscribe(
            response => {
                this.questionService.reset();
                this.notificationService.fireSuccess('Exam created!');
            },
            error => console.log('Ah, exam not created!', error)
        );
    }

}
