import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'xp-admin-categories-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getAll();
    }

}
