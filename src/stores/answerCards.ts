import { defineStore } from 'pinia';
interface AnswerCard {
    id: string;
    innerText: string;
    contentEditable: string;
}
export const answerCards = defineStore({
    id: 'answerCards',
    state: () => ({
        answerCards: [] as AnswerCard[],
    }),
    actions: {
        makeEditable(index: number) {
            this.answerCards.forEach((answerCard, i) => {
                if (i === index) {
                    answerCard.innerText = ' ';
                    answerCard.contentEditable = 'true';
                } else if (i !== index && answerCard.innerText === '') {
                    answerCard.innerText = 'Add answer ' + (i + 1);
                    answerCard.contentEditable = 'false';
                }
            });
        },
        EditAbleAnswerCards(answerCards: AnswerCard) {
            const i = this.answerCards.findIndex((answerCard) => answerCard.id === answerCards.id);
        },
    },
    getters: {
        getAnswerCards(): AnswerCard[]{
            return this.answerCards;
        },
    },
});