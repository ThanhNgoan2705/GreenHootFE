<script setup lang="ts">

import {MDBIcon} from "mdb-vue-ui-kit";
import {computed, onMounted, ref, watch, watchEffect} from "vue";

import { useQuestionStore } from "@/states/QuestionStore";
import { Packet, ReqGetNextQuestion } from "@/proto/Proto";
import { WS } from "@/socket/WS";
import { useResultStore } from "@/states/ResultStore";
const gamePin = JSON.parse(sessionStorage.getItem('roomId') as string);
const examSessionId = JSON.parse(sessionStorage.getItem('examSessionId') as string);
const examId = JSON.parse(sessionStorage.getItem('examId') as string);
const countDownQuestionTime = ref<number | null>(null);
const animateTrigger = ref(false);
const answerCardColor = ref([
  {id: '1', bgColor: 'rgb(226,27,60)'},
  {id: '2', bgColor: 'rgb(19,104,206)'},
  {id: '3', bgColor: 'rgb(0,128,0)'},
  {id: '4', bgColor: 'rgb(216, 158, 0)'}
])
const symbolColor = ref({
      0: 'heart',
      1: 'square-full',
      2: 'circle',
      3: 'star'
    }
)
const questionStore = useQuestionStore();
const resultStore = useResultStore();
    // Lấy câu hỏi hiện tại từ store
const questionData = ref(questionStore.question);
    // Sử dụng watchEffect để phản hồi với sự thay đổi của câu hỏi
    watchEffect(() => {
       questionData.value = questionStore.question;
      // Thực hiện các hành động cần thiết với câu hỏi mới
      console.log("Câu hỏi mới: ", questionData);
    });
const requestNextQuestion = () => {
  let requestNextQuestion = ReqGetNextQuestion.create({
    roomId: gamePin,
    examId: examId,
    questionId: questionData.value.questionId,
  });
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqGetNextQuestion', reqGetNextQuestion: requestNextQuestion };
  console.log("sent request next question to server");
  console.log(packet);
  WS.send(packet);
  // countDownQuestionTime.value = questionData.value.time;
  // clearInterval(interval.value);
  // countDown();
}
// const interval = ref(null);
// const countDown = () => {
//   clearInterval(interval.value);
//   interval.value = setInterval(() => {
//     if (countDownQuestionTime.value > 0) {
//       countDownQuestionTime.value -=  1;
//       animateTrigger.value = !animateTrigger.value;
//     }else{
//       clearInterval(interval.value);
//       requestNextQuestion();
//     }
//   }, 1000);
// }
// onMounted(() => {
//   countDown();
// })
// watch(countDownQuestionTime, () => {
//   animateTrigger.value = true;
//   setTimeout(() => {
//     animateTrigger.value = false;
//   }, 500); // Reset the trigger halfway through the countdown interval
// });
// const totalQuestion = ref(questionStore.totalQuestion);
// watchEffect(() => {
//   totalQuestion.value = questionStore.totalQuestion;
//   console.log("Tổng số câu hỏi: ", totalQuestion);
// }
// );

// watch(() => resultStore.isEndExam, (newVal) => {
//   if (newVal) {
//     clearInterval(interval.value);
//   }
// });




</script>

<template>
  <div class="container-fluid waiting-wrapper">
    <div class="header w-full h-[3.5rem]">
      <div class="header-content inline-flex p-1">
        <div class="header-center absolute top-0 right-0 p-2">
          <div class="header-qs-type ">
           <button class=" skip-btn" @click="requestNextQuestion">
             Next 
            </button>
          </div>
        </div>

      </div>
    </div>
    <main class="main-content m-0 w-full max-h-[calc(100vh-6.5rem)]">
      <div class="content w-full h-full">
        <div class="player-showing w-full h-full mx-2">
          <div class="question-show flex w-full h-1/2">
            <div class="question-time-limit w-1/6 my-auto">
              <span 
              :class="{'animate-countdown': animateTrigger}"
              class="text-4xl font-bold m-auto text-black">{{ countDownQuestionTime }}</span>
            </div>
            <div class="question-content flex w-1/2 m-auto">
              <div class="question-text ">
                <span class="text-2xl font-bold m-auto ">{{ questionData.questionText }}</span>
              </div>
              <div class="question-image  items-center w-3/4 h-[calc(100%-4rem)]">
                <img src="/src/public-page/image/trump.jpg" alt="question" class="max-w-full max-h-full m-auto"/>
              </div>
            </div>
          </div>
          <div class="answer-show flex flex-wrap w-full h-1/2 mt-[5rem]">
            <button v-for="(choice,index) in questionData.choices"
                    :key="index"
                    class="answer-option w-[48%] h-[4rem] p-2 mx-1 text-start "
                    :style="{backgroundColor: answerCardColor[index].bgColor}">
              <MDBIcon :icon="symbolColor[index as keyof typeof symbolColor]" size="lg" class="text-white mx-2"/>
              <span class="text-2xl font-bold text-white">{{ choice.choiceText }}</span>
            </button>
          </div>
        </div>
        <div class="action-bar max-w-[100wh]  h-[3rem] bg-blue-900 flex justify-between p-1 absolute bottom-[2px] ">
          <div class="action-bar-left flex justify-center items-center w-[4rem] ">
            <span class="qs-index-total text-white text-lg font-bold">{{questionData.questionIndex }}</span>
          </div>
          <div class="action-bar-center flex justify-center items-center text-center w-1/2">
           <span class="text-white text-lg font-bold">Greenhoot.it Game Pin: <b>{{gamePin}}</b> </span>
          </div>
          <div class="action-bar-right flex justify-end items-end w-[5rem] ">
            <button class="my-auto "><MDBIcon icon="volume-down" size="lg" class="text-white"/></button>
            <button class="my-auto mx-3"><MDBIcon icon="cog" size="lg" class="text-white"/></button>
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
  @apply w-full h-full m-0 p-0  flex flex-col bg-[url('/src/public-page/image/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto;
}
.skip-btn{
  @apply w-[4.5rem] h-[2.5rem] rounded bg-blue-100 text-center text-black font-bold shadow-xl ;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset; ;
}

.question-time-limit, .question-player-submit {
  @apply w-[5rem] h-[5rem] flex justify-center items-center text-white text-2xl font-bold bg-gray-400 rounded-full;
}

.question-player-submit {
  @apply w-[3rem] h-[3rem] text-lg font-bold;
}

.question-content {
  @apply h-[15rem] flex flex-col items-center rounded-xl;
}
.question-text {
  @apply flex content-center items-center w-full h-[4rem] bg-blue-50 text-center mb-2;
}
.answer-show {
  @apply items-center;
}

.answer-option {
  @apply shadow-xl transition duration-150 ease-in-out transform hover:scale-y-110 ;
}
.action-bar{
  @apply w-full h-[3rem] flex bg-gray-400;
}
.animate-countdown {
  animation: scaleUp 0.5s ease forwards;
}

@keyframes scaleUp {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>