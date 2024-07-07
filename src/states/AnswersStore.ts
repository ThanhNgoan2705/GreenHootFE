import {defineStore} from "pinia";

export default interface AnswerStore {
    questionId: number;
    answerNumber: number;
    answer: string;
    isCorrect: boolean;
}
export const useAnswerStore = defineStore({

    id: "answer",
    state: () => ({
        answers: [] as AnswerStore[],
    }),
    actions: {
        addAnswer(answer: AnswerStore) {
            this.answers.push(answer);
        },
        removeAnswer(questionId: number) {
            this.answers = this.answers.filter((answer) => answer.questionId !== questionId);
        },
        getAnswer(questionId: number) {
            return this.answers.find((answer) => answer.questionId === questionId);
        },
    },
    getters: {
        getAnswers: (state) => {
            return state.answers;
        },
    },
});
