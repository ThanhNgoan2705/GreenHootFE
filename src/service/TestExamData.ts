import type { Question } from "@/models/Question";
import { useAnswerStore } from "@/states/AnswersStore";
import { useQuestionStore } from "@/states/QuestionStore";
const questions: Question[] = [
    {
        id: 1,
        questionText: "What is the capital of France?",
        questionImage: "",
        questionType: "multiple-choice",
        questionTimeLimit: 10,
        questionPoints: 10,
        questionAnswer: [
            {
                id: 1,
                answerContent: "Paris",
                isCorrect: true,
            },
            {
                id: 2,
                answerContent: "London",
                isCorrect: false,
            },
            {
                id: 3,
                answerContent: "Berlin",
                isCorrect: false,
            },
            {
                id: 4,
                answerContent: "Madrid",
                isCorrect: false,
            },
        ],
    },
    {
        id: 2,
        questionText: "What is the capital of Spain?",
        questionImage: "",
        questionType: "multiple-choice",
        questionTimeLimit: 10,
        questionPoints: 10,
        questionAnswer: [
            {
                id: 1,
                answerContent: "Paris",
                isCorrect: false,
            },
            {
                id: 2,
                answerContent: "London",
                isCorrect: false,
            },
            {
                id: 3,
                answerContent: "Berlin",
                isCorrect: false,
            },
            {
                id: 4,
                answerContent: "Madrid",
                isCorrect: true,
            },
        ],
    },
    {
        id: 3,
        questionText: "What is the capital of Germany?",
        questionImage: "",
        questionType: "multiple-choice",
        questionTimeLimit: 10,
        questionPoints: 10,
        questionAnswer: [
            {
                id: 1,
                answerContent: "Paris",
                isCorrect: false,
            },
            {
                id: 2,
                answerContent: "London",
                isCorrect: false,
            },
            {
                id: 3,
                answerContent: "Berlin",
                isCorrect: true,
            },
            {
                id: 4,
                answerContent: "Madrid",
                isCorrect: false,
            },
        ],
    },
    {
        id: 4,
        questionText: "What is the capital of the United Kingdom?",
        questionImage: "",
        questionType: "multiple-choice",
        questionTimeLimit: 10,
        questionPoints: 10,
        questionAnswer: [
            {
                id: 1,
                answerContent: "Paris",
                isCorrect: false,
            },
            {
                id: 2,
                answerContent: "London",
                isCorrect: true,
            },
            {
                id: 3,
                answerContent: "Berlin",
                isCorrect: false,
            },
            {
                id: 4,
                answerContent: "Madrid",
                isCorrect: false,
            },
        ],
    },
    {
        id: 5,
        questionText: "What is the capital of Italy?",
        questionImage: "",
        questionType: "multiple-choice",
        questionTimeLimit: 10,
        questionPoints: 10,
        questionAnswer: [
            {
                id: 1,
                answerContent: "Paris",
                isCorrect: false,
            },
            {
                id: 2,
                answerContent: "London",
                isCorrect: false,
            },
            {
                id: 3,
                answerContent: "Rome",
                isCorrect: true,
            },
            {
                id: 4,
                answerContent: "Madrid",
                isCorrect: false,
            },
        ],
    },
];

const questionStore = useQuestionStore();
for (const question of questions) {
    questionStore.addQuestion(question);
}
console.log("QuestionStore", questionStore.getQuestions);

