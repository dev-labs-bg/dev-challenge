export class Submission {

    constructor(
        public id: number,
        public task_id: number,
        public user_id: number,
        public status: number = 0,
        public finished: string,
        public reviewed: boolean,
        public passed: boolean,
        public task: {
            assessment_type_id: number
            title: string
        },
    ) {}

    static newSubmission(el) {
        return new Submission(
            el.id,
            el.task_id,
            el.user_id,
            el.status,
            el.finished,
            el.reviewed,
            el.passed,
            el.task,
        );
    }
}
