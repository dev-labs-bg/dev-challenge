export class Question {

    constructor(
        public id: number = -1,
        public task_id: number = -1,
        public body = '',
        public examAnswers: Array<any> = [],
    ) {}

    public static newInstance(data) {
        
        return new Question(
            data.id,
            data.task_id,
            data.body,
            data.answers
        );
    }

}
