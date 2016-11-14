import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../classes/category";
import {CategoryFormService} from "./category-form.service";

@Component({
  selector: 'xp-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
    public categoryForm: FormGroup;
    public showCreationSuccess: boolean = false;
    @Input() category: Category;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private categoryFormService: CategoryFormService
    ) { }

    ngOnInit() {
        let formId = (this.category != null) ? this.category.getId() : '';
        let formName = (this.category != null) ? this.category.getName() : '';

        this.categoryForm = this.formBuilder.group({
            'id': [formId],
            'name': [formName, Validators.required]
        });
    }

    onCreate() {
        this.showCreationSuccess = false;

        const { name } = this.categoryForm.value;

        this.categoryService.createCategory({name: name}).subscribe(
            response => {
                if (response.success) {
                    this.categoryService.addCategory(
                        new Category(
                            response.category.id,
                            response.category.name
                        )
                    );
                    this.showCreationSuccess = true;
                    this.categoryForm.reset();
                }
            }
        );
    }

    onUpdate() {
        const { id, name } = this.categoryForm.value;

        this.categoryService.updateCategory(id, name).subscribe(
            response => {
                if (response.success) {
                    let updatedCategory = new Category(
                        response.category.id,
                        response.category.name
                    );

                    this.categoryService.changeCategoriesValue(updatedCategory);
                }
            }
        );
    }

    handleForm(category) {
        if (category == null)
            this.onCreate();
        else
            this.onUpdate();
    }

}
