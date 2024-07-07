
import {defineStore} from "pinia";
import type { Exam, Question } from "@/proto/Proto";
export const useExamStore = defineStore('Exam', {
    state: () => ({
        exams: [] as Exam[],
        exam: {} as Exam,
        ExamQuestions: [] as Question[],
        isCreateNewExam: true,
        examId : sessionStorage.getItem("examId") ? JSON.parse(sessionStorage.getItem("examId") || "") : 0,
    }),
    actions: {
        addExam(exam: Exam) {
          this.exams.push(exam);
        },
        setExam(exam: Exam) {
            this.exam = exam;
        },
        setExamId(examId: number) {
            this.examId = examId;
            sessionStorage.setItem("examId", JSON.stringify(examId));
        },
            
        setPopUpState(isOpen:boolean) {
            this.isCreateNewExam = isOpen;
        },
        getLastestExam() {
            return this.exams[this.exams.length - 1];
        },
        getExamById(ExamId: number) {
            return this.exams.find((t) => t.examId === ExamId);
        },
        addQuestion(question: Question) {
            this.ExamQuestions.push(question);
        },
        setQuestions(questions: Question[]) {
            this.ExamQuestions = questions;
        },
        updateExamInfo(exam : Exam) {
            const Exam = this.exams.find((t) => t.examId === exam.examId);
            if (Exam) {
                Exam.title = exam.title;
                Exam.description = exam.description;
                Exam.imageUrl = exam.imageUrl;
                Exam.status = exam.status;
            }
        },
        removeExam ( examId: number) {
            this.exams = this.exams.filter((t) => t.examId !== examId);
        },
        updateListExam(exams: Exam[]) {
            this.exams = exams;
        }
    },
    getters: {
        getExams: (state) => {
            // return list of exams
           return state.exams;
        },
        getExamQuestionsByExamId: (state) =>( ExamId: number) => {
            return state.exams.find((t) => t.examId === ExamId)?.questions || [];
        },
        getExamQuestions: (state) => {
            return state.ExamQuestions;
        },
        getExam: (state) => (id: number) => state.exams.find((t) => t.examId === id),
        getLastestExamId: (state) => {
           if(state.exams.length > 0){
               return state.exams[state.exams.length - 1].examId;
           }
              return null;
        }
    },
        
})
