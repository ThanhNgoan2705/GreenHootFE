import AbsHandler from "@/handler/AbsHandler";
import type { PacketWrapper } from "@/proto/Proto";
import router from "@/router";
import { showSuccessAlert, showSuccessAlertWithReLoad, showToastTopRight, showWarningAlert } from "@/service/Alert";
import { useExamStore } from "@/states/ExamStore";
import { useQuestionStore } from "@/states/QuestionStore";
export class ExamHandler extends AbsHandler {

    constructor() {
        super();
    }

    onMessageHandle(packets: PacketWrapper) {
        let respone = 0;
        const examStore = useExamStore();
        const questionStore = useQuestionStore();
        for (const packet of packets.packet) {
            // console.log("ExamHandler.onMessageHandler:::packet", packet);
            if (packet.data.oneofKind === "createExamResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResGetExam");
                    const resGetExam = packet.data.createExamResponse;
                    respone = resGetExam.examId;
                    console.log(resGetExam.examId);
                    console.log(resGetExam.success);
                    console.log(resGetExam.message);
                    const firstQuestionId = resGetExam.firstQuestionId;
                    console.log(firstQuestionId);
                    if (firstQuestionId) {
                        console.log("co firstQuestionId")
                        questionStore.addFirstQuestion(firstQuestionId, respone);
                        questionStore.setSelectQuestion(firstQuestionId, 1);
                        const questions = questionStore.getQuestions;
                        console.log(questions);
                        examStore.setQuestions(questions);
                        
                    }
                    if (resGetExam.success) {
                        examStore.setPopUpState(false);
                        examStore.setExamId(respone);
                        
                        showSuccessAlert("Create Exam Success");

                    } else {
                        showWarningAlert("Create Exam Fail");
                    }
                
            }
            if (packet.data.oneofKind === "updateExamResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResUpdateExam");
                    const resUpdateExam = packet.data.updateExamResponse;
                    if (resUpdateExam.success) {
                        examStore.setPopUpState(false);
                        showSuccessAlert("Update Exam Success");
                    } else {
                        showWarningAlert("Update Exam Fail");
                    }
            }
            if (packet.data.oneofKind === "getAllExamResponse") {
          
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResgetAllExam");
                    let resGetAllExam = packet.data.getAllExamResponse;
                    console.log(resGetAllExam.exam);
                    const listExam = resGetAllExam.exam;
                    const listExamCurrent = examStore.getExams;
                    for (const exam of listExam) {
                        if (listExamCurrent.findIndex((item) => item.examId === exam.examId) === -1 && exam.status!==-1) {
                            listExamCurrent.push(exam);
                        }else{
                            listExamCurrent.splice(listExamCurrent.findIndex((item) => item.examId === exam.examId), 1, exam);
                        }
                    }
            }

            if (packet.data.oneofKind === "deleteExamResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResDeleteExam");
                    const resDeleteExam = packet.data.deleteExamResponse;
                    console.log(resDeleteExam.success);
                    const examId = sessionStorage.getItem("examId") as string | '';
                    if (resDeleteExam.success) {
                        if (examId !== null) {
                            examStore.removeExam(parseInt(examId));
                            // examStore.updateListExam(examStore.getExams);
                            console.log(examStore.getExams);
                        }
                        showSuccessAlert("Delete Exam Success");
                    } else {
                        showWarningAlert("Delete Exam Fail");
                    }
            }
            if (packet.data.oneofKind === "getExamResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResGetExam");
                    const resGetExam = packet.data.getExamResponse;
                    console.log(resGetExam.exam);
                    const exam = resGetExam.exam;
                    if (exam !== null && exam !== undefined) {
                        examStore.setExam(exam);
                        sessionStorage.setItem("exam", JSON.stringify(exam));
                        router.push({name:'userEdit'});
                    }
            }
            if (packet.data.oneofKind === "createQuestionResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResCreateQuestion");
                    const resCreateQuestion = packet.data.createQuestionResponse;
                    console.log(resCreateQuestion.questionId);
                    respone = resCreateQuestion.questionId;
                    const examId = sessionStorage.getItem("examId")as string | '';
                    if (examId !== null && resCreateQuestion.success) {
                        questionStore.questionIndex++;
                        questionStore.selectedQuestionId = respone;
                        questionStore.addNewQuestion(respone, parseInt(examId));
                        questionStore.isNewQuestion = true;
                        showSuccessAlert("Create Question Success");
                    }

                     else {
                        showWarningAlert("Create Question Fail");
                    }
            }
            if (packet.data.oneofKind === "getQuestionResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResGetQuestion");
                    const resGetQuestion = packet.data.getQuestionResponse;
                    console.log(resGetQuestion.question);
                    const question = resGetQuestion.question;
                    if (question !== null && question !== undefined) {
                        questionStore.setQuestion(question);
                        sessionStorage.setItem("question", JSON.stringify(question));
                        router.push({name:'userEdit'});
                    }
            }
            if (packet.data.oneofKind === "updateQuestionResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResUpdateQuestion");
                    const resUpdateQuestion = packet.data.updateQuestionResponse;
                    console.log(resUpdateQuestion.success);
                    console.log(resUpdateQuestion.message);
                    const question = JSON.parse(sessionStorage.getItem("question") || "{}");
                    console.table(question);
                    if (resUpdateQuestion.success) {
                        questionStore.updateQuestion(question);
                        questionStore.setUpdateQuestionList(question);
                        showToastTopRight("Update Question Success");
                    } else {
                        showWarningAlert("Update Question Fail");
                    }
            }
            if (packet.data.oneofKind === "deleteQuestionResponse") {
                    console.log("da vao duoc ExamHandler.onMessageHandler:::ResDeleteQuestion");
                    const resDeleteQuestion = packet.data.deleteQuestionResponse;
                    console.log(resDeleteQuestion.success);
                    const question = sessionStorage.getItem("question") || "{}";
                    const questionId = JSON.parse(question).questionId;
                    const questionIndex = JSON.parse(question).questionIndex;
                    if (questionId !== null){
                        if (resDeleteQuestion.success) {
                            questionStore.deleteQuestion(parseInt(questionId));
                            questionStore.updateQuestion(questionIndex);
                            showSuccessAlert("Delete Question Success");
                        } else {
                            showWarningAlert("Delete Question Fail");
                        }
                    }
                    
            }
        }

    }

    onError() {
        //to do
    }

    onClosed() {
        //to do
    }
}