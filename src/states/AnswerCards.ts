// src/stores/AnswerCards.ts
import {defineStore} from 'pinia';

interface AnswerCard extends HTMLElement {
    id: string;
    text: string;
    markTrue: boolean;
    limitChar: number;
    isEditable: boolean;
    bgColor: string;
    answerText: string;
    image: string;
}

export const answerCards = defineStore({
    id: 'answerCards',
    state: () => ({
        answerCards: [
            {
                id: '1',
                text: 'Add your answer 1',
                markTrue: false,
                limitChar: 100,
                isEditable: false,
                bgColor: 'white',
                answerText: '',
                image: ''
            },
            {
                id: '2',
                text: 'Add your answer 2',
                markTrue: false,
                limitChar: 100,
                isEditable: false,
                bgColor: 'white',
                answerText: '',
                image: ''
            },
            {
                id: '3',
                text: 'Add your answer 3',
                markTrue: false,
                limitChar: 100,
                isEditable: false,
                bgColor: 'white',
                answerText: '',
                image: ''
            },
            {
                id: '4',
                text: 'Add your answer 4',
                markTrue: false,
                limitChar: 100,
                isEditable: false,
                bgColor: 'white',
                answerText: '',
                image: ''
            },
        ],
        colorBg: [
            {id: '1', bgColor: 'rgb(226,27,60)'},
            {id: '2', bgColor: 'rgb(19,104,206)'},
            {id: '3', bgColor: 'rgb(0,128,0)'},
            {id: '4', bgColor: 'rgb(216, 158, 0)'}
        ]
    }),
    actions: {
        makeEditable(index: number) {
            this.answerCards.forEach((card, i) => {
                if (i === index && card.text === 'Add your answer' + ' ' + (index + 1)) {
                    card.text = '';
                    card.isEditable = true;
                    console.log("card"+card.answerText);
                    card.markTrue = true;
                } else if (i !== index && card.answerText === '') {
                    card.text = 'Add your answer' + ' ' + (i + 1);
                    card.isEditable = false;
                    card.markTrue = false;
                }
            });
        },
        changeBgColor(index: number): string {
            const colorMap = new Map(this.colorBg.map((color, index) => [index, color.bgColor]));
            let colorBG = 'white';
            if (index < this.answerCards.length && this.answerCards[index].text !== 'Add your answer' + ' ' + (index + 1)&& this.answerCards[index].answerText !== '') {
                colorBG = colorMap.get(index) as string || 'white';
            }
            return colorBG;
        },
        addAnswerText(index: number, text: string) {
            if (index < this.answerCards.length) {
                this.answerCards[index].answerText = text;
            }
        },
        addAnswerImage(index: number) {
        },
        removeAnswerImage(index: number) {
            if (index < this.answerCards.length) {
                this.answerCards[index].image = '';
            }
        }
    },
});
