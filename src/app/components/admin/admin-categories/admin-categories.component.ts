import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../../services/category.service";
import {Category} from "../../../classes/category";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'xp-admin-categories',
    templateUrl: './admin-categories.component.html',
    styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
    private categories: Promise<Category[]> | Category[];
    public categoryCreationTab: boolean = false;
    public showCreationSuccess: boolean = false;
    public categoryForm: FormGroup;

    constructor(
      private categoryService: CategoryService,
      private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.categories = this.categoryService.getCategories();

        this.categoryForm = this.formBuilder.group({
            'name': [null, Validators.required]
        });
    }

    /**
     * Change categoryCreationTab to true
     *
     * @returns void
     */
    showCategoryCreationTab() {
        this.categoryCreationTab = true;
    }

    /**
     * Change categoryCreationTab to false
     *
     * @returns void
     */
    hideCategoryCreationTab() {
        this.categoryCreationTab = false;
    }

    onSubmit() {
        const { name } = this.categoryForm.value;

        this.categoryService.createCategory({name: name}).subscribe(
            response => {
                if (response.success) {
                    this.categoryService.addCategory(
                        new Category(response.category.name)
                    );
                    this.showCreationSuccess = true;
                    this.categoryForm.reset();
                }

                console.log(response);
            }
        );
    }

}
