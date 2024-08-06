<script setup lang="ts">

import {MDBIcon} from "mdb-vue-ui-kit";
import MultipleAnswerCards from "@/public-page/user-create-greenhot-page/components/MultipleAnswerCards.vue";
import TrueFalseAnswerCards from "@/public-page/user-create-greenhot-page/components/TrueFalseAnswerCards.vue";
import TypeAnswerCards from "@/public-page/user-create-greenhot-page/components/TypeAnswerCards.vue";
import MediaQuestionOption from "@/public-page/user-create-greenhot-page/components/MediaQuestionOption.vue";
import {type DefineComponent, nextTick, onMounted, onUnmounted, ref, watchEffect} from "vue";

import {useQuestionStore} from "@/states/QuestionStore";
import MultipleChoiceIcon from "@/assets/icon/MultipleChoiceIcon.vue";
import TrueFalseIcon from "@/assets/icon/TrueFalseIcon.vue";
import TypeAnswerIcon from "@/assets/icon/TypeAnswerIcon.vue";
import PuzzleIcon from "@/assets/icon/PuzzleIcon.vue";
import QuestionTypeIcon from "@/assets/icon/QuestionTypeIcon.vue";
import AnswerSelectIcon from "@/assets/icon/AnswerSelectIcon.vue";

const isMobile = ref(window.innerWidth <= 767);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 767;
}
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
})
const questionTitle = ref('Question');
const guildText = ref<HTMLElement | null>(null);
const savedText = ref('');
const isEditable = ref(false);
const updateText = () => {
  if (guildText.value) {
    savedText.value = guildText.value.innerText;
  }
}



const qsContent = ref(false);
const openQuestionType = ref(false);
const optionQuestionTypeIcon = ref('MultipleChoiceIcon');
const optionsQuestionType = ref([
  { value: 1, text: 'Multiple choice', icon: 'MultipleChoiceIcon' },
  { value: 2, text: 'True or False', icon: 'TrueFalseIcon' },
  { value: 3, text: 'Type answer', icon: 'TypeAnswerIcon' },
  { value: 4, text: 'Puzzle', icon: 'PuzzleIcon' },
])
type IconComponents = {
  [key: string]: DefineComponent<{}, {}, any>
}
const iconComponents: IconComponents = {
  MultipleChoiceIcon,
  TrueFalseIcon,
  TypeAnswerIcon,
  PuzzleIcon
}

// time setting function
const timeSetting = ref([
  { value: 1, text: '20 seconds', time: 20 },
  { value: 2, text: '30 seconds', time: 30 },
  { value: 3, text: '40 seconds', time: 40 },
  { value: 4, text: '50 seconds', time: 50 },
  { value: 5, text: '1 minute', time: 60 },
  { value: 6, text: '1 minute 30 seconds', time: 90 },
  { value: 7, text: '2 minutes', time: 120 },
  { value: 8, text: '2 minutes 30 seconds', time: 150 },
]);
const selectedTime = ref('');
const openTime = ref(false);
const selectTime = () => {

  openTime.value = false;
}

// point setting function
const selectedPoint = ref('');
const openPoint = ref(false);
const pointSetting = ref([
  { value: 1, text: 'Standard', description: 'Award points based on correct answers', score: 1000 },
  { value: 2, text: 'Double points', description: 'Give twice as many points for correct answers', score: 2000 },
  { value: 3, text: 'No points', description: 'Lower the stakes by not awarding points', score: 0 },
]);
const selectPoint = () => {
  openPoint.value = false;
}

// answer setting function
const openAnswer = ref(false);
const selectedAnswer = ref('');
const answerSetting = ref([
  { value: 1, text: 'Single select', description: 'Allow players to select only one answer' },
  { value: 2, text: 'Multiples', description: 'Allow players to select multiple answers' },
]);
const selectAnswer = () => {
  openAnswer.value = false;
}

// question type setting function
const selectedQuestionType = ref(optionsQuestionType.value[0]);
const openSelectQSType = () => {
  openQuestionType.value = false;
}
const qsImage = ref();

let activeQsDemo = ref(0);

const handleImageUpdate = (newImage: string, questionId: number) => {
  if (questionId === activeQsDemo.value) {
    qsImage.value = newImage;
  }
}

