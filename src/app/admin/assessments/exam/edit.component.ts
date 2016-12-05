import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Question } from '../question';
import { QuestionService } from '../question.service';
import { NotificationService } from '../../../shared/notification.service';
import { Task } from '../../tasks/task';

@Component({
    selector: 'xp-admin-assessments-exam-edit',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <p>Edit!</p>
            <xp-admin-assessment-form-exam
                [task]="task"
                [questions]="questions"
                (onDelete)="handleDelete($event)"
                (onSubmit)="handleSubmit($event)">
            </xp-admin-assessment-form-exam>
        </xp-loading-indicator>
    `
})
export class AdminAssessmentsExamEditComponent implements OnInit {
    @Input() private task: Task;
    @Input() private questions: Question[];
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
                this.notificationService.fireSuccess('Exam updated!');
            },
            error => console.log('Ah, exam not updated!', error)
        );
    }

    handleDelete(questionId) {
        this.subscription = this.questionService.delete(questionId).subscribe(
            response => {
                this.questionService.reset();
                this.notificationService.fireSuccess('Exam question deleted!');
            },
            error => console.log('Ah, exam question not deleted!', error)
        );
    }

}
