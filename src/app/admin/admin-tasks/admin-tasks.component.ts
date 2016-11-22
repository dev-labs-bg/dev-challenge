import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AssessmentTypeService } from "../../services/assessment-type.service";
import { CategoryService } from "../categories/category.service";
import { Category } from "../categories/category";
import { Task } from "../../classes/task";
import { Subscription } from "rxjs/Rx";

@Component({
    selector: 'xp-admin-tasks',
    templateUrl: './admin-tasks.component.html',
    styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit {
    private taskForm: FormGroup;
    private selectedTask: Task = null;
    private selectedCategory: Category = null;
    private categoryTasks: Task[] = [];

    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService,
        private assessmentTypeService: AssessmentTypeService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.categoryService.getAll();
        this.taskService.getAll();
        this.assessmentTypeService.getAll();

        this.taskForm = this.formBuilder.group({
            "category_id": ['', Validators.required],
            "assessment_type_id": ['', Validators.required],
            "title": ['', Validators.required],
            "description": ['', Validators.required],
            "time_estimation": ['', Validators.required],
        });
    }

    /**
     * Create task submit
     *
     * @returns {Subscription}
     */
    onCreate() {
        let values = this.taskForm.value;

        return this.taskService.createTask(values).subscribe(
            response => {
                this.taskService.addTask(Task.newTask(response.task));
                this.taskForm.reset();
                this.onCategoryChange(response.task.category_id);
                document.getElementById("close_modal").click();
            },
            error => console.log('Ah, task not created!', error)
        );
    }

    /**
     * Update task submit
     *
     * @returns {Subscription}
     */
    onUpdate() {
        let values = this.taskForm.value;

        return this.taskService.updateTask(this.selectedTask.id, values).subscribe(
            response => {
                let newTask = Task.newTask(response.task);
                this.taskService.updateMainArray(newTask);
                this.taskForm.reset();
                this.onCategoryChange(newTask.category_id);
                document.getElementById("close_modal").click();
            },
            error => console.log('Ah, task not updated!', error)
        );
    }

    /**
     * Open empty task form
     */
    showCreateTaskForm() {
        this.selectedTask = null;
        this.taskForm.reset();
        document.getElementById('open_modal').click();
    }

    /**
     * Change form submission depending on
     * selectedTask state
     */
    handleSubmit(): Subscription | void {
        if (this.selectedTask == null)
            return this.onCreate();

        return this.onUpdate();
    }

    /**
     * Open update form with predefined values
     *
     * @param task
     */
    openUpdateForm(task) {
        this.selectedTask = task;
        this.taskForm.setValue(task.toForm());
        document.getElementById('open_modal').click();
    }

    /**
     * Delete a task
     *
     * @returns {Subscription}
     */
    deleteTask() {
        return this.taskService.deleteTask(this.selectedTask.id).subscribe(
            response => {
                this.taskService.removeTask(this.selectedTask.id);
                this.onCategoryChange(this.selectedTask.category_id);
                this.selectedTask = null;
                document.getElementById('close_modal').click();
            },
            error => console.log('Ah, task not deleted!', error)
        );
    }

    onCategoryChange(val) {
        let categoryId = +val;

        this.selectedCategory = this.categoryService.findCategory(categoryId);

        this.categoryTasks = this.taskService.getFromCategory(categoryId);
    }

}
