export class AssessmentType {

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

}