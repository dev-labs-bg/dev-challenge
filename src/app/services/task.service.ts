import { Injectable } from '@angular/core';
import { Task } from "../classes/task";
import { HttpService } from "./http.service";
import {Subscription} from "rxjs/Rx";

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

    createTask(values) {
        return this.httpService.post('task', values);
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

}
