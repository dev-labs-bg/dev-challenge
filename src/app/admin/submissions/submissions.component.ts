import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../categories/category.service';
import {Category} from '../categories/category';
import {TaskService} from '../tasks/task.service';
import {SubmissionService} from './submission.service';
import {UserService} from '../../shared/user.service';
import {Task} from '../tasks/task';

@Component({
  selector: 'xp-approvals',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
    private selectedCategory: Category = null;
    private categoryTasks: Task[] = [];

    constructor(
        private categoryService: CategoryService,
        private taskService: TaskService,
        private submissionService: SubmissionService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.categoryService.setup();
        this.submissionService.getAll();
        this.taskService.setup()
        this.userService.setup();
    }

    onCategoryChange(val) {
        let categoryId = val;

        this.selectedCategory = this.categoryService.repository.find(categoryId);

        this.categoryTasks = this.taskService.getFromCategory(categoryId);
    }

}
