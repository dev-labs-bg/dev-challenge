import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Task } from '../../tasks/task';

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

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
    }

    handleSubmit(formData) {
        return this.subscription = this.questionService.saveExam(formData).subscribe(
            response => {
                // noinspection TypeScriptUnresolvedVariable
                response.allQuestions.forEach(question => {
                    const foundQuestion = this.questionService.find(question.id);

                    if (! foundQuestion) {
                        return;
                    }

                    this.questionService.add(new Question(
                        question.id,
                        question.task_id,
                        question.body,
                        question.answers,
                    ));
                });
            }
        );
    }

}
