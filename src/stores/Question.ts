import {defineStore} from "pinia";
import type Answer from "@/stores/Answers";

export default interface Question {
    id: String;
    questionText: String;
    questionImage: String;
    questionType: String;
    QuestionTimeLimit: Number;
    questionPoints: Number;
    questionAnswerOptions: String;
    questionAnswer: Array<Answer>;
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
        duplicateQuestion(questionId: String) {
            const question = this.questions.find((question) => question.id === questionId);
            if (!question) return;
            this.questions.push({...question, id: Math.random().toString()});
        }
    },
});