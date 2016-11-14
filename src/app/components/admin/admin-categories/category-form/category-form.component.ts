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
    @Input() category: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private categoryFormService: CategoryFormService
    ) { }

    ngOnInit() {
        this.categoryForm = this.formBuilder.group({
            'name': [null, Validators.required]
        });
    }

    onCreate() {
        this.showCreationSuccess = false;

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
            }
        );
    }

    onUpdate() {
        console.log(5);
    }

    handleForm(category) {
        if (category == null)
            this.onCreate();
        else
            this.onUpdate();
    }

}
