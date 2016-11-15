export class Task {

    constructor(
        private id: number,
        private category_id: number,
        private assessment_type_id: number,
        private title: string,
        private description: string,
        private time_estimation: number,
        private created_at: string
    ) {}

    public static newTask(data) {
        return new Task(
            data.id,
            data.category_id,
            data.assessment_type_id,
            data.title,
            data.description,
            data.description,
            data.created_at
        );
    }
}