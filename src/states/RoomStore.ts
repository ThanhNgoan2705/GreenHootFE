import type { UserScore } from "@/proto/Proto";
import { defineStore } from "pinia";

export interface Room{
    roomId: number;
    examId: number;
    hostId: number;
    examSessionId: number;
    playerName : Player[];
}

export interface Player{
    playerName: string;
    playerScore: number;
}
export const useRoomStore = defineStore('Room', {
    state: () => ({
        roomId: sessionStorage.getItem("roomId") ? JSON.parse(sessionStorage.getItem("roomId") || "") : 0,
        room: {} as Room,
        players: [] as Player[],
        player: {} as Player,
        examSessionId: 0,
        totalQuestion: 0,
        userScores: [] as UserScore[],
        totalPlayer: 0,
    }),
    actions: {
        setRoomId(roomId: number) {
            this.roomId = roomId;
            sessionStorage.setItem("roomId", JSON.stringify(roomId));
        },
        setRoom(room: Room) {
            this.room = room;
        },
        setPlayer(player: Player) {
            this.player = player;
        },
        addPlayer(playerName: string) {
            const player: Player = {
                playerName: playerName,
                playerScore: 0
            };
            this.players.push(player);
        },
        updatePlayer(player: Player) {
            const playerIndex = this.players.findIndex((t) => t.playerName === player.playerName);
            if (playerIndex !== -1) {
                this.players[playerIndex] = player;
            }
        },
        removePlayer(player: Player) {
            const index = this.players.findIndex((t) => t.playerName === player.playerName);
            if (index !== -1) {
                this.players.splice(index, 1);
            }
            
        },
        clearPlayers() {
            this.players = [];
        },
        setExamSessionId(examSessionId: number) {
            this.examSessionId = examSessionId;
        },
        setTotalQuestion(totalQuestion: number) {
            this.totalQuestion = totalQuestion;
        },
        setUserScores(userScores: UserScore[]) {
            this.userScores = userScores;
        },
        setTotalPlayer(total:number){
            this.totalPlayer = total;
        }
    },
    getters: {
        getRoomId: (state) => {
            return state.roomId;
        },
        getRoom: (state) => {
            return state.room;
        },
        getPlayers: (state) => {
            return state.players;
        },
        getPlayer: (state) => {
            return state.player;
        },
        getNumberPlayer: (state) => {
            return state.players.length;
        },
        getTotalQuestion: (state) => {
            return state.totalQuestion;
        },
        getUserScores: (state) => {
            return state.userScores;
        },
        getTotalPlayer:(state) =>{
            return state.totalPlayer;
        }
    }
});


