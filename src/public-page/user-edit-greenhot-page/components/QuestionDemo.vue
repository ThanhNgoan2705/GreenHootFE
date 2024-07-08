<script setup lang="ts">

import { MDBIcon } from "mdb-vue-ui-kit";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { PropType } from 'vue';
import { useQuestionStore } from "@/states/QuestionStore";
import { CreateQuestionRequest, DeleteQuestionRequest, Exam, GetQuestionRequest, Packet } from "@/proto/Proto";
import { WS } from "@/socket/WS";
import { useExamStore } from "@/states/ExamStore";

const questionStore = useQuestionStore();
const questionList = ref(questionStore.getQuestions);
const isUpdateQuestion = ref(questionStore.isUpdateQuestion);
const isNewQuestion = ref(questionStore.isNewQuestion);
const props = defineProps({
  exam: {
    type: Object as PropType<Exam>,
    required: true
  }
});
if (props.exam) {
  questionList.value = props.exam.questions;
  console.log("questionList", questionList);
}
let questionListUpdate = questionList.value;


const userId = JSON.parse(sessionStorage.getItem('auth-user') || '{}').userId;

const selectedQuestionId = computed(() => questionStore.getSelectedQuestion);

const questionIndex = computed(() => questionStore.getQuestionSelected.questionIndex);

const selectQuestionDemo = (questionId: number, index: number) => {
  let getQuestionRequest = GetQuestionRequest.create();
  getQuestionRequest.questionId = questionId;
  let packet = Packet.create();
  packet.data = { oneofKind: 'getQuestionRequest', getQuestionRequest: getQuestionRequest };
  WS.send(packet);
}


const deleteQuestion = () => {
  let deleteQuestionRequest = DeleteQuestionRequest.create();
  if(selectedQuestionId.value?.questionId){
    deleteQuestionRequest.questionId = selectedQuestionId.value.questionId;
  }
  
  sessionStorage.setItem('questionId', JSON.stringify(selectedQuestionId.value?.questionId));
  deleteQuestionRequest.userId = parseInt(userId);
  let packet = Packet.create();
  packet.data = { oneofKind: 'deleteQuestionRequest', deleteQuestionRequest: deleteQuestionRequest };
  console.log(packet);
  console.log("deleteQuestionRequest", deleteQuestionRequest);
  WS.send(packet);
}
const handleAddQuestion = (event: Event) => {
  let addQuestionRequest = CreateQuestionRequest.create();
  addQuestionRequest.examId = examId.value;
  let packet = Packet.create();
  packet.data = { oneofKind: "createQuestionRequest", createQuestionRequest: addQuestionRequest };
  console.log("Packet", packet);
  WS.send(packet);
};

// // Sử dụng watchEffect để phản hồi với sự thay đổi của câu hỏi
// watchEffect(async () => {
//   questionList.value = questionStore.questions;
//   isUpdateQuestion.value = questionStore.isUpdateQuestion;
//   isNewQuestion.value = questionStore.isNewQuestion;
//   await nextTick();
//   // Thực hiện các hành động cần thiết với câu hỏi mới
//   console.log("Câu hỏi mới: ", questionList);
// });
// questionListUpdate = questionList.value;



const isMobile = ref(window.innerWidth <= 920);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 920;
}
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
})
const examStore = useExamStore();
const examId = computed(() => examStore.examId);


