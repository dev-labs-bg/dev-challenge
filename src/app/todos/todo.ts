import { Assessment } from '../assessment/assessment';

export class Todo {

    constructor(
        private task = {
            title: '',
            description: '',
            time_estimation: '',
        },
        public assessment: Assessment,
        private status: number = 0
    ) {}

    static newInstance(data) {

        const assessment = new Assessment(
            data.task.assessment_type_id,
            data.task.questions[0].body
        );

        return new Todo(
            {
                title: data.task.title,
                description: data.task.description,
                time_estimation: data.task.time_estimation,
            },
            assessment,
            data.status
        );
    }
}
