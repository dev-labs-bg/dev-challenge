import { AssessmentType } from './assessment-type';
import { Category } from '../categories/category';

export class Task {

    constructor(
        public id: number,
        public category: Category,
        public assessment: AssessmentType,
        public title: string,
        public description: string,
        public time_estimation: number,
        public created_at: string
    ) {}

    public static newTask(data) {

        let category = new Category(
            data.category.id,
            data.category.name,
        );

        let assessment = new AssessmentType(
            data.assessment.id,
            data.assessment.type,
        );

        return new Task(
            data.id,
            category,
            assessment,
            data.title,
            data.description,
            data.time_estimation,
            data.created_at
        );
    }

    public toForm() {
        return {
            category_id: this.category.getId(),
            assessment_type_id: this.assessment.id,
            title: this.title,
            description: this.description,
            time_estimation: this.time_estimation
        };
    }


}