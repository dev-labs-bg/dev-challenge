import { Injectable } from '@angular/core';
import { SubmissionService } from '../submissions/submission.service';
import { Task } from './task';
import { HttpService } from '../../services/http.service';
import { Repository } from '../../core/repository';
import * as _ from 'lodash';

@Injectable()
export class TaskService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('task/all'),
    };

    constructor(
        private httpService: HttpService,
        private submissionService: SubmissionService
    ) {}

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
     * Delete task http request
     *
     * @param id
     * @returns {Observable<R>}
     */
    deleteTask(id) {
        return this.httpService.delete('task/' + id);
    }

    getFromCategory(category_id) {
        let categoryTasks: Task[] = [];
        let categoryId = parseInt(category_id, 10);

        _.forEach(this.repository.getData(),
            task => {
                if (task.category.getId() === categoryId) {
                    categoryTasks.push(task);
                }
            }
        );

        return categoryTasks;
    }

    findSubmissions(id) {
        let submissions = this.submissionService.getSubmissions();
        let taskId = parseInt(id, 10);

        let taskSubmissions = [];

        _.forEach(submissions,
            submission => {
                if (submission.task_id === taskId) {
                    taskSubmissions.push(submission);
                }
            }
        );

        return taskSubmissions;
    }

    updateList(data) {
        return this.httpService.put('task/update-list', data);
    }

}
