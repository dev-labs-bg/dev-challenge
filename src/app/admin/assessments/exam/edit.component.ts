import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Task } from '../../tasks/task';

@Component({
    selector: 'xp-admin-assessments-exam-edit',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <p>Edit!</p>
            <xp-admin-assessment-form-exam
                [task]="task"
                [questions]="questions"
                (onSubmit)="handleSubmit($event)">
            </xp-admin-assessment-form-exam>
        </xp-loading-indicator>
    `
})
export class AdminAssessmentsExamEditComponent implements OnInit {
    @Input() private task: Task;
    @Input() private questions: Question[];
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
