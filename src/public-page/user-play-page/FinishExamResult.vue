<script setup  lang="ts">

import { Packet, ReqStartExam } from "@/proto/Proto";
import { showToastTopRight } from "@/service/Alert";
import { WS } from "@/socket/WS";
import { useResultStore } from "@/states/ResultStore";
import { ref, watchEffect } from "vue";

const columns = ref([
    { label: 'Player Name', field: 'playerName' },
    { label: 'Score', field: 'score' },
    { label: 'Rank', field: 'rank' }
])

const data = ref([
    { playerName: 'John Doe', score: 100, rank: 1 },
    { playerName: 'Jane Doe', score: 80, rank: 2 },
    { playerName: 'Bob Smith', score: 120, rank: 3 },
    { playerName: 'John Doe', score: 100, rank: 1 },
    { playerName: 'Jane Doe', score: 80, rank: 2 },
    { playerName: 'Bob Smith', score: 120, rank: 3 },
    { playerName: 'John Doe', score: 100, rank: 1 },
    { playerName: 'Jane Doe', score: 80, rank: 2 },
    { playerName: 'Bob Smith', score: 120, rank: 3 },
    //...
])



const resultStore = useResultStore();
const roomId = JSON.parse(sessionStorage.getItem('roomId')as string | '');
const examId = JSON.parse(sessionStorage.getItem('examId')as string | '');
const hostId = JSON.parse(sessionStorage.getItem('auth-user')as string | '').userId;
const resultRoomScore = ref(resultStore.roomScore);
const resultUserScores = ref(resultStore.userScores);

const pinCode = parseInt(roomId);

watchEffect(() => {
    resultRoomScore.value = resultStore.getRoomScore;
    resultUserScores.value = resultStore.getUserScores;

    console.log("Result: ", resultRoomScore.value);
    });
const results = resultRoomScore.value;
const userScores = resultUserScores.value;
const startGameRequest = () => {
  let startGame = ReqStartExam.create();
  startGame.roomId = roomId;
  startGame.examId = examId;
  startGame.hostId = hostId;
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqStartExam', reqStartExam: startGame };
  console.log(packet);
  console.log("sent start game request to server");
  WS.send(packet);
}

const getRankbyPlayerName = (playerName: string) => {
    let rank = 0;
    userScores.forEach((userScore, index) => {
        if (userScore.userName === playerName) {
            rank = index + 1;
        }
    });
    return rank;
}

</script>

<template>
    <div class=" waiting-wrapper">
        <div class="header">
            <div class="header-content">
                <div class="invitation">
                    <div class="join-pin rounded-e-md flex flex-col justify-center items-center">
                        <span class="text-5xl ms-2 font-bold cursor-pointer ">{{ pinCode
                        }}</span>
                    </div>
                    <button class="start-button w-1/5 m-auto" @click="startGameRequest">ReStart Game</button>
                </div>
            </div>
        </div>
        <main class="main-content">
           
            <div class="content">
                <div class="data-table ">
                    <table class="table-score">
                        <thead>
                            <tr>
                                <th v-for="column in columns" :key="column.field">{{ column.label }}</th>
                            </tr>
                        </thead>
                        <tbody class="table-detail">
                            <tr v-for="item in userScores" :key="item.userName">
                                <td>{{ item.userName}}</td>
                                <td>{{ item.score }}</td>
                                <td>{{ getRankbyPlayerName(item.userName) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.waiting-wrapper {
    @apply w-[100vw] h-[100vh] m-0 p-0 flex flex-col bg-[url('/src/public-page/user-play-page/components/image/background.jpg')] bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto;
}

.header {
    @apply flex w-full h-1/6 p-2 justify-center items-center;
}

.invitation {
    @apply flex w-full h-full justify-center items-center border-none relative;
}

.header-content {
    @apply flex w-1/2 h-full justify-between items-center;
}

.join-link,
.join-pin {
    @apply w-1/2 h-full bg-white rounded-md flex justify-center items-center;
}

/* For screens smaller than 600px */
@media (max-width: 600px) {
    .header {
        @apply h-[6rem];
    }
}

/* For screens between 600px and 900px */
@media (min-width: 600px) and (max-width: 900px) {
    .header {
        @apply h-[7rem];
    }
}

/* For screens larger than 900px */
@media (min-width: 900px) {
    .header {
        @apply h-[8rem];
    }
}

.data-table {
    @apply w-2/3 h-full mt-[2rem] my-2 rounded-xl shadow-xl overflow-x-hidden overflow-y-auto
}

.table-score {
    @apply w-full h-full border-collapse table-auto text-center
}

.table-score th {
    @apply bg-blue-200 text-black text-2xl font-bold p-2
}

.table-score td {
    @apply text-white text-2xl font-bold p-2 border-gray-300 mx-2
}

.content {
    @apply w-full h-full flex flex-col items-center justify-center
}

.table-detail {
    @apply w-full h-[6rem] overflow-auto
}

.pagination {
    @apply w-full h-[3rem] flex justify-center items-center mt-[2rem]
}</style>