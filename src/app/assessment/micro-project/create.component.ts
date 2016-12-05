import { Component, Input } from '@angular/core';

import { Assessment } from '../assessment';
import { AssessmentService } from '../assessment.service';
import { TodoService } from '../../todos/todo.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'xp-create-micro-project-assessment',
    template: `
        <xp-assessment-form-open-answer
            (onSubmit)="handleSubmit($event)">
        </xp-assessment-form-open-answer>
    `
})
export class CreateMicroProjectAssessmentComponent {
    @Input() private assessment: Assessment;

    constructor(
        private assessmentService: AssessmentService,
        private todoService: TodoService,
        private notificationService: NotificationService
    ) { }

    private handleSubmit(formData) {
        const { message } = formData;

        this.assessmentService.submitOpenQuestionAnswer(
            this.assessment.todoId,
            this.assessment.questionId,
            message
        ).subscribe(
            response => {
                this.todoService.reset();
                this.notificationService.fireSuccess('Assessment submitted!');
            },
            error => console.log('Ah, assessment not submitted!', error)
        );
    }

}
