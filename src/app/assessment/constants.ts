// All assessment types
export const ASSESSMENT_TYPES = {
    MICRO_PROJECT: 1,
    EXAM: 2,
    QUESTION: 3
};


export const ASSESSMENT_ANSWER_TYPES = {
    OPEN_ANSWER: 'openAnswer',
    EXAM_ANSWER: 'examAnswer',
    AUDIO_ANSWER: 'audioAnswer'
};


export const ASSESSMENT_OPEN_ANSWER_TYPES = {
    AUDIO: 'App\\Models\\UserAnswers\\AudioAnswer',
    TEXT: 'App\\Models\\UserAnswers\\OpenAnswer'
};


export const TODO_STATUSES = {
    UNCOMPLETED: 0,
    SUBMITTED_FOR_REVIEW: 1,
    DENIED: 2,
    COMPLETED: 3
};
