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
export const question = defineStore({
    id: "question",
    state:()=>{return{
        questions: [
            {
                id: ""
            }
    }
    }
}