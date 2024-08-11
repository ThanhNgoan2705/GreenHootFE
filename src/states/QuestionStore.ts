

import type { Question } from "@/proto/Proto";
import { defineStore } from "pinia";
export const useQuestionStore = defineStore('question', {
    state: () => ({
        question : {} as Question,
        nextQuestion: {} as Question,
        questions: [] as Question[],
        activeQuestionId: 0 as number | null,
        selectQuestion: {} as Question,
        selectedQuestionId: 1,
        questionIndex: 1,
        isUpdateQuestion: false,
        isNewQuestion: false,
        totalQuestion: 0,
        updateQuestionList: [] as Question[],
        isLockQuestion: false,
    }),
    actions: {
        addQuestion(question: Question) {
            this.questions.push(question);
        },
        addFirstQuestion(firstQuestionId: number, examId: number) {
            if (firstQuestionId) {
                console.log("co firstQuestionId la " + firstQuestionId)
                this.activeQuestionId = firstQuestionId;
                this.selectedQuestionId = firstQuestionId;
                if (this.questions.length === 0) {
                    this.questions.push({
                        questionText: "Start entering your question here",
                        imageUrl: "",
                        choices: [
                            {
                                choiceId: 1,
                                imageUrl: "",
                                choiceIndex: 1,
                                questionId: firstQuestionId,
                                status: 1,
                                choiceText: "Enter your answer here",
                                isCorrect: false
                            },
                            {
                                choiceId: 2,
                                imageUrl: "",
                                choiceIndex: 2,
                                questionId: firstQuestionId,
                                status: 1,
                                choiceText: "Enter your answer here",
                                isCorrect: false
                            },
                            {
                                choiceId: 3,
                                imageUrl: "",
                                choiceIndex: 3,
                                questionId: firstQuestionId,
                                status: 1,
                                choiceText: "Enter your answer here",
                                isCorrect: false
                            },
                            {
                                choiceId: 4,
                                imageUrl: "",
                                choiceIndex: 4,
                                questionId: firstQuestionId,
                                status: 1,
                                choiceText: "Enter your answer here",
                                isCorrect: false
                            }
                        ],
                        questionId: firstQuestionId,
                        questionIndex: this.questionIndex,
                        time: 20,
                        examId:examId,
                        status: 1, 
               
                    });
                }
            }
        },
        addNewQuestion(questionId: number, examId: number) {
            this.activeQuestionId = questionId;
            this.selectedQuestionId = questionId;
            this.question = {
                questionText: "Start entering your question here",
                imageUrl: "",
                choices: [
                    {
                        choiceId: 1,
                        imageUrl: "",
                        choiceIndex: 1,
                        questionId: questionId,
                        status: 1,
                        choiceText: "Enter your answer here",
                        isCorrect: false
                    },
                    {
                        choiceId: 2,
                        imageUrl: "",
                        choiceIndex: 2,
                        questionId: questionId,
                        status: 1,
                        choiceText: "Enter your answer here",
                        isCorrect: false
                    },
                    {
                        choiceId: 3,
                        imageUrl: "",
                        choiceIndex: 3,
                        questionId: questionId,
                        status: 1,
                        choiceText: "Enter your answer here",
                        isCorrect: false
                    },
                    {
                        choiceId: 4,
                        imageUrl: "",
                        choiceIndex: 4,
                        questionId: questionId,
                        status: 1,
                        choiceText: "Enter your answer here",
                        isCorrect: false
                    }
                ],
                questionId: questionId,
                questionIndex: this.questions.length + 1,
                time: 20,
                examId:examId,
                status: 1, 
            };
            this.questions.push(this.question);
            this.nextQuestion = this.question;
            this.isUpdateQuestion = false;
            this.isNewQuestion = true;
        },
        setQuestion(question: Question) {
            this.question = question;
        },
        updateQuestion(updatedQuestion: Partial<Question>) {
            const index = this.questions.findIndex((q) => q.questionId === this.activeQuestionId);
            if (index > -1) {
                this.questions[index] = { ...this.questions[index], ...updatedQuestion };
            }
            this.isUpdateQuestion = true;
            this.isNewQuestion = false;
        },
        setUpdateQuestionList(question: Question) {
            this.updateQuestionList.push(question);
        },
        setSelectQuestion(questionId: number, questionIndex: number) {
            this.selectedQuestionId= questionId;
            this.questionIndex = questionIndex;
        },
        deleteQuestion(questionId: number) {
            this.questions = this.questions.filter((q) => q.questionId !== questionId);
        },
        setTotalQuestion(totalQuestion: number) {
            this.totalQuestion = totalQuestion;
        },
        setIsLockQuestion(isLock: boolean) {
            this.isLockQuestion = isLock;
        }
    },
    getters: {
        getQuestions: (state) => state.questions,
        getSelectedQuestion: (state) => state.questions.find((q) => q.questionId === state.selectedQuestionId),
        getQuestion: (state) => state.questions.find((q) => q.questionId === state.activeQuestionId),
        getNextQuestion: (state) => state.nextQuestion,
        getQuestionSelected: (state) => state.question,
        getUpdateQuestionList: (state) => state.updateQuestionList,
        getIsNewQuestion: (state) => state.isNewQuestion,
        getIsLockQuestion: (state) => state.isLockQuestion,
        
    },
});