</script>
<template>
  <div v-for="question in questionListUpdate" :key="question.questionId"
    class="question-demo bg-white border border-gray-300 rounded-md shadow-sm mb-2 cursor-pointer"
    @click="selectQuestionDemo(question.questionId, question.questionIndex)"
    :class="{ 'active-background': question.questionIndex == questionIndex }">
    <div v-if="!isMobile" class="sidebar-block" aria-label="question block">
      <div class="qs-demo-title">
        <div class="qs-number  text-sm fw-normal text-gray-500 w-1.5 text-right ms-4">{{ question.questionIndex }}</div>
        <div class="qs text-sm text-center ms-3">Quiz</div>
      </div>
      <div class="qs-content">
        <div class="sidebar-block-gh justify-center " tabindex="0" role="button" aria-describedby="hidden-text"
          draggable="false">
          <div class="sidebar-block-content">
            <div class="style-qs-demo">
              <div class="qs-title  text-center font-medium mt-2">
                <span>
                  <span v-if="question.questionText" class="text-sm ">
                    {{ question.questionText.length == 0 ? question.questionText.substring(0, 10) : "question" }}
                  </span>
                </span>
              </div>
              <div class=" my-auto mx-0 flex justify-center relative ">
                <div
                  class="qs-countdown block absolute top-1/2 left-0 w-6 h-6 border border-black rounded-full  text-center -translate-y-1/2  ">
                  20
                </div>
                <div class=" flex content-center items-center overflow-hidden ">
                  <div
                    class="img-center flex w-8 h-6 justify-center items-center relative overflow-hidden border-2 border-dashed border-gray-400 text-gray-400">
                    <div class="icon-image flex z-50">
                      <MDBIcon v-if="!question.imageUrl" icon="image" size="lg" />
                      <img v-else :src="question.imageUrl" alt="image" class="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="answer-selector">
                <div class="answer-option  " />
                <div class="answer-option  " />
                <div class="answer-option  " />
                <div class="answer-option " />
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-block-action visible flex flex-col justify-end self-end pe-0.5 ms-2">
          <span>
            <span>
              <button aria-label="duplicate" tabindex="0"
                class=" p-0 border-0 w-auto bg-none rounded-sm cursor-pointer mt-2">
                <span class="icon-dupli">
                  <MDBIcon icon="clone" size="sm" />
                </span>
              </button>
            </span>
            <span>
              <button aria-label="delete" tabindex="0" @click="deleteQuestion"
                class=" p-0 border-0 w-auto bg-none rounded-sm cursor-pointe mt-3 mb-1">
                <span class="icon-delete inline-block ">
                  <MDBIcon icon="trash-alt" size="sm" />
                </span>
              </button>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div v-else class="sidebar-block flex flex-row" aria-label="question block">
      <div class="qs-demo-title">
        <div class="qs-number  text-sm fw-normal text-gray-500 w-1.5 text-right ms-4">{{ question.questionId }}</div>
      </div>
      <div class="qs-content">
        <div class="sidebar-block-gh " tabindex="0" role="button" aria-describedby="hidden-text" draggable="false">
          <div class="sidebar-block-content">
            <div class="style-qs-demo">
              <div class="qs-title  text-center font-medium mt-2">
                <span>
                  <span class="text-sm ">{{ question.questionText ? question.questionText : 'Question' }}</span>
                </span>
              </div>
              <div class=" my-auto mx-0 flex justify-center relative ">
                <div
                  class="qs-countdown block absolute top-1/2 left-0 w-6 h-6 border border-black rounded-full  text-center -translate-y-1/2  ">
                  {{ question.time ? question.time : 20 }}
                </div>
                <div class=" flex content-center items-center overflow-hidden ">
                  <div
                    class="img-center flex w-8 h-6 justify-center items-center relative overflow-hidden border-2 border-dashed border-gray-400 text-gray-400">
                    <div class="icon-image flex z-50">
                      <MDBIcon v-if="!question.imageUrl" icon="image" size="lg" />
                      <img v-else :src="question.imageUrl" alt="image" class="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="dialog-delete-wrap">
    <div class="dialog-confirm-delete ">
      <div class="dialog-contain">
        <div class="dialog-title">
          <h1 class="text-lg font-bold text-gray-900">Delete question</h1>
        </div>
        <div class="dialog-content">
          <p class=" delete-log-text text-sm text-gray-500">Are you sure you want to delete this question?</p>
          <p class=" delete-log-title hidden text-sm text-gray-500">Can't delete the only question in your
            GreenHoot </p>
        </div>
        <div class="dialog-action">
          <button class="btn-cancel">Cancel</button>
          <button class="btn-del">Delete</button>
          <button class="btn-ok hidden">Ok</button>
        </div>
      </div>
    </div>
  </div>
  <div class="side-bar-action ">
    <div class=" flex flex-col bg-white w-full justify-center items-center mt-2">
      <span>
        <button class="add-btn start-button" @click="handleAddQuestion">
          Add question
        </button>
      </span>

    </div>
  </div>
</template>

<style >
.question-demo {
  @apply w-full outline-0 opacity-[1]
}

.active-background {
  @apply border-blue-400
}

.sidebar-block {
  height: 100%;
  background-color: rgb(234, 244, 252);
  user-select: none;
  padding: 12px 16px 12px 0;
  display: block;
}

.sidebar-block-content {
  height: 93px;
  width: calc(100% - 26px);
  background-color: rgb(255, 255, 255);
  border-radius: 0.25rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1 0 auto;
  box-shadow: transparent 0px 0px 0px 3px;
  max-width: calc(100% - 26px);
  margin-left: 0px;
}

.style-qs-demo {
  @apply flex flex-col justify-center h-full w-full max-w-full flex-1 px-[0.5rem] py-[0.25rem] text-gray-400
}

.qs-demo-title {
  display: flex;
  flex: 0 1 auto;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.qs-content {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex: 1 1 0;
  height: calc(100% - 3rem);
}

.answer-selector {
  @apply flex flex-wrap mt-[3px]
}

.answer-option {
  @apply relative w-[calc(50%-0.125rem)] h-[7px] mb-[3px] border-[1px] border-solid border-gray-400 rounded-[0.125rem]
}



.qs-content {
  height: calc(100% - 2rem);
}

.sidebar-block-gh {
  height: 93px;
  width: calc(100% - 1.5rem);
  background-color: rgb(255, 255, 255);
  border-radius: 0.25rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1 0 auto;
  box-shadow: transparent 0 0 0 3px;
  max-width: calc(100% - 26px);
  margin-left: 0;
}

.qs-content .sidebar-block-gh {
  outline: 0;
  box-shadow: rgb(19, 104, 206) 0 0 0 3px;
  border-radius: 0.25rem;
}

.answer-option {
  width: calc(50% - 0.125rem);
  height: 7px;
}

@media screen and (max-width: 920px) {

  .question-demo {
    @apply w-[113px]
  }

  .qs-content {
    @apply w-full
  }

  .sidebar-block {
    display: flex;
    padding: 8px 16px 8px 8px;
  }

  .sidebar-block-gh {
    height: 100%;
    width: 78px;
    box-shadow: transparent 0px 0px 0px 1.5px;
    max-width: 100%;
  }

}
</style>