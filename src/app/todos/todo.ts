export class Todo {

    constructor(
        private task = {
            title: '',
            description: '',
            time_estimation: '',
        },
        public assessment: { type: number, description: string } = {
            type: -1,
            description: ''
        },
        private status: number = 0
    ) {}

    static newInstance(data) {

        return new Todo(
            {
                title: data.task.title,
                description: data.task.description,
                time_estimation: data.task.time_estimation,
            },
            {
                type: data.task.assessment_type_id,
                description: data.task.questions[0].body
            },
            data.status
        );
    }
}
