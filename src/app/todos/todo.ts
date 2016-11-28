export class Todo {

    constructor(
        private task = {
            title: '',
            description: '',
            time_estimation: '',
        },
        private status: number = 0,
    ) {}

    static newInstance(data) {

        return new Todo(
            {
                title: data.task.title,
                description: data.task.description,
                time_estimation: data.task.time_estimation,
            },
            data.status
        );
    }
}
