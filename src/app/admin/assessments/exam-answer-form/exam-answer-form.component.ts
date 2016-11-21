import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
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
        // find questions related to task
        this.questions = this.questionService.findByTaskId(this.task.id);

        let formQuestions = new FormArray([]);
        let correctAnswers = new FormArray([]);
        let answerExplanation = new FormArray([]);
        let wrongAnswers = new FormArray([]);
        let questionIds = new FormArray([]);

        this.questions.forEach(function (question) {
            formQuestions.push(new FormControl(question.body, Validators.required));
            questionIds.push(new FormControl(question.id));

            let wrongAnswersBody = new FormArray([]);

            question.examAnswers.forEach(function (answer) {
                let answerGroup = this.formBuilder.group({
                    id: [answer.id],
                    body: [answer.body, Validators.required]
                });

                if (answer.is_correct) {
                    correctAnswers.push(answerGroup);
                } else {
                    wrongAnswersBody.push(answerGroup);
                }
            });

            wrongAnswers.push(wrongAnswersBody);
        });

        this.form = this.formBuilder.group({
            "task_id": [this.task.id, Validators.required],
            "questionIds": questionIds,
            "formQuestions": formQuestions,
            "correctAnswers": correctAnswers,
            "answerExplanation": answerExplanation,
            "wrongAnswers": wrongAnswers,
        });

        if (formQuestions.length == 0)
            this.addQuestion();
    }

    addQuestion() {
        this.questionIds.push(new FormControl(''));
        this.answerExplanation.push(new FormControl('', Validators.required));
        this.formQuestions.push(new FormControl('', Validators.required));
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
                body: ['', Validators.required]
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

    get answerExplanation(): FormArray { return this.form.get('answerExplanation') as FormArray; }

    get questionIds(): FormArray { return this.form.get('questionIds') as FormArray; }

    onSubmit() {
        let formValue = this.form.value;

        console.log(formValue);

        // return this.questionService.saveExam(formValue).subscribe(
        //     response => console.log(response)
        // );
    }

}
