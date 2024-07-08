import {RoomScore, UserScore} from "@/proto/Proto";
import {defineStore} from "pinia";


export const useResultStore = defineStore('resultStore', {
    state: () => ({
        score: 0,
        examId: 0,
        questionId: 0,
        playerName: '',
        userScores: [] as UserScore[],
        roomScore: {} as RoomScore,
        isEndExam: false,
    }),
    actions: {
        setScore(score: number) {
            this.score = score;
        },
        setScoreAfterAnswer(scoreResult: number) {
            if (scoreResult) {
                this.score = scoreResult;
            }
        },
        setUserScores(userScores: UserScore[]) {
            this.userScores = userScores;
        },
        setExamId(examId: number) {
            this.examId = examId;
        },
        setQuestionId(questionId: number) {
            this.questionId = questionId;
        },
        setPlayerName(playerName: string) {
            this.playerName = playerName;
        },
        setRoomScore(roomScore: RoomScore) {
            this.roomScore = roomScore;
        },
        setIsEndExam(isEndExam: boolean) {
            this.isEndExam = isEndExam;
        },
    },
    getters: {
        getScore: (state) => state.score,
        getExamId: (state) => state.examId,
        getQuestionId: (state) => state.questionId,
        getPlayerName: (state) => state.playerName,
        getUserScores: (state) => state.userScores,
        getRoomScore: (state) => state.roomScore,
    
    },

});