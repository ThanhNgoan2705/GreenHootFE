<script setup lang="ts">
import MultipleChoiceIcon from "@/public-page/user-create-greenhot-page/components/icon/MultipleChoiceIcon.vue";
import {MDBIcon} from "mdb-vue-ui-kit";
import {ref} from "vue";
import {defineStore} from "pinia";
const gamePin = ref('123456');
const question = ref(2);
const questionTotal = ref(10);
const timeLimit = ref(20);
const playerSubmitNumber = ref(5);
const answers = ref([1, 2, 3, 4]);
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
</script>

<template>
  <div class="container-fluid waiting-wrapper">
    <div class="header w-full h-[3.5rem]">
      <div class="header-content inline-flex p-1">
        <div class="header-center absolute top-0 right-0 p-2">
          <div class="header-qs-type ">
           <button class=" skip-btn">
             Skip
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
              <span class="text-4xl font-bold m-auto text-black">{{ timeLimit }}</span>
            </div>
            <div class="question-content flex w-1/2 m-auto">
              <div class="question-text ">
                <span class="text-2xl font-bold m-auto ">What is the capital of Vietnam?</span>
              </div>
              <div class="question-image  items-center w-3/4 h-[calc(100%-4rem)]">
                <img src="/src/public-page/image/trump.jpg" alt="question" class="max-w-full max-h-full m-auto"/>
              </div>
            </div>
            <div class="player-submit flex flex-col justify-center items-center me-3 ">
              <div class="question-player-submit  ">
                <span class="text-2xl font-bold m-auto text-white">{{ playerSubmitNumber }}</span>
              </div>
              <span class="text-lg font-bold text-white">Answers</span>
            </div>
          </div>
          <div class="answer-show flex flex-wrap w-full h-1/2">
            <button v-for="(answer,index) in answers"
                    :key="index"
                    class="answer-option w-[48%] h-[4rem] p-2 mx-1 text-start "
                    :style="{backgroundColor: answerCardColor[index].bgColor}">
              <MDBIcon :icon="symbolColor[index as keyof typeof symbolColor]" size="lg" class="text-white mx-2"/>
              <span class="text-2xl font-bold text-white">Answer {{ index + 1 }}</span>
            </button>
          </div>
        </div>
        <div class="action-bar max-w-[100wh] h-[3rem] bg-blue-900 flex justify-between p-1 ">
          <div class="action-bar-left flex justify-center items-center w-[4rem] ">
            <span class="qs-index-total text-white text-lg font-bold">{{ question }}/{{ questionTotal }}</span>
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
</style>