import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Question} from '../question';
import {Task} from '../../tasks/task';
import {QuestionService} from '../question.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'xp-exam-answer-form',
  templateUrl: './exam-answer-form.component.html',
  styleUrls: ['./exam-answer-form.component.scss']
})
export class ExamAnswerFormComponent implements OnInit, OnChanges {
    @Input() private task: Task;
    private questions: Question[] = [];
    private form: FormGroup;
    private formSubscription: Subscription;

    constructor(
        private questionService: QuestionService,
        private formBuilder: FormBuilder
    ) { }

    /**
     * Init form on component init
     */
    ngOnInit() {
        this.buildExamForm();
    }

    /**
     * Look for changes on @Input() task
     * and re init the form each time
     */
    ngOnChanges() {
        this.buildExamForm();
    }

    /**
     * Add a question to the form
     */
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
     * Form var getters
     * Creates a variable called @varName (e.g. formQuestions)
     * and appends the return statement to it
     *
     * @returns {FormArray}
     */
    get formQuestions(): FormArray { return this.form.get('formQuestions') as FormArray; }

    get correctAnswers(): FormArray { return this.form.get('correctAnswers') as FormArray; }

    get wrongAnswers(): FormArray { return this.form.get('wrongAnswers') as FormArray; }

    /**
     * Send the whole form on submit
     *
     * @returns {Subscription}
     */
    onSubmit() {
        let formValue = this.form.value;

        let thisInstance = this;

        return this.formSubscription = this.questionService.saveExam(formValue).subscribe(
            response => {
                if (response.success) {
                    // noinspection TypeScriptUnresolvedVariable
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

                    thisInstance.buildExamForm();
                }
            }
        );
    }

    /**
     * Build the exam form instance
     */
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

        // Init form
        this.form = this.formBuilder.group({
            'task_id': [this.task.id, Validators.required],
            'formQuestions': formQuestions,
            'correctAnswers': correctAnswers,
            'wrongAnswers': wrongAnswers,
        });

        // if form is empty, add a default empty question
        if (this.formQuestions.length === 0) {
            this.addQuestion();
        }
    }

    /**
     * Delete a question
     *
     * @param index - form group index
     */
    deleteQuestion(index) {
        // get question id from formQuestions
        let questionId = parseInt(this.formQuestions.at(index).value.id, 10);

        // if there's a question id, delete the question
        if (typeof(questionId) === 'number' && questionId > 0) {
            this.formSubscription = this.questionService.delete(questionId).subscribe(
                response => {
                    this.questionService.remove(questionId);
                    this.buildExamForm();
                }
            );
        // if there's no question id, just empty the fields
        } else {
            this.formQuestions.at(index).reset();
            this.correctAnswers.at(index).reset();
            this.wrongAnswers.at(index).reset();
        }
    }

}
