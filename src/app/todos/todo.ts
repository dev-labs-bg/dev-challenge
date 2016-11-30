import { Assessment } from '../assessment/assessment';

export class Todo {

    constructor(
        private task = {
            assessment_type_id: '',
            title: '',
            description: '',
            time_estimation: '',
            questions: []
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
            data.task.questions.length ? data.task.questions[0].id : -1,
            data.id
        );

        return new Todo(
            {
                assessment_type_id: data.task.assessment_type_id,
                title: data.task.title,
                description: data.task.description,
                time_estimation: data.task.time_estimation,
                questions: data.task.questions,
            },
            assessment,
            data.status,
            data.submissions
        );
    }
}
