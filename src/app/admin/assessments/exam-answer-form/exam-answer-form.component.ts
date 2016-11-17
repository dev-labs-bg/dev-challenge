import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
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

        let questionBodyGroup = [];

        this.questions.forEach(function (question,  index) {
            questionBodyGroup[index] = question.body;
        });

        this.form = this.formBuilder.group({
            "task_id": [this.task.id, Validators.required],
            "body[]": questionBodyGroup
        });
    }

    addQuestion() {
        this.questions.push(new Question());
    }

    onSubmit() {
        console.log(1);
    }

}
