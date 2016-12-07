import { Component, Input } from '@angular/core';

import { Assessment } from '../assessment';
import { AssessmentService } from '../assessment.service';
import { TodoService } from '../../todos/todo.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'xp-assessment-question-create',
    template: `
        <xp-assessment-form-open-answer
            (onSubmit)="handleSubmit($event)">
        </xp-assessment-form-open-answer>
        <hr />
        <xp-audio-recorder
            (onUpload)="handleAudioUpload($event)">
        </xp-audio-recorder>
    `,
    styles: []
})
export class AssessmentQuestionCreateComponent {
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

    private handleAudioUpload(audio) {

        this.assessmentService.uploadOpenQuestionAudio(
            this.assessment.todoId,
            this.assessment.questionId,
            audio
        );

        // .subscribe(
        //     response => {
        //         this.todoService.reset();
        //         this.notificationService.fireSuccess('Assessment submitted!');
        //     },
        //     error => console.log('Ah, audio upload failed!', error)
        // );
    }

}
