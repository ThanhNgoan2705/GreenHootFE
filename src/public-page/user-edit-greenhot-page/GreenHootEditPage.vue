<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import TheHeaderEdit from "@/public-page/user-edit-greenhot-page/components/TheHeaderEdit.vue";
import QuestionDemo from "@/public-page/user-edit-greenhot-page/components/QuestionDemo.vue";
import PopUpEditTest from "./components/PopUpEditTest.vue";
import {useQuestionStore} from "@/states/QuestionStore";
import QuestionContent from "@/public-page/user-edit-greenhot-page/components/QuestionContent.vue";
import { useExamStore } from "@/states/ExamStore";
import { Question } from "@/proto/Proto";
// responsive for mobile
// Responsive check
const isMobile = ref(window.innerWidth <= 767);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 767;
};

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Exam store
const examStore = useExamStore();
const exam = computed(() => examStore.exam);  
watch(() => exam,  (newVal) => {
  nextTick(() => {
    console.log("exam.value: ", exam.value);
  });
}, { deep: true });


const questionStore = useQuestionStore();
let questionDataSelect = ref(questionStore.getQuestionSelected);

watchEffect(async () => {
  questionDataSelect.value = questionStore.getQuestionSelected;
  console.log(questionDataSelect.value);
  await nextTick();
});


const selectQuestionDemo = (question:Question) => {
  questionStore.selectQuestion
};



</script>
<template>
 <PopUpEditTest :exam="exam" />
  <div class="container-wrap">
    <div class="creator-container">
      <TheHeaderEdit :exam="exam" />
      <div class="creator-sidebar box-border ">
        <div class="side-bar-content ">
          <QuestionDemo :exam="exam" :selectQuestion="selectQuestionDemo"  />
        </div>
      </div>
      <main class="main-content-wrapp">
        <QuestionContent :selectQuestion="questionDataSelect" />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.container-wrap {
  @apply w-full overflow-hidden h-full flex flex-col
}

.creator-container {
  @apply w-full overflow-hidden h-full flex flex-col
}

.creator-sidebar {
  @apply fixed left-0 z-[101] overflow-hidden flex flex-col bg-white w-[12rem] h-full shadow-md p-0 bottom-0
}

.question-demo.active-demo .sidebar-block {
  @apply bg-blue-300
}

.add-answer-btn {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded border border-blue-500 hover:bg-white hover:text-black hover:border-transparent transition ease-in-out delay-150 duration-300
}

@keyframes ZwfxJ {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-cls {
  @apply bg-white text-black font-bold py-2 px-4 rounded border border-black hover:bg-black hover:text-white hover:border-transparent transition ease-in-out delay-150 duration-300
}

.side-bar-content {
  @apply block relative z-[4] max-h-full h-auto w-full overflow-y-auto mt-[3.5rem] mx-0 mb-0 ;
}

.side-bar-action {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  min-width: 100%;
  padding: 0 1.5rem;
}

.main-content-wrapp {
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
}

.content-background {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: url("src/public-page/image/bg.jpg") center center/cover no-repeat;
  flex: 1 1 calc(100% - 2 * clamp(16px, 2vmin, 48px));
  padding: 32px clamp(16px, 2vmin, 48px) 48px;
  max-height: calc(100% - 2 * clamp(16px, 2vmin, 48px));
  margin-left: 12rem;
}

.input-container {
  height: 100%;
  padding: clamp(0.5rem, 1.2vmin, 1rem) 2rem;
  min-height: calc(clamp(0.5rem, 3.2vmin, 3rem) * 1);
  max-height: calc(clamp(0.5rem, 3.2vmin, 3rem) * 4 + clamp(0.5rem, 1.2vmin, 1rem) * 2);
}

#guild-content:focus {
  @apply outline-none border-none text-xl text-black caret-black
}

.btn-border {
  border: 1px solid transparent;
  line-height: 1.875rem;
}

