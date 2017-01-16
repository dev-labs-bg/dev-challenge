import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as _ from 'lodash';

import {CategoryService} from '../categories/category.service';
import {Category} from '../categories/category';
import {SubmissionService} from './submission.service';
import {UserService} from '../../shared/user.service';
import {TaskService} from '../tasks/task.service';
import {Task} from '../tasks/task';
import {Subscription} from 'rxjs/Rx';
import {User} from '../../classes/user';
import { TODO_STATUSES } from '../../assessment/constants';

@Component({
  selector: 'xp-approvals',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
    private selectedCategory: Category = null;
    private categoryUsers: User[] = [];
    private routeSubscription: Subscription;
    private category: number;
    private TODO_STATUSES = TODO_STATUSES;

    constructor(
        private categoryService: CategoryService,
        private submissionService: SubmissionService,
        private userService: UserService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.submissionService.getAll();
        this.taskService.setup();

        this.routeSubscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                new Promise(
                    resolve => {
                        this.categoryService.repository.getAll(this.categoryService.apiGetURLS.all).subscribe(
                            response => {
                                this.categoryService.repository.setData(response.data.map(
                                    el => Category.newInstance(el)
                                ));

                                this.userService.repository.getAll(this.userService.apiGetURLS.all).subscribe(
                                    response => {
                                        this.userService.repository.setData(response.data.map(
                                            el => User.newInstance(el)
                                        ));

                                        // load category
                                        if (param['id']) {
                                            this.onCategoryChange(param['id']);
                                        }
                                        resolve(response.success);
                                    },
                                    error => console.log('Ah, users failed to load')
                                )
                            },
                            error => console.log('Ah, submission was not found')
                        );
                    }
                );
            }
        );
    }

    onCategoryChange(val) {
        let categoryId = val;

        this.selectedCategory = this.categoryService.repository.find(categoryId);

        this.categoryUsers = this.userService.findByCategory(categoryId);

        this.category = this.selectedCategory.getId();
    }

}
