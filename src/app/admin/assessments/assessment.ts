export class Assessment {

    private mappedTypes = {
        'Micro project': 'Open-Answer',
        'Exam': 'Exam-Answer',
        'Answer to a question': 'Open-Answer',
    };

    constructor(
        public id: number,
        public type: string
    ) {}

    public mappedType() {
        return this.mappedTypes[this.type];
    }

    static newInstance(data) {
        return new Assessment(
            data.id,
            data.type
        );
    }

}
