import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../categories/category.service';
import {Category} from '../categories/category';
import {SubmissionService} from './submission.service';
import {UserService} from '../../shared/user.service';
import {TaskService} from '../tasks/task.service';
import {User} from '../../classes/user';
import * as _ from 'lodash';

@Component({
  selector: 'xp-approvals',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
    private selectedCategory: Category = null;
    private categoryUsers: User[] = [];

    constructor(
        private categoryService: CategoryService,
        private submissionService: SubmissionService,
        private userService: UserService,
        private taskService: TaskService,
    ) { }

    ngOnInit() {
        this.categoryService.setup();
        this.submissionService.getAll();
        this.userService.setup();
        this.taskService.setup();
    }

    onCategoryChange(val) {
        let categoryId = val;

        this.selectedCategory = this.categoryService.repository.find(categoryId);

        this.categoryUsers = this.userService.findByCategory(categoryId);
    }

}
