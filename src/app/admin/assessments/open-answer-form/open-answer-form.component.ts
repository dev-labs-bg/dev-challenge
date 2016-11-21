import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Question } from '../../../classes/question';
import { Task } from '../../../classes/task';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'xp-open-answer-form',
  templateUrl: './open-answer-form.component.html',
  styleUrls: ['./open-answer-form.component.scss']
})
export class OpenAnswerFormComponent implements OnInit, OnChanges {
    @Input() private task: Task;
    private form: FormGroup;
    private question: Question;

    constructor(
        private formBuilder: FormBuilder,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.form = this.buildForm();
    }

    ngOnChanges() {
        this.form = this.buildForm();
    }

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

    handleSubmit() {
        if (this.question == null) {
            return this.onSubmit();
        }

        return this.onUpdate(this.question.id);
    }

    onSubmit() {
        let value = this.form.value;

        this.questionService.create(value).subscribe(
            response => {
                if (response.success) {
                    this.questionService.add(Question.newQuestion(response.question));
                } else {
                    console.log(response);
                }
            }
        );
    }

    onUpdate(id) {
        let value = this.form.value;

        this.questionService.update(id, value).subscribe(
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
