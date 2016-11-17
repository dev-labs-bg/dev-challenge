import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Task } from "../../classes/task";
import { QuestionService } from "../../services/question.service";
import { Question } from "../../classes/question";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'xp-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
    private selectedTask: Task = null;
    private associatedQuestions: Question[] = [];
    private question: Question;
    private assessmentForm: FormGroup;

    constructor(
        private taskService: TaskService,
        private questionService: QuestionService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.taskService.getAll();
        this.questionService.getAll();

        this.assessmentForm = this.formBuilder.group({
            "task_id": ['', Validators.required],
            "body": ['', Validators.required]
        });

        // this.assessmentForm.addControl('shit', new FormControl('', Validators.required));
    }

    onTaskChange(value): null | void {
        if (value == null || value == 0)
            return null;

        // get task id
        let taskId = value;

        // find selected task out of tasks array
        this.selectedTask = this.taskService.find(taskId);

        // find questions related to task
        this.associatedQuestions = this.questionService.findByTaskId(this.selectedTask.id);

        // set open answer question
        this.question = (this.associatedQuestions.length > 0) ? this.associatedQuestions[0] : null;

        // get question body
        let questionBody = (this.question != null) ? this.question.body : '';

        // update form values
        this.assessmentForm.patchValue({body: questionBody});
    }

    onSubmit() {
        let value = this.assessmentForm.value;

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

    handleSubmit(question) {
        if (question == null)
            return this.onSubmit();

        return this.onUpdate(question.id);
    }

    onUpdate(id) {
        let value = this.assessmentForm.value;

        console.log(value);

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
