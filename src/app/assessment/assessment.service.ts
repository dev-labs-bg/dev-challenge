import { Injectable } from '@angular/core';

import { ASSESSMENT_ANSWER_TYPES } from './constants';
import { HttpService } from '../services/http.service';

@Injectable()
export class AssessmentService {

    constructor(private httpService: HttpService) { }

    uploadOpenQuestionAudio(todoId: number, questionId: number, audio) {
        return this.httpService.upload(`answer/${questionId}`, {
            type: ASSESSMENT_ANSWER_TYPES.AUDIO_ANSWER,
            todo_id: todoId,
            audio
        });
    }

    submitOpenQuestionAnswer(todoId: number, questionId: number, answer: string) {
        return this.httpService.post(`answer/${questionId}`, {
            type: ASSESSMENT_ANSWER_TYPES.OPEN_ANSWER,
            todo_id: todoId,
            body: answer
        });
    }

    submitExamAnswer(todoId: number, questionId: number, answerId: number) {
        return this.httpService.post(`answer/${questionId}`, {
            type: ASSESSMENT_ANSWER_TYPES.EXAM_ANSWER,
            todo_id: todoId,
            question_answer_id: answerId
        });
    }

    resetExam(todoId: number) {
        return this.httpService.post(`submission/${todoId}/reset`);
    }

}
