export class Assessment {

    constructor(
        public id: number = -1,
        public description: string = '',
        public questionId: number = -1,
        public todoId: number = -1
    ) {}

}

export class Task {
    constructor(
        public assessment_type_id: string = '',
        public title: string = '',
        public description: string = '',
        public time_estimation: number = -1,
        public questions: Question[]
    ) {}
}

export class Answer {
    constructor(
        public id: number = -1,
        public body: string = '',
        public is_correct: boolean = false,
        public why_correct: string = ''
    ) {}
}

export class Question {
    constructor(
        public id: number = -1,
        public body: string = '',
        public answers: Answer[] = []
    ) {}
}
