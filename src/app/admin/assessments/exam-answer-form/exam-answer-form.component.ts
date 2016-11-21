import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Question} from '../../../classes/question';
import {Task} from '../../../classes/task';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'xp-exam-answer-form',
  templateUrl: './exam-answer-form.component.html',
  styleUrls: ['./exam-answer-form.component.scss']
})
export class ExamAnswerFormComponent implements OnInit {
    @Input() private task: Task;
    private questions: Question[] = [];
    private form: FormGroup;

    constructor(
        private questionService: QuestionService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.buildExamForm();

        if (this.formQuestions.length == 0)
            this.addQuestion();
    }

    addQuestion() {
        this.formQuestions.push(
            this.formBuilder.group({
                id: [''],
                body: ['', Validators.required],
            }
        ));
        this.wrongAnswers.push(
            new FormArray([
                this.formBuilder.group({
                    id: [''],
                    body: ['', Validators.required],
                }),
                this.formBuilder.group({
                    id: [''],
                    body: ['', Validators.required],
                }),
                this.formBuilder.group({
                    id: [''],
                    body: ['', Validators.required],
                })
            ])
        );
        this.correctAnswers.push(
            this.formBuilder.group({
                id: [''],
                body: ['', Validators.required],
                explanation: ['', Validators.required],
            })
        );
    }

    /**
     * Creates a variable called formQuestions
     * and appends the return statement to it
     *
     * @returns {FormArray}
     */
    get formQuestions(): FormArray { return this.form.get('formQuestions') as FormArray; }

    get correctAnswers(): FormArray { return this.form.get('correctAnswers') as FormArray; }

    get wrongAnswers(): FormArray { return this.form.get('wrongAnswers') as FormArray; }

    onSubmit() {
        let formValue = this.form.value;

        let thisInstance = this;

        return this.questionService.saveExam(formValue).subscribe(
            response => {
                if (response.success) {
                    response.allQuestions.forEach(function (question) {
                        let foundQuestion = thisInstance.questionService.find(question.id);

                        if (foundQuestion == null) {
                            thisInstance.questionService.add(new Question(
                                question.id,
                                question.task_id,
                                question.body,
                                question.answers,
                            ));
                        }

                    });

                    thisInstance.form = thisInstance.buildExamForm();
                }
            }
        );
    }

    buildExamForm() {
        // find questions related to task
        this.questions = this.questionService.findByTaskId(this.task.id);

        let formQuestions = new FormArray([]);
        let correctAnswers = new FormArray([]);
        let wrongAnswers = new FormArray([]);

        let innerFormBuilder = this.formBuilder;

        this.questions.forEach(function (question) {
            formQuestions.push(
                innerFormBuilder.group({
                        id: [question.id],
                        body: [question.body, Validators.required],
                    }
                ));

            let wrongAnswersBody = new FormArray([]);

            question.examAnswers.forEach(function (answer) {
                if (answer.is_correct) {
                    correctAnswers.push(
                        innerFormBuilder.group({
                            id: [answer.id],
                            body: [answer.body, Validators.required],
                            explanation: [answer.why_correct, Validators.required],
                        })
                    );
                } else {
                    wrongAnswersBody.push(
                        innerFormBuilder.group({
                            id: [answer.id],
                            body: [answer.body, Validators.required]
                        })
                    );
                }
            });

            wrongAnswers.push(wrongAnswersBody);
        });

        return this.form = this.formBuilder.group({
            "task_id": [this.task.id, Validators.required],
            "formQuestions": formQuestions,
            "correctAnswers": correctAnswers,
            "wrongAnswers": wrongAnswers,
        });
    }

}
