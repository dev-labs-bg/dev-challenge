import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../classes/category";
import {CategoryFormService} from "./category-form.service";

@Component({
  selector: 'xp-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {

    /**
     * @var category form
     */
    public categoryForm: FormGroup;

    /**
     * @var Category Creation success after submit
     * @type {boolean}
     */
    public showCreationSuccess: boolean = false;

    /**
     * @var Parent component variable
     */
    @Input() category: Category;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        /* we use this in html, so never mind the highlight */
        private categoryFormService: CategoryFormService
    ) { }

    /**
     * Init category form
     */
    ngOnInit() {
        let formId = (this.category != null) ? this.category.getId() : '';
        let formName = (this.category != null) ? this.category.getName() : '';

        this.categoryForm = this.formBuilder.group({
            'id': [formId],
            'name': [formName, Validators.required]
        });
    }

    /**
     * Form submission on new category creation
     */
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

    /**
     * Form submission on category update
     */
    onUpdate() {
        const { id, name } = this.categoryForm.value;

        this.categoryService.updateCategory(id, name).subscribe(
            response => {
                if (response.success) {
                    let updatedCategory = new Category(
                        response.category.id,
                        response.category.name
                    );

                    this.categoryService.updateMainArray(updatedCategory);
                }
            }
        );
    }

    /**
     * Handle for delete category button event
     *
     * @param category
     */
    deleteCategory(category) {
        let confirmation = "Are you sure to want to delete category with name: " + category.getName();

        if (confirm(confirmation)) {
            const { id } = this.categoryForm.value;

            this.categoryService.deleteCategory(id).subscribe(
                response => {
                    if (response.success) {
                        this.categoryService.removeCategory(id);
                    }
                }
            );
        }
    }

    /**
     * Handle form submission depending on the fact
     * do we have a category or not
     *
     * @param category
     */
    handleForm(category) {
        if (category == null)
            this.onCreate();
        else
            this.onUpdate();
    }

}
