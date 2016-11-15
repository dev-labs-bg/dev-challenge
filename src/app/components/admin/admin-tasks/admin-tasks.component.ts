import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../../services/task.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AssessmentTypeService } from "../../../services/assessment-type.service";
import { CategoryService } from "../../../services/category.service";
import { Task } from "../../../classes/task";

@Component({
  selector: 'xp-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit {
    private taskForm: FormGroup;

    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService,
        private assessmentTypeService: AssessmentTypeService,
        private formBuilder: FormBuilder
    ) {
        this.categoryService.getAll();
        this.taskService.getAll();
        this.assessmentTypeService.getAll();
    }

    ngOnInit() {
        this.taskForm = this.formBuilder.group({
            "category_id": ['', Validators.required],
            "assessment_type_id": ['', Validators.required],
            "title": ['', Validators.required],
            "description": ['', Validators.required],
            "time_estimation": ['', Validators.required],
        });
    }

    onCreate() {
        let values = this.taskForm.value;

        return this.taskService.createTask(values).subscribe(
            response => {
                if (response.success) {
                    this.taskService.addTask(Task.newTask(response.task));
                    this.taskForm.reset();
                    document.getElementById("close_modal").click();
                }
            }
        )
    }

}
