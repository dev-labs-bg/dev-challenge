import { Injectable } from '@angular/core';
import { Task } from "../classes/task";
import { HttpService } from "./http.service";
import { Subscription } from "rxjs/Rx";

var _ = require('lodash');

@Injectable()
export class TaskService {
    private tasks: Task[];

    constructor(
        private httpService: HttpService
    ) {}

    /**
     * Get all tasks or call http request
     * to fetch them
     *
     * @returns {any}
     */
    getAll(): Subscription | Task[] {
        let tasks = this.getTasks();

        if (tasks != null) {
            return tasks;
        }

        return this.httpService.get('task/all').subscribe(
            response => this.tasks = response.tasks.map(
                el => Task.newTask(el)
            )
        );
    }

    /**
     * get fetched tasks
     *
     * @returns {Task[]}
     */
    getTasks() {
        return this.tasks;
    }

    /**
     * Create task http request
     *
     * @param values
     * @returns {Observable<R>}
     */
    createTask(values) {
        return this.httpService.post('task', values);
    }

    /**
     * Update task http request
     *
     * @param id
     * @param values
     * @returns {Observable<R>}
     */
    updateTask(id, values) {
        return this.httpService.put('task/' + id, values);
    }

    /**
     * Update a task from the main array
     * with a new one
     *
     * @param task
     * @returns {Task[]}
     */
    updateMainArray(task: Task) {
        let id = task.getId();
        let taskIndex = _.findIndex(this.tasks, { id });

        this.tasks[taskIndex] = task;

        return this.tasks;
    }

    /**
     * Delete task http request
     *
     * @param id
     * @returns {Observable<R>}
     */
    deleteTask(id) {
        return this.httpService.delete('task/' + id);
    }

    /**
     * Remove a task from the main array
     *
     * @param id
     * @returns {any}
     */
    removeTask(id) {
        return _.remove(this.tasks, { id });
    }

    /**
     * Add a task to main tasks []
     *
     * @param task
     * @returns {number}
     */
    addTask(task) {
        return this.tasks.push(task);
    }

    getFromCategory(category_id: number) {
        let categoryTasks: Task[] = [];

        _.forEach(this.tasks,
            task => {
                if (task.category_id == category_id)
                    categoryTasks.push(task);
            }
        );

        return categoryTasks;
    }

}
