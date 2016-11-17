import { Task } from './task';

export class Question {

    constructor(
        public id: number,
        public task_id: number,
        public body: string,
    ) {}

    public static newQuestion(data) {
        return new Question(
            data.id,
            data.task_id,
            data.body
        );
    }

}
