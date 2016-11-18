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
        let wrongAnswers = new FormArray([]);

        this.questions.forEach(function (question,  index) {
            formQuestions.push(new FormControl(question.body, Validators.required));

            let wrongAnswersBody = new FormGroup({});

            question.examAnswers.forEach(function (answer, index) {
                if (answer.is_correct)
                    correctAnswers.push(new FormControl(answer.body, Validators.required));
                else
                    wrongAnswersBody.addControl('body-' + index, new FormControl(answer.body, Validators.required));
            });

            wrongAnswers.push(wrongAnswersBody);
        });

        let innerWrongAnswers = wrongAnswers.at(0) as FormGroup;

        if (formQuestions.length == 0) formQuestions.push(new FormControl('', Validators.required));
        if (correctAnswers.length == 0) correctAnswers.push(new FormControl('', Validators.required));
        if (!innerWrongAnswers.contains('body-0')) wrongAnswers = new FormArray([
            new FormGroup({
                'body-0': new FormControl('', Validators.required),
                'body-1': new FormControl('', Validators.required),
                'body-2': new FormControl('', Validators.required)
            })
        ]);

        this.form = this.formBuilder.group({
            "task_id": [this.task.id, Validators.required],
            "formQuestions": formQuestions,
            "correctAnswers": correctAnswers,
            "wrongAnswers": wrongAnswers,
        });

        console.log(this.form.value);
    }

    addQuestion() {
        this.correctAnswers.push(new FormControl('', Validators.required));
        this.formQuestions.push(new FormControl('', Validators.required));
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

    questionWrongAnswers(index) {
        return this.wrongAnswers.at(index) as FormArray;
    }

    onSubmit() {
        console.log(this.form.value);
    }

}
