<script setup lang="ts">
import {ref} from "vue";

const cardText = ref({
  0: '',
  1: '',
  2: '',
  3: ''
})
</script>

<template>
  <div class="answer-options w-full  h-full mb-[3rem]">
    <div class="answer-text-list w-full h-auto" >
      <div class="correct-answer w-full h-full flex justify-center m-2">
        <div class="w-1/2 h-full" >
          <input v-model="cardText[0]" class="answer-option-text answer-main" placeholder="Type an answer" />
        </div>
      </div>
      <div class="flex content-center w-full h-full justify-center m-2">
        <div class="guild-text bg-blue-900">
          <span class="text-white text-lg">Other accepted answers</span>
        </div>

      </div>
      <div class="other-answers flex flex-row w-full h-full">
        <div class="answer-option-text" v-for="(item, index) in 3 " :key="index" >
          <input v-model="cardText[1]" class="answer-option-text" placeholder="Type an  answer" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.answer-options {
  @apply w-full;
}
.correct-answer{
  @apply w-full;
}

.answer-option-text {
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
}
.guild-text{
  @apply w-1/2 h-full p-1 rounded-md text-center;
}
</style>