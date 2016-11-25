export class Todo {

    constructor(
        private title: string = '',
        private description: string = '',
        private time_estimation: number = -1,
        private completed: boolean = false
    ) {}

    static newInstance(data) {
        const { title, description, time_estimation, pivot } = data;

        return new Todo(
            title,
            description,
            time_estimation,
            !! pivot.completed
        );
    }
}
