export class Assessment {

    constructor(
        public id: number = -1,
        public type: string = ''
    ) {}

    static newInstance(data) {
        return new Assessment(
            data.id,
            data.type
        );
    }

}
