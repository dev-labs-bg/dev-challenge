import * as _ from 'lodash';

import { ASSESSMENT_TYPES } from '../../assessment/constants';

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

    static getNameByType(type) {
        return _.find(ASSESSMENT_TYPES, { id: type }).name;
    }

}
