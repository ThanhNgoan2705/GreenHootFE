import {defineStore} from "pinia";

export default interface Answer {
    questionId: number;
    answer: string;
}
export const useAnswerStore = defineStore({

    id: "answer",
    state: () => ({
        answers: [] as Answer[],
    }),
    actions: {
        addAnswer(answer: Answer) {
            this.answers.push(answer);
        },
        removeAnswer(questionId: number) {
            this.answers = this.answers.filter((answer) => answer.questionId !== questionId);
        },
    },
});
