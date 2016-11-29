import { Assessment } from '../assessment/assessment';

export class Todo {

    constructor(
        private task = {
            title: '',
            description: '',
            time_estimation: '',
        },
        public assessment: Assessment,
        private status: number = 0,
        private submissions = []
    ) {}

    static newInstance(data) {

        // Note: there will be always 1 item in the questions array
        const assessment = new Assessment(
            data.task.assessment_type_id,
            data.task.questions.length ? data.task.questions[0].body : '',
            data.task.questions.length ? data.questions[0].id : -1,
            data.id
        );

        return new Todo(
            {
                title: data.task.title,
                description: data.task.description,
                time_estimation: data.task.time_estimation,
            },
            assessment,
            data.status,
            data.submissions
        );
    }
}
