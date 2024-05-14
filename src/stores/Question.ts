import {defineStore} from "pinia";

interface Question {
    id: String;
    questionText: String;
    questionImage: String;
    questionType: String;
    QuestionTimeLimit: Number;
    questionPoints: Number;
    questionAnswerOptions: String;
    questionAnswer: String[];
}

export const useQuestionStore = defineStore({
    id: "question",
    state: () => ({
        questions: [] as Question[],
    }),
    actions: {
        addQuestion(question: Question) {
            this.questions.push(question);
        },
        removeQuestion(questionId: String) {
            this.questions = this.questions.filter((question) => question.id !== questionId);
        },
    },
});