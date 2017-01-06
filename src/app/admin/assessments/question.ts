export class Question {

    constructor(
        public id: number = -1,
        public task_id: number = -1,
        public body = '',
        public examAnswers: Array<any> = [],
    ) {}

    public static newQuestion(data) {
        return new Question(
            data.id,
            data.task_version_id,
            data.body,
            data.answers
        );
    }

}
