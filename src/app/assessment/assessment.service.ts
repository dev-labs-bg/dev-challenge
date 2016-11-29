import { Injectable } from '@angular/core';

import { ASSESSMENT_ANSWER_TYPES } from './constants';
import { HttpService } from '../services/http.service';

@Injectable()
export class AssessmentService {

    constructor(private httpService: HttpService) { }

    createAssessment(todoId: number, questionId: number, answer: string) {
        return this.httpService.post(`answer/${questionId}`, {
            type: ASSESSMENT_ANSWER_TYPES.OPEN_ANSWER,
            todo_id: todoId,
            body: answer
        });
    }

}
