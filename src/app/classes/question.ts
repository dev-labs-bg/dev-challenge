import { Task } from './task';

export class Question {

    constructor(
        public id: number = -1,
        public task_id: number = -1,
        public body: string = '',
    ) {}

    public static newQuestion(data) {
        return new Question(
            data.id,
            data.task_id,
            data.body
        );
    }

}
