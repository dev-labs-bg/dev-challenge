export class Task {

    constructor(
        public id: number,
        public category_id: number,
        public assessment_type_id: number,
        public title: string,
        public description: string,
        public time_estimation: number,
        public created_at: string
    ) {}

    public static newTask(data) {
        return new Task(
            data.id,
            data.category_id,
            data.assessment_type_id,
            data.title,
            data.description,
            data.time_estimation,
            data.created_at
        );
    }

    public getId() {
        return this.id;
    }

    public toForm() {
        return {
            category_id: this.category_id,
            assessment_type_id: this.assessment_type_id,
            title: this.title,
            description: this.description,
            time_estimation: this.time_estimation
        };
    }
}