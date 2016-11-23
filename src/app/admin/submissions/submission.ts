export class Submission {

    constructor(
        public id: number,
        public task_id: number,
        public user_id: number,
        public finished: string,
        public passed: boolean
    ) {}

    static newSubmission(el) {
        return new Submission(
            el.id,
            el.task_id,
            el.user_id,
            el.finished,
            el.passed
        );
    }
}
