<script setup lang="ts">
import MultipleChoiceIcon from "@/public-page/user-create-greenhot-page/components/icon/MultipleChoiceIcon.vue";
import {MDBIcon} from "mdb-vue-ui-kit";
import {ref} from "vue";
import {defineStore} from "pinia";

const question = ref(2);
const timeLimit = ref(20);
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
        <div class="header-qs-index justify-center bg-blue-300  ">
          <span class="m-auto">{{ question }}</span>
        </div>
        <div class="header-center absolute top-0 left-1/2 p-2">
          <div class="header-qs-type flex w-[4.5rem] h-[2rem] rounded-2xl bg-blue-200">
            <span class="items-center"><MultipleChoiceIcon class=" mx-1.5 my-1 w-[80%] h-[80%]"/></span>
            <span class="m-auto text-sm font-bold me-2"> Quiz</span>
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
              <div class="question-text w-3/4 h-[2rem] bg-blue-50 text-center">
                <span class="text-2xl font-bold ">What is the capital of Vietnam?</span>
              </div>
              <div class="question-image  items-center w-3/4 h-[calc(100%-3rem)]">
                <img src="/src/public-page/image/trump.jpg" alt="question" class="max-w-full max-h-full m-auto"/>
              </div>
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
        <div class="player-name max-w-[100wh] h-[3rem] bg-gray-400 flex justify-between p-1 ">
          <span class="text-2xl font-bold text-black">Player Name</span>
          <div class="player-score w-[5rem] h-full rounded bg-gray-300 me-5 p-2 text-center mx-0">
            <span class="text-2xl font-bold text-black"> 0</span>
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

.header-qs-index {
  @apply w-[2.5rem] h-[2.5rem] flex text-black text-center text-lg rounded-full border border-white ;
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

.answer-show {
  @apply items-center;
}

.answer-option {
  @apply shadow-xl transition duration-150 ease-in-out transform hover:scale-y-110 ;
}
</style>