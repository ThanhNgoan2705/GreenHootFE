<script setup lang="ts">
import MultipleChoiceIcon from "@/assets/icon/MultipleChoiceIcon.vue";
import { MDBIcon, MDBListGroup, MDBListGroupItem } from "mdb-vue-ui-kit";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

import { useQuestionStore } from "@/states/QuestionStore";
import { Packet, ReqCheckQuestionAnswer } from "@/proto/Proto";
import { WS } from "@/socket/WS";
import { useResultStore } from "@/states/ResultStore";

const answerCardColor = ref([
  { id: '1', bgColor: 'rgb(226,27,60)' },
  { id: '2', bgColor: 'rgb(19,104,206)' },
  { id: '3', bgColor: 'rgb(0,128,0)' },
  { id: '4', bgColor: 'rgb(216, 158, 0)' }
])
const symbolColor = ref({
  0: 'heart',
  1: 'square-full',
  2: 'circle',
  3: 'star'
}
)

const resultScore = useResultStore();
const resultUserScore = ref(resultScore.score);
const listUserScore = ref(resultScore.userScores);

const questionStore = useQuestionStore();
const questionData = ref(questionStore.question);
    // Sử dụng watchEffect để phản hồi với sự thay đổi của câu hỏi
    watchEffect(() => {
       questionData.value = questionStore.question;
      // Thực hiện các hành động cần thiết với câu hỏi mới
      console.log("Câu hỏi mới: ", questionData);
    });

const userName = sessionStorage.getItem('player-name') as string;
const gamePin = parseInt(sessionStorage.getItem('roomId') as string);
console.log("gamePin: ", gamePin);
const examSessionId = parseInt(sessionStorage.getItem('examSessionId') as string);
console.log("examSessionId: ", examSessionId);
const user = JSON.parse(sessionStorage.getItem('auth-user') as string);
const userId = user?.userId;

console.log("userId: ", userId);

const checkReSendAnswer = () => {
  if (sessionStorage.getItem('player-answer') === "sent answer") {
    return true;
  }
  return false;
}


const sendAnswerRequest = (choiceId: number) => {
  if (checkReSendAnswer()) {
    return;
  }
  let reqCheckQuestionAnswer = ReqCheckQuestionAnswer.create({
    choiceId: choiceId,
    questionId: questionData.value.questionId,
    roomId: gamePin,
    examSessionId: examSessionId,
    userId: userId
  });
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqCheckQuestionAnswer', reqCheckQuestionAnswer: reqCheckQuestionAnswer };
  console.log("sent answer to server");
  console.log(packet);
  WS.send(packet);
  sessionStorage.setItem('player-answer', "sent answer");
}
// Sử dụng watchEffect để phản hồi với sự thay đổi của câu hỏi
watchEffect(() => {
  resultUserScore.value = resultScore.score;
  console.log("Điểm số: ", resultUserScore);
});

const totalQuestion = ref(questionStore.totalQuestion);
watchEffect(() => {
  totalQuestion.value = questionStore.totalQuestion;
  console.log("Tổng số câu hỏi: ", totalQuestion);
}
);
watchEffect(() => {
  listUserScore.value = resultScore.userScores;
  console.log("Danh sách điểm số: ", listUserScore);
}
);
const listTop3 = computed(() => {
  return listUserScore.value.slice(0, 3);
});

const getRankbyPlayerName = (playerName: string) => {
  let rank = 0;
  listUserScore.value.forEach((item, index) => {
    if (item.userName === playerName) {
      rank = index + 1;
    }
  });
  return rank;
}
const getScoreByPlayerName = (playerName: string) => {
  let score = 0;
  listUserScore.value.forEach((item) => {
    if (item.userName === playerName) {
      score = item.score;
    }
  });
  return score;
}
const isLockQuestion = computed(() => {
  return questionStore.isLockQuestion;
});

watch(() => isLockQuestion, (newValue) => {
  console.log("isLockQuestion: ", newValue);
});




</script>

<template>
  <div class="container-fluid waiting-wrapper">
    <div class="header w-full h-[3.5rem]">
      <div class="header-content inline-flex p-1">
        <div class="header-qs-index justify-center bg-blue-300  ">
          <span class="m-auto">{{ questionData.questionIndex }}/{{ totalQuestion }}</span>
        </div>
        <div class="header-center absolute top-0 left-1/2 p-2">
          <div class="header-qs-type flex w-[4.5rem] h-[2rem] rounded-2xl bg-blue-200">
            <span class="items-center">
              <MultipleChoiceIcon class=" mx-1.5 my-1 w-[80%] h-[80%]" />
            </span>
            <span class="m-auto text-sm font-bold me-2"> Quiz</span>
          </div>
        </div>

      </div>
    </div>
    <main class="main-content">
      <div class="content w-full h-full">
        <div class="player-showing w-full  mx-2">
          <div class="question-show flex w-full h-1/2 ">
            <div class="question-time-limit w-1/4 ">
              <span class="text-4xl font-bold m-auto text-black">{{ questionData.time }}</span>
            </div>
            <div class="question-content flex w-1/3 ">
              <div class="question-text w-3/4 h-[2rem] bg-blue-50 text-center">
                <span class="text-2xl font-bold "
                v-if="!isLockQuestion">
        
                {{ questionData.questionText }}</span>
              </div>
              <div class="question-image  items-center w-3/4 h-[calc(100%-3rem)]">
                <img src="/src/public-page/image/trump.jpg" alt="question" class="max-w-full max-h-full m-auto" />
              </div>
            </div>
            <MDBListGroup class="rank-list w-1/4  me-[3rem] ">
              <MDBListGroupItem v-for="(item, index) in listTop3" :key="index"
              class="rounded-3 mb-2 rank-item" color="primary" noBorder spacing>
                <span class="text-lg font-bold text-black">
                  <i class="fas fa-trophy text-yellow-500"></i>
                Top  {{ index + 1 }}
                </span>
                <span class="text-lg font-bold text-black">{{item.userName }}</span>
                <span class="text-lg font-bold text-black">{{item.score }}</span>
              </MDBListGroupItem>
              <MDBListGroupItem 
              class="rounded-3 mb-2 rank-item" color="primary" noBorder spacing>
                <span class="text-lg font-bold text-black">
                  <i class="fas fa-trophy text-yellow-500"></i>
                  Your Rank is {{ getRankbyPlayerName(userName) }}
                </span>
                <span class="text-lg font-bold text-black">{{userName}}</span>
                <span class="text-lg font-bold text-black">{{ getScoreByPlayerName(userName) }}</span>
              </MDBListGroupItem>
            </MDBListGroup>
          </div>
          <div class="answer-show flex flex-wrap w-full h-1/2 mt-[5rem]">
            <button v-for="(choice, index) in questionData.choices" :key="index"
              @click="sendAnswerRequest(choice.choiceId)" class="answer-option w-[48%] h-[4rem] p-2 mx-1 text-start "
              :style="{ backgroundColor: answerCardColor[index].bgColor }">
              <MDBIcon :icon="symbolColor[index as keyof typeof symbolColor]" size="lg" class="text-white mx-2" />
              <span class="text-2xl font-bold text-white"   v-if="!isLockQuestion">{{ choice.choiceText }}</span>
              <!-- <img v-else :src="choice.imageUrl" alt="answer" class="answerImage" /> -->
            </button>
          </div>
        </div>                                    
        <div class="player-name max-w-[100wh] h-[3rem] bg-gray-400 flex justify-between p-1 absolute bottom-[2px] ">
          <span class="text-2xl font-bold text-black">{{ userName }}</span>
          <div class="player-score w-[5rem] h-full rounded bg-gray-300 me-5 p-2 text-center mx-0">
            <span class="text-2xl font-bold text-black"> {{ getScoreByPlayerName(userName) }}</span>
          </div>
        </div>
      </div>
    </main>
    <div class="setting-option">
    </div>
  </div>
</template>

<style scoped>
.waiting-wrapper {
  @apply w-full h-full m-0 p-0 flex flex-col bg-[url('/src/public-page/image/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto;
}
.main-content {
  @apply m-0 w-full max-h-[calc(100vh-6.5rem)];
}

.header-qs-index {
  @apply w-[2.5rem] h-[2.5rem] flex text-black text-center text-lg rounded-full border border-white;
}

.question-time-limit {
  @apply w-[5rem] h-[5rem] flex justify-center items-center text-white text-2xl font-bold bg-gray-400 rounded-full;
}

.question-content {
  @apply h-[15rem] flex flex-col items-center bg-blue-50 rounded-xl;
}

.player-name {
  @apply w-full h-[3rem] flex bg-gray-400;
}
.question-show{
  @apply  mx-2 flex  justify-between items-center rounded-xl shadow-xl; 

}

.answer-show {
  @apply items-center;
}
.answerImage{
  @apply max-w-full max-h-full m-auto;
}

.answer-option {
  @apply shadow-xl transition duration-150 ease-in-out transform hover:scale-y-110;
}

.rank-list {
  @apply   flex flex-col items-center;
}
.rank-item{
  @apply w-full h-[3rem] bg-blue-200 text-black flex justify-between p-1;

}
</style>