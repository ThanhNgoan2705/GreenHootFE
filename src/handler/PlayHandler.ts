import AbsHandler from "./AbsHandler";
import type { PacketWrapper } from "@/proto/Proto";
import router from "@/router";
import { showInfoAlert, showSuccessAlert, showToastTopRight, showWarningAlert } from "@/service/Alert";
import { useQuestionStore } from "@/states/QuestionStore";
import { useResultStore } from "@/states/ResultStore";
import { useRoomStore } from "@/states/RoomStore";

export class PlayHandler extends AbsHandler {
    constructor() {
        super();
    }

    onMessageHandle(packets: PacketWrapper) {
        const questionStore = useQuestionStore();
        const resultStore = useResultStore();
        const roomStore = useRoomStore();
        for (let packet of packets.packet) {
            console.log(packet.data.oneofKind);
            if (packet.data.oneofKind === "resStartExam") {
                    console.log("da vao duoc PlayHandler.onMessageHandler:::ResStartExam");
                    let resStartExam = packet.data.resStartExam;
                    const question = resStartExam.question;
                    sessionStorage.setItem('examSessionId', JSON.stringify(resStartExam.examSessionId));
                    if (question) {
                    questionStore.setQuestion(question);
                    console.log(question);
                    const isHost = sessionStorage.getItem('isHost');
                    sessionStorage.removeItem('player-answer');
                    console.log(isHost);
                    if (isHost === 'true') {
                        router.push({name: 'hostPlay'});
                    }else {
                        router.push({name: 'userPlay'});
                    }
                }
            }
            if (packet.data.oneofKind === "resEndExam") {
                console.log("da vao duoc PlayHandler.onMessageHandler:::ResEndExam");
                let resEndExam = packet.data.resEndExam;
                const roomScore = resEndExam.resRoomScore;
                if (roomScore) {
                    console.log(roomScore);
                    resultStore.setRoomScore(roomScore);
                    resultStore.setUserScores(roomScore.userScores);
                    console.log(roomScore+" day la roomScore");
                    console.log(roomScore.userScores+" day la userScores");
                    router.push({name: 'resultExam'});
                    resultStore.setIsEndExam(true);
                    showInfoAlert("End exam");
                }
            }
            if (packet.data.oneofKind === "resGetNextQuestion") {
                console.log("da vao duoc PlayHandler.onMessageHandler:::ResGetNextQuestion");
                
                let resNextQuestion = packet.data.resGetNextQuestion;
                const question = resNextQuestion.question
                console.log(question);
                if (question) {
                    questionStore.setQuestion(question);
                    sessionStorage.removeItem('player-answer');
                    questionStore.setTotalQuestion(resNextQuestion.totalQuestion);
                }else {
                    showInfoAlert("End exam");
                }
            }
            if (packet.data.oneofKind === "resCheckQuestionAnswer") {
                console.log("da vao duoc PlayHandler.onMessageHandler:::ResCheckQuestionAnswer");
                
                let resNextQuestion = packet.data.resCheckQuestionAnswer;
                const questionId = resNextQuestion.questionId;
                const status = resNextQuestion.status;
                console.log(questionId);
                console.log(status);
                if (status === 1) {
                   showSuccessAlert("Correct answer");
                }
                else {
                    showWarningAlert("Wrong answer");
                }
            }
            if (packet.data.oneofKind === "roomScore") {
                console.log("da vao duoc PlayHandler.onMessageHandler:::RoomScore");
                const resRoomScore = packet.data.roomScore; 
                const userScores = resRoomScore.userScores;
                resultStore.setUserScores(userScores);
                console.log(userScores);
                for (let i = 0; i < userScores.length; i++) {
                     resultStore.setScoreAfterAnswer(userScores[i].score);
                     console.log("day la roomscore --- ten cua nguoi choi"+userScores[i].userName + " "+userScores[i].score);
                }
                console.log("day la roomscore --- ten cua nguoi choi"+userScores[0].userName + " "+userScores[0].score);
                // resultStore.setUserScores(userScores);
                 
            }
            if (packet.data.oneofKind === "userScore") {
                console.log("da vao duoc PlayHandler.onMessageHandler:::UserScore");
                const userScore = packet.data.userScore;
                console.log(userScore);
                // resultStore.setScoreAfterAnswer(userScore.score);
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