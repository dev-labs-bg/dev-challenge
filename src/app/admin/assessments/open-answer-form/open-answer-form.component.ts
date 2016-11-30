import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Question} from '../question';
import {Task} from '../../tasks/task';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {QuestionService} from '../question.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'xp-open-answer-form',
  templateUrl: './open-answer-form.component.html'
})
export class OpenAnswerFormComponent implements OnInit, OnChanges {
    @Input() private task: Task;
    private form: FormGroup;
    private question: Question;
    private formSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private questionService: QuestionService
    ) { }

    /**
     * Init form
     */
    ngOnInit() {
        this.form = this.buildForm();
    }

    /**
     * Recompile form on each @Input() task change;
     */
    ngOnChanges() {
        this.form = this.buildForm();
    }

    /**
     * Build the form component
     *
     * @returns {FormGroup}
     */
    buildForm() {
        // find questions related to task
        let questions = this.questionService.findByTaskId(this.task.id);

        // get the question
        this.question = (questions.length > 0) ? questions[0] : new Question();

        return this.formBuilder.group({
            'task_id': [this.task.id, Validators.required],
            'body': [this.question.body, Validators.required]
        });
    }

    /**
     * Handle form submit
     *
     * @returns {Subscription}
     */
    handleSubmit() {
        if (this.question.id === -1) {
            return this.onSubmit();
        }

        return this.onUpdate(this.question.id);
    }

    /**
     * Handle form create
     */
    onSubmit() {
        let value = this.form.value;

        return this.formSubscription = this.questionService.create(value).subscribe(
            response => {
                if (response.success) {
                    this.questionService.add(Question.newQuestion(response.question));
                    this.form = this.buildForm();
                } else {
                    console.log(response);
                }
            }
        );
    }

    /**
     * Handle form update
     *
     * @param id - question id
     */
    onUpdate(id) {
        let value = this.form.value;

        return this.formSubscription = this.questionService.update(id, value).subscribe(
            response => {
                if (response.success) {
                    this.questionService.updateMainArray(Question.newQuestion(response.question));
                } else {
                    console.log(response);
                }
            }
        );
    }

}
