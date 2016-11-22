export class Submission {

    constructor(
        public id: number,
        public task_id: number,
        public user_id: number,
        public finished: string,
        public approved: boolean
    ) {}

}
