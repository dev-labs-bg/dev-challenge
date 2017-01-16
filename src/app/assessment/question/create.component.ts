import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Assessment } from '../assessment';
import { AssessmentService } from '../assessment.service';
import { TodoService } from '../../todos/todo.service';
import { SubmissionService } from '../../admin/submissions/submission.service';

import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'xp-assessment-question-create',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <h4>Write:</h4>
            <xp-assessment-form-open-answer
                submitText="Submit text answer"
                (onSubmit)="handleSubmit($event)">
            </xp-assessment-form-open-answer>
            <hr />
            <h4>... or record an audio:</h4>
            <xp-audio-recorder
                uploadText="Submit audio answer"
                (onUpload)="handleAudioUpload($event)">
            </xp-audio-recorder>
        </xp-loading-indicator>
    `,
    styles: []
})
export class AssessmentQuestionCreateComponent {
    @Input() private assessment: Assessment;
    private subscription: Subscription;

    constructor(
        private assessmentService: AssessmentService,
        private todoService: TodoService,
        private notificationService: NotificationService,
        private submissionService: SubmissionService,
    ) { }

    private handleSubmit(formData) {
        const { message } = formData;

        this.subscription = this.assessmentService.submitOpenQuestionAnswer(
            this.assessment.todoId,
            this.assessment.questionId,
            message
        ).subscribe(
            response => {
                this.todoService.reset();
                this.submissionService.setSubmissions([]);
                this.notificationService.fireSuccess('Assessment submitted!');
            },
            error => console.log('Ah, assessment not submitted!', error)
        );
    }

    private handleAudioUpload(audio) {
        this.subscription = this.assessmentService.uploadOpenQuestionAudio(
            this.assessment.todoId,
            this.assessment.questionId,
            audio
        ).subscribe(
            response => {
                this.todoService.reset();
                this.submissionService.setSubmissions([]);
                this.notificationService.fireSuccess('Assessment submitted!');
            },
            error => console.log('Ah, audio upload failed!', error)
        );
    }

}
