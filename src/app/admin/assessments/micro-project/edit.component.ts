import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { QuestionService } from '../question.service';
import { NotificationService } from '../../../shared/notification.service';
import { Task } from '../../tasks/task';
import { Question } from '../question';

@Component({
    selector: 'xp-admin-assessments-micro-project-edit',
    template: `
        <h2>Update Micro Project</h2>

        <xp-loading-indicator [wait]="subscription">
            <xp-admin-assessment-form-open-answer
                [task]="task"
                [question]="question"
                (onSubmit)="handleSubmit($event)">
            </xp-admin-assessment-form-open-answer>
        </xp-loading-indicator>
    `
})
export class AdminAssessmentsMicroProjectEditComponent implements OnInit {
    @Input() private task: Task;
    @Input() private question: Question;
    private subscription: Subscription;

    constructor(
        private questionService: QuestionService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
    }

    handleSubmit(formData) {
        this.subscription = this.questionService.update(this.task.id, formData).subscribe(
            response => {
                this.questionService.reset();
                this.notificationService.fireSuccess('Category updated!');
            },
            error => console.log('Ah, record not updated!', error)
        );
    }
}