// add animation when click on question title
const makeEditable = () => {
  console.log("click");
  isEditable.value = true;
  if (guildText.value) {
    console.log(guildText.value.textContent);
    guildText.value.contentEditable = "true";
    if (guildText.value.textContent === 'Start entering your question here') {
      guildText.value.textContent = '';
      guildText.value.focus();
       savedText.value = guildText.value.textContent;
    }
    else if (guildText.value.textContent === '') {
      guildText.value.textContent = 'Start entering your question here';
    }

  }

}
const saveText = () => {
  isEditable.value = false;
  qsContent.value = true;
  nextTick(() => {
    const question = document.getElementById('guild-content') as HTMLElement;
    savedText.value = question.innerText;
    questionTitle.value = savedText.value;
    if (question.innerText === '' ) {
      question.innerText = 'Start entering your question here';
      guildText.value.contentEditable = "false";
    }
    else {
      guildText.value.contentEditable = "false";
    }
  });
};
const questionStore = useQuestionStore();
const selectedQuestion = ref(questionStore.selectQuestion);
watchEffect(async () => {
  selectedQuestion.value = questionStore.selectQuestion;
  await nextTick();
  // Thực hiện các hành động cần thiết với câu hỏi mới
  console.log("Câu hỏi mới: ", selectedQuestion.value);
});

const updateQuestionList = ref(questionStore.getUpdateQuestionList);
watchEffect(async () => {
  updateQuestionList.value = questionStore.getUpdateQuestionList;
  await nextTick();
  // Thực hiện các hành động cần thiết với câu hỏi mới
  console.log("List question: ", updateQuestionList.value);
});


</script>

