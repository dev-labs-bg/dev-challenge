import { Assessment, Question, Answer, Task } from '../assessment/assessment';

export class Todo {

    constructor(
        public id: number,
        public task: Task,
        public assessment: Assessment,
        public status: number = 0,
        public active: number = 0,
        public days_left: number = 0,
        public submissions = []
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
            data.id,
            new Task(
                data.task.assessment_type_id,
                data.task.title,
                data.task.description,
                data.task.time_estimation,
                data.task.questions.map(question =>
                    new Question(
                        question.id,
                        question.body,
                        question.answers.map(answer =>
                            new Answer(
                                answer.id,
                                answer.body,
                                !! answer.is_correct,
                                answer.why_correct
                            )
                        )
                    )
                )
            ),
            assessment,
            data.status,
            data.active,
            data.days_left,
            data.submissions
        );
    }
}