.btn-style:last-of-type {
  margin-left: 1.375rem;
  border-color: rgb(115, 115, 115);
}

.btn-style {
  @apply leading-7 m-0 border-0 cursor-pointer inline-block align-bottom bg-white text-black rounded-lg text-sm font-bold text-center decoration-0 min-w-10 min-h-10 h-10 pt-0 px-6 pb-1 relative
}

.dup-btn {
  @apply border-2 border-gray-500
}


.settings-side {
  display: flex;
  flex-direction: column;
  flex: 0 0 18rem;
  width: 18rem;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) -2px 0px 4px 0px;
  background-color: rgb(255, 255, 255);
  margin-right: 0rem;
}

@media (prefers-reduced-motion: no-preference) {
  .settings-side {
    transition: margin 0.6s ease-in-out 0s, transform 0.1s ease-in-out 0s;
    transform: rotateY(0deg);
  }
}

.setting-side-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(100% - 2rem);
  width: 100%;
  height: calc(100% - 2rem);
  position: relative;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  max-height: 100%;
  overflow: hidden auto;
}

.box-content {
  @apply items-center bg-white border-gray-500 rounded-lg border-solid border-[1px] cursor-pointer flex flex-wrap justify-between min-h-[2.5rem] relative transition-all duration-100  box-border outline-0
}

.option-setting, .time-setting, .point-setting, .answer-setting {
  @apply flex justify-center items-center w-full h-12 bg-white border-b border-gray-200
}

.dropdown {
  position: relative;
}

.dropdown-selected {
  border: 1px solid #ccc;
  cursor: pointer;
}

.dropdown-options {
  @apply absolute top-full left-0 z-10 bg-white border border-gray-200 rounded-md shadow-md w-full max-h-[200px] overflow-y-auto
}

.dropdown-option {
  cursor: pointer;
}

.dropdown-option:hover {
  background-color: #eee;
}

.list-qs-type {
  @apply absolute top-1/4 right-0  z-10 bg-white border border-gray-200 rounded-md shadow-md w-[18rem] max-h-full flex flex-wrap
}

.option-setting-title {
  @apply w-full text-sm font-bold text-black bg-gray-200 border-2 border-gray-200 text-center cursor-pointer
}

.dialog-delete-wrap {
  @apply hidden block fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto text-center bg-gray-900 bg-opacity-70 cursor-pointer;
  z-index: 110;
}

.dialog-confirm-delete {
  @apply inline-block text-start top-0 cursor-default outline-0 align-middle
}

.dialog-contain {
  @apply max-w-[95vw] max-h-[95vh] w-[29.5rem]  h-auto border-[5px] border-gray-200 mx-auto relative flex flex-col bg-white overflow-x-hidden overflow-y-auto
}

@media (max-width: 500px) {
  .button-container {
    @apply flex flex-wrap justify-center content-center m-auto;
  }
  .option-template, .option-blank {
    height: 232px;
    width: 300px;
    border-radius: 0.5rem;
    background-color: rgb(255, 255, 255);
    margin: 5px auto;
    cursor: pointer;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  }
  .button-template {
    @apply p-10;

  }

}

@media screen and (max-width: 920px) {

  .creator-sidebar {
    bottom: 0;
    width: 100%;
    height: 4.5rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px -2px 4px 0px;
    flex-direction: row;
  }
  .side-bar-content {
    @apply flex h-full m-0
  }
  .side-bar-action {
    @apply min-w-0 p-0  flex-row
  }
  .content-background {
    padding: 32px 16px 16px;
    flex: 1 1 calc(100% - 2 * clamp(16px, 2vmin, 48px));
    margin: 0px;
  }
}

@media (min-width: 600px) {
  .popup-content {
    max-width: 95vw;
    max-height: 95vh;
    width: 58.5rem;
    height: 29.5rem;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 600px) {

  @media (min-width: 600px) {
    .popup-content {
      animation: 0.2s ease 0s 1 normal forwards running ZwfxJ;
    }
  }
}
</style>