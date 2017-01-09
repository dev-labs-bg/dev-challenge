import { Assessment } from '../assessments/assessment';
import { Category } from '../categories/category';

export class Task {

    constructor(
        public id: number = -1,
        public category: Category = new Category(),
        public assessment: Assessment = new Assessment(),
        public title: string = '',
        public description: string = '',
        public time_estimation: number = -1,
        public disabled: boolean = false,
        public disabledText: string = '',
        public created_at: string = ''
    ) {}

    static newInstance(data) {

        let category = new Category(
            data.category.id,
            data.category.name,
        );

        let assessment = new Assessment(
            data.assessment.id,
            data.assessment.type
        );

        return new Task(
            data.id,
            category,
            assessment,
            data.title,
            data.description,
            data.time_estimation,
            data.disabled,
            data.disabled ? 'Disabled' : 'Active',
            data.created_at
        );
    }

    toForm() {
        return {
            category_id: this.category.getId(),
            assessment_type_id: this.assessment.id,
            title: this.title,
            description: this.description,
            time_estimation: this.time_estimation,
            disabled: !this.disabled,
        };
    }
}
