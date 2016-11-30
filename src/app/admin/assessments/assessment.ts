export class Assessment {

    constructor(
        public id: number,
        public type: string
    ) {}

    static newInstance(data) {
        return new Assessment(
            data.id,
            data.type
        );
    }

}
