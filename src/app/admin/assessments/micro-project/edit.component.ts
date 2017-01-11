import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { QuestionService } from '../question.service';
import { NotificationService } from '../../../shared/notification.service';
import { Task } from '../../tasks/task';
import { Question } from '../question';
import { TaskService } from '../../tasks/task.service';

@Component({
    selector: 'xp-admin-assessments-micro-project-edit',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <xp-admin-assessment-form-open-answer
                submitText="Update"
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
    @Output() private onQuestionChange = new EventEmitter();
    private subscription: Subscription;

    constructor(
        private questionService: QuestionService,
        private notificationService: NotificationService,
        private taskService: TaskService
    ) { }

    ngOnInit() {
    }

    handleSubmit(formData) {
        // keep task parent id
        let parentId = this.task.parent_id;

        this.subscription = this.questionService.update(this.question.id, formData).subscribe(
            response => {
                // say that question has been added / changed
                this.onQuestionChange.emit(parentId);
                
                this.notificationService.fireSuccess('Assessment updated!');
            },
            error => console.log('Ah, record not updated!', error)
        );
    }
}
