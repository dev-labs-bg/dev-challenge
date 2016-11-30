import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'xp-admin-tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
    private taskFormSubscription: Subscription;
    private listFormSubscription: Subscription;
    private taskForm: FormGroup;
    private selectedTask: Task = null;
    private selectedCategory: Category = null;
    private categoryId: number;
    private categoryTasks: Task[] = [];

    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.categoryService.getAll();

        this.taskService.repository.setup(
            this.taskService.apiGetURLS.all,
            Task
        );

        this.taskForm = this.formBuilder.group({
            'category_id': ['', Validators.required],
            'assessment_type_id': ['', Validators.required],
            'title': ['', Validators.required],
            'description': ['', Validators.required],
            'time_estimation': ['', Validators.required],
        });
    }

    /**
     * Create task submit
     *
     * @returns {Subscription}
     */
    onCreate() {
        let values = this.taskForm.value;

        return this.taskFormSubscription = this.taskService.createTask(values).subscribe(
            response => {
                this.taskService.repository.add(Task.newInstance(response.task));
                this.taskForm.reset();
                this.onCategoryChange(response.task.category_id);
                document.getElementById('close_modal').click();
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

        return this.taskFormSubscription = this.taskService.updateTask(this.selectedTask.id, values).subscribe(
            response => {
                let newTask = Task.newInstance(response.task);
                this.taskService.repository.update(newTask);
                this.taskForm.reset();
                this.onCategoryChange(newTask.category.getId());
                document.getElementById('close_modal').click();
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
        if (this.selectedTask == null) {
            return this.onCreate();
        }

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
        return this.taskFormSubscription = this.taskService.deleteTask(this.selectedTask.id).subscribe(
            response => {
                this.taskService.repository.remove(this.selectedTask.id);
                this.onCategoryChange(this.selectedTask.category.getId());
                this.selectedTask = null;
                document.getElementById('close_modal').click();
            },
            error => console.log('Ah, task not deleted!', error)
        );
    }

    onCategoryChange(val) {
        let categoryId = +val;

        this.categoryId = categoryId;

        this.selectedCategory = this.categoryService.findCategory(categoryId);

        this.categoryTasks = this.taskService.getFromCategory(categoryId);
    }

    updateList() {
        let inputs = document.getElementById('task_holder').getElementsByTagName('input');
        let values = [];

        _.forEach(inputs,
            input => values.push(input.value)
        );

        this.listFormSubscription = this.taskService.updateList(values).subscribe(
            response => console.log(response)
        );
    }

}
