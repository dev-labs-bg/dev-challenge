import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../categories/category.service';
import {Category} from '../categories/category';
import {Task} from '../tasks/Task';
import {TaskService} from '../tasks/task.service';
import {SubmissionService} from './submission.service';

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
        private submissionService: SubmissionService
    ) { }

    ngOnInit() {
        this.categoryService.getAll();
        this.submissionService.getAll();
        this.taskService.getAll();
    }

    onCategoryChange(val) {
        let categoryId = val;

        this.selectedCategory = this.categoryService.findCategory(categoryId);

        this.categoryTasks = this.taskService.getFromCategory(categoryId);
    }

}