<template>
  <div class="content flex h-full" id="questionContentDisplay" v-if="selectedQuestion" ref="questionContent">
    <div class="content-background ">
      <div class="question-title w-full flex items-center " style="    -webkit-box-align: center;">
        <div class="question-text-field w-full h-auto relative bg-white pb-1 rounded-2xl z-10">
          <div class="input-container  guild-text " @click="makeEditable">
            <p id="guild-content" class="text-center text-black text-lg  mt-2 border-none" ref="guildText"
              @blur="saveText" @input="updateText">
              {{ selectedQuestion.questionText ? selectedQuestion.questionText : 'Start typing your question' }}
            </p>
          </div>
        </div>
      </div>
      <MediaQuestionOption @update:backgroundImage="handleImageUpdate" />
      <div class="flex flex-col w-full items-center">
        <MultipleAnswerCards v-if="selectedQuestionType.text === 'Multiple choice'" :items="selectedQuestion.choices"
          :questionTitle="questionTitle" :questionId="selectedQuestion.questionId"
          :question-index="selectedQuestion.questionIndex"
         
           />
        <TrueFalseAnswerCards v-if="selectedQuestionType.text === 'True or False'"
          :question-index="selectedQuestion.questionIndex"
          :questionId="selectedQuestion.questionId"
          :questionTitle="questionTitle"
          :items="selectedQuestion.choices"
         />
        <TypeAnswerCards v-if="selectedQuestionType.text === 'Type answer'" />
      </div>
    </div>
    <div v-if="!isMobile" class="settings-side ">
      <div class="setting-side-content">
        <div class="list-options-setting  flex flex-col items-center ">
          <div class="option-setting  mt-1 mb-5">
            <label for="questionType" class="w-full text-sm font-bold text-black">
              <span class="text-sm inline-block align-middle w-5 h-5  ">
                <QuestionTypeIcon />
              </span>
              QuestionStore type
              <div id="questionType" class="relative border-box" @click="openQuestionType = !openQuestionType">
                <div class="select-box relative box-border mt-[8px]">
                  <div class="box-content ">
                    <div class="box-content-inner">
                      <div class="box-content-icon">
                        <div class="box-image absolute left-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px]">
                          <component :is="iconComponents[optionQuestionTypeIcon]" class="max-w-full max-h-full" />
                        </div>
                      </div>
                      <div class="box-content-text ms-[2rem] text-lg font-normal leading-3  ">
                        <span class="text-sm text-gray-500">{{ selectedQuestionType.text }}</span>
                      </div>
                    </div>
                    <div class="box-dropdown items-center self-stretch flex shrink-0 box-border">
                      <div class="box-dropdown-icon p-2">
                        <MDBIcon icon="chevron-down" size="lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <hr class="w-full border-black mt-0 mb-4 " />
          <div class="time-setting  mb-5">
            <label for="timeSelection" class=" time-select-title w-full text-sm font-bold text-black ">
              <span class="text-sm inline-block align-middle w-5 h-5">
                <MDBIcon icon="stopwatch" size="lg" />
              </span>
              Time Limit
              <div class="dropdown select-box relative box-border mt-[10px]" @click=" openTime = !openTime">
                <div class="dropdown-selected w-full box-content ">
                  <div
                    class="box-content-inner overflow-hidden text-ellipsis relative flex items-center ms-1 font-normal text-gray-500">
                    {{ selectedTime ? selectedTime : 'Select a time' }}
                  </div>
                  <div class="box-dropdown items-center self-stretch flex shrink-0 box-border">
                    <div class="box-dropdown-icon p-2">
                      <MDBIcon icon="chevron-down" size="lg" />
                    </div>
                  </div>
                </div>
                <div v-if="openTime" class="dropdown-options ">
                  <div v-for="time in timeSetting" :key="time.value" @click="selectTime , selectedTime = time.text"
                    class="dropdown-option p-2">
                    {{ time.text }}
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div class="point-setting mb-6">
            <label for="pointSelection" class=" point-select-title w-full text-sm font-bold text-black ">
              <span class="text-sm inline-block align-middle w-5 h-5">
                <MDBIcon icon="award" size="lg" />
              </span>
              Points
              <div class="dropdown select-box relative box-border mt-[10px]" @click="openPoint = !openPoint">
                <div class="dropdown-selected w-full box-content ">
                  <div
                    class="box-content-inner overflow-hidden text-ellipsis relative flex items-center ms-1 font-normal text-gray-500">
                    {{ selectedPoint ? selectedPoint : 'Select a point' }}
                  </div>
                  <div class="dropdown-icon p-2">
                    <MDBIcon icon="chevron-down" size="lg" />
                  </div>
                </div>
                <div v-if="openPoint" class="dropdown-options ">
                  <div v-for="point in pointSetting" :key="point.value" @click="selectPoint, selectedPoint = point.text"
                    class="dropdown-option p-2">
                    {{ point.text }}
                    <div class=" text-xs text-gray-400 font-normal">{{ point.description }}</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div class="answer-setting mb-6">
            <label for="answerSelection" class=" answer-select-title w-full text-sm font-bold text-black ">
              <span class="text-sm inline-block align-middle w-5 h-5">
                <AnswerSelectIcon />
              </span>
              Answer Options
              <div class="dropdown select-box relative box-border mt-[10px]" @click="openAnswer = !openAnswer">
                <div class="dropdown-selected w-full box-content ">
                  <div
                    class="box-content-inner overflow-hidden text-ellipsis relative flex items-center ms-1 font-normal text-gray-500">
                    {{ selectedAnswer ? selectedAnswer : 'Select an answer' }}
                  </div>
                  <div class="dropdown-icon p-2">
                    <MDBIcon icon="chevron-down" size="lg" />
                  </div>
                </div>
                <div v-if="openAnswer" class="dropdown-options ">
                  <div v-for="answer in answerSetting" :key="answer.value" @click="selectAnswer, selectedAnswer = answer.text"
                    class="dropdown-option p-2">
                    {{ answer.text }}
                    <div class=" text-xs text-gray-400 font-normal">{{ answer.description }}</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="setting-side-action py-1.5 px-0 my-0 mx-1.5  border-t-2 flex content-center items-center">
        <button class="btn-style delete-btn   btn-border" style="width: inherit">
          Delete
        </button>
        <button class=" btn-style  dup-btn" style="width: inherit">
          Duplicate
        </button>

      </div>
    </div>
    <div class="list-qs-type " v-if="openQuestionType">
      <div v-for="option in optionsQuestionType" :key="option.value" @click="openSelectQSType"
        class="option-setting p-2 w-[8rem] h-[8rem] bg-white border-b border-gray-200 ">
        <div class="option-setting-title" @click="selectedQuestionType = option;
        openQuestionType = false;
        optionQuestionTypeIcon = option.icon">
          <span class="text-sm max-w-full max-h-full flex flex-col  items-center p-2">
            <component :is="iconComponents[option.icon] " class="" />
          </span>
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>