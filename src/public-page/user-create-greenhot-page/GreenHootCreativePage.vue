<script setup lang="ts">
import {type DefineComponent, nextTick, onMounted, type Ref, ref, type UnwrapRef} from "vue";
import {MDBIcon,} from "mdb-vue-ui-kit";
import TheHeaderCreative from "@/public-page/user-create-greenhot-page/components/TheHeaderCreative.vue";
import ListCardAnswers from "@/public-page/user-create-greenhot-page/components/ListCardAnswers.vue";
import MediaQuestionOption from "@/public-page/user-create-greenhot-page/components/MediaQuestionOption.vue";
import MultipleChoiceIcon from "@/public-page/user-create-greenhot-page/components/icon/MultipleChoiceIcon.vue";
import AnswerSelectIcon from "@/public-page/user-create-greenhot-page/components/icon/AnswerSelectIcon.vue";
import QuestionTypeIcon from "@/public-page/user-create-greenhot-page/components/icon/QuestionTypeIcon.vue";
import TrueFalseIcon from "@/public-page/user-create-greenhot-page/components/icon/TrueFalseIcon.vue";
import TypeAnswerIcon from "@/public-page/user-create-greenhot-page/components/icon/TypeAnswerIcon.vue";
import PuzzleIcon from "@/public-page/user-create-greenhot-page/components/icon/PuzzleIcon.vue";
import QuestionDemo from "@/public-page/user-create-greenhot-page/components/QuestionDemo.vue";


const openPopup = ref(false);
const togglePopup = () => {
  openPopup.value = !openPopup.value;
}
onMounted(() => {
  openPopup.value = true;
})
const guildText = ref<HTMLElement | null>(null);
const savedText = ref('');
const qsContent = ref(false);
const openQuestionType = ref(false);
const optionQuestionTypeIcon = ref('MultipleChoiceIcon');

const optionsQuestionType = ref([
  {value: 1, text: 'Multiple choice', icon: 'MultipleChoiceIcon'},
  {value: 2, text: 'True or False', icon: 'TrueFalseIcon'},
  {value: 3, text: 'Type answer', icon: 'TypeAnswerIcon'},
  {value: 4, text: 'Puzzle', icon: 'PuzzleIcon'},
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
const timeSetting = ref([
  {value: 1, text: '20 seconds'},
  {value: 2, text: '30 seconds'},
  {value: 3, text: '40 seconds'},
  {value: 4, text: '50 seconds'},
  {value: 5, text: '1 minute'},
  {value: 6, text: '1 minute 30 seconds'},
  {value: 7, text: '2 minutes'},
  {value: 8, text: '2 minutes 30 seconds'},
]);
const selectedTime = ref();
const openTime = ref(false);
const selectTime = (time: string) => {
  selectedTime.value = time;
  openTime.value = false;
}
const selectedPoint = ref();
const openPoint = ref(false);
const pointSetting = ref([
  {value: 1, text: 'Standard', description: 'Award points based on correct answers'},
  {value: 2, text: 'Double points', description: 'Give twice as many points for correct answers'},
  {value: 3, text: 'No points', description: 'Lower the stakes by not awarding points'},
]);
const selectPoint = (point: string) => {
  selectedPoint.value = point;
  openPoint.value = false;
}
const openAnswer = ref(false);
const selectedAnswer = ref();
const answerSetting = ref([
  {value: 1, text: 'Single select', description: 'Allow players to select only one answer'},
  {value: 2, text: 'Multiples', description: 'Allow players to select multiple answers'},
]);
const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer;
  openAnswer.value = false;
}
const selectedQuestionType = ref(optionsQuestionType.value[0]);
console.log(selectedQuestionType.value);
const makeEditable = () => {
  const question = document.getElementById('guild-content') as HTMLElement;
  if (question.innerText === 'Start typing your question' && guildText.value) {
    question.innerText = '';
    guildText.value.contentEditable = "true";
    guildText.value.focus();
    savedText.value = question.innerText;
  }

}
const saveText = () => {
  console.log(guildText.value?.innerText);
  qsContent.value = true;
  nextTick(() => {
    const question = document.getElementById('guild-content') as HTMLElement;
    savedText.value = question.innerText;
    if (question.innerText === '' && guildText.value) {
      guildText.value.contentEditable = "false";
      savedText.value = 'Question';
      question.innerText = 'Start typing your question';
    }
    if (savedText.value.length > 15) {
      savedText.value = savedText.value.substring(0, 10) + '...';
    }
    console.log(savedText.value);
    console.log(savedText.value);
  });
};
const openSelectQSType = () => {
  openQuestionType.value = false;
}
const qsImage = ref('');

const handleImageUpdate = (newImage: string) => {
  qsImage.value = newImage;
}

const questionCount = ref(1);
const incrementQuestion = () => {
  questionCount.value++;
}
const addQuestionDemo = () => {
  incrementQuestion();
  setActiveQuestionDemo(questionCount.value - 1);
}
const handleDeleteQuestion = (id: number) => {
  if (questionCount.value === 0) {
    const systemMessage = document.getElementById('system-message') as HTMLElement;
    systemMessage.innerText = 'You must have at least one question';
    systemMessage.style.display = 'block';
    setTimeout(() => {
      systemMessage.style.display = 'none';
    }, 3000);
    return;
  }
  questionCount.value -= 1;
}
let activeQsDemo = ref(0);
const isActiveQsDemo = ref(false);
const setActiveQuestionDemo = (id: number) => {
  if (activeQsDemo.value === id) {
    return;
  } else {
    activeQsDemo.value = id;
  }
};
</script>
<template>
  <!--        popup content goes here-->
  <div v-if="openPopup" class="popup">
    <div class="popup-container p-1">
      <div class="popup-content">
        <div class="d-flex justify-content-between">
          <div class="dialog_title flex p-2 m-0 text-center ">
            <h1 class="text-xl font-bold text-gray-900">
              Create new Green Hoot
            </h1>
          </div>
        </div>
        <div class=" list-button ">
          <div class="button-container d-flex justify-content-between grid gap-3.5 p-10">
            <div class="flow mx-10  option-blank flex justify-center">
              <button class="button-template ">
                <div class="align-items-center  icon bg-blue-500 ">
                  <MDBIcon icon="file-alt" size="xl" style="color:white"/>
                </div>
                <div class="text-center">
                  <h1 class="text-lg font-bold">Templates </h1>
                  <div class="text-sm font-normal text-gray-500">Create a kahoot from scratch</div>
                </div>
              </button>
            </div>
            <div class=" flow mx-10  option-template flex justify-center">
              <button class="button-template ">
                <div class="align-items-center icon">
                  <MDBIcon icon="plus" size="xl"/>
                </div>
                <div class="text-center">
                  <h1 class="text-lg font-bold">Blank Canvas</h1>
                  <div class="text-sm font-normal text-gray-500">Create a kahoot from scratch</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="dialog-action">
                <span class="button-close">
                  <button class="btn-cls" @click="togglePopup">Close</button>
                </span>
        </div>
      </div>
    </div>
  </div>
  <div class="container-wrap ">
    <div class="creator-container">
      <div class="creator-header pb-[56px] h-[56px] relative">
        <TheHeaderCreative/>
      </div>
      <div class="creator-sidebar box-border ">
        <div class="side-bar-content ">
          <QuestionDemo v-for="(n,index) in questionCount" :key="n"
                        :qs-content="qsContent"
                        :qs-image="qsImage"
                        :saved-text="savedText"
                        :question-count="questionCount"
                        :id="n"
                        :class="{ 'active-demo': activeQsDemo === index }"
                        @increment="addQuestionDemo"
                        @deleteQuestion="handleDeleteQuestion(n)"
                        @click="setActiveQuestionDemo(index)"
                        :is-active="!isActiveQsDemo"
          />
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
        </div>
        <div class="side-bar-action ">
          <div class=" flex flex-col bg-white w-full justify-center items-center mt-2">
          <span>
            <button class="add-btn start-button"
                    @click="addQuestionDemo">
            Add question
          </button>
          </span>

          </div>
        </div>
      </div>
      <main class="main-content-wrapp ">
        <div class="content flex h-full">
          <div class="content-background ">
            <div class="question-title w-full flex items-center " style="    -webkit-box-align: center;">
              <div class="question-text-field w-full h-auto relative bg-white pb-1 rounded-2xl z-10">
                <div class="input-container  guild-text " @click="makeEditable">
                  <p id="guild-content" class="text-center text-black text-lg  mt-2 border-none"
                     ref="guildText" @blur="saveText">
                    Start typing your question
                  </p>
                </div>
              </div>
            </div>
            <MediaQuestionOption @update:backgroundImage="handleImageUpdate"/>
            <div class="flex flex-col w-full items-center">
              <ListCardAnswers :question-type="selectedQuestionType.text"/>
              <button class="add-answer-btn ">
                Add more answers
              </button>
            </div>
          </div>
          <div class="settings-side ">
            <div class="setting-side-content">
              <div class="list-options-setting  flex flex-col items-center ">
                <div class="option-setting  mt-1 mb-5">
                  <label for="questionType" class="w-full text-sm font-bold text-black"
                  >
                    <span class="text-sm inline-block align-middle w-5 h-5  ">
                      <QuestionTypeIcon/>
                       </span>
                    Question type
                    <div id="questionType" class="relative border-box" @click="openQuestionType = !openQuestionType">
                      <div class="select-box relative box-border mt-[8px]">
                        <div class="box-content ">
                          <div class="box-content-inner">
                            <div class="box-content-icon">
                              <div class="box-image absolute left-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px]">
                                <component :is="iconComponents[optionQuestionTypeIcon]" class="max-w-full max-h-full"/>
                              </div>
                            </div>
                            <div class="box-content-text ms-[2rem] text-lg font-normal leading-3  ">
                              <span class="text-sm text-gray-500">{{ selectedQuestionType.text }}</span>
                            </div>
                          </div>
                          <div class="box-dropdown items-center self-stretch flex shrink-0 box-border">
                            <div class="box-dropdown-icon p-2">
                              <MDBIcon icon="chevron-down" size="lg"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <hr class="w-full border-black mt-0 mb-4 "/>
                <div class="time-setting  mb-5">
                  <label for="timeSelection" class=" time-select-title w-full text-sm font-bold text-black ">
                    <span class="text-sm inline-block align-middle w-5 h-5">
                     <MDBIcon icon="stopwatch" size="lg"/>
                    </span>
                    Time Limit
                    <div class="dropdown select-box relative box-border mt-[10px]" @click="openTime = !openTime">
                      <div class="dropdown-selected w-full box-content ">
                        <div
                            class="box-content-inner overflow-hidden text-ellipsis relative flex items-center ms-1 font-normal text-gray-500">
                          {{ selectedTime ? selectedTime.text : 'Select a time' }}
                        </div>
                        <div class="box-dropdown items-center self-stretch flex shrink-0 box-border">
                          <div class="box-dropdown-icon p-2">
                            <MDBIcon icon="chevron-down" size="lg"/>
                          </div>
                        </div>
                      </div>
                      <div v-if="openTime" class="dropdown-options ">
                        <div
                            v-for="time in timeSetting"
                            :key="time.value"
                            @click="selectTime(time.text)"
                            class="dropdown-option p-2"
                        >
                          {{ time.text }}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div class="point-setting mb-6">
                  <label for="pointSelection" class=" point-select-title w-full text-sm font-bold text-black ">
                    <span class="text-sm inline-block align-middle w-5 h-5">
                     <MDBIcon icon="award" size="lg"/>
                    </span>
                    Points
                    <div class="dropdown select-box relative box-border mt-[10px]" @click="openPoint = !openPoint">
                      <div class="dropdown-selected w-full box-content ">
                        <div
                            class="box-content-inner overflow-hidden text-ellipsis relative flex items-center ms-1 font-normal text-gray-500">
                          {{ selectedPoint ? selectedPoint.text : 'Select a point' }}
                        </div>
                        <div class="dropdown-icon p-2">
                          <MDBIcon icon="chevron-down" size="lg"/>
                        </div>
                        <div v-if="selectedPoint" class="  text-xs text-gray-400 ">{{ selectedPoint.description }}</div>
                      </div>
                      <div v-if="openPoint" class="dropdown-options ">
                        <div
                            v-for="point in pointSetting"
                            :key="point.value"
                            @click="selectPoint(point.text)"
                            class="dropdown-option p-2"
                        >
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
                     <AnswerSelectIcon/>
                    </span>
                    Answer Options
                    <div class="dropdown select-box relative box-border mt-[10px]" @click="openAnswer = !openAnswer">
                      <div class="dropdown-selected w-full box-content ">
                        <div
                            class="box-content-inner overflow-hidden text-ellipsis relative flex items-center ms-1 font-normal text-gray-500">
                          {{ selectedAnswer ? selectedAnswer.text : 'Select an answer' }}
                        </div>
                        <div class="dropdown-icon p-2">
                          <MDBIcon icon="chevron-down" size="lg"/>
                        </div>
                        <div v-if="selectedAnswer" class="  text-xs text-gray-400 ">{{
                            selectedAnswer.description
                          }}
                        </div>
                      </div>
                      <div v-if="openAnswer" class="dropdown-options ">
                        <div
                            v-for="answer in answerSetting"
                            :key="answer.value"
                            @click="selectAnswer(answer.text)"
                            class="dropdown-option p-2"
                        >
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
            <div
                v-for="option in optionsQuestionType"
                :key="option.value"
                @click="openSelectQSType"
                class="option-setting p-2 w-[8rem] h-[8rem] bg-white border-b border-gray-200 "
            >
              <div
                  class="option-setting-title"
                  @click="selectedQuestionType = option;
                  openQuestionType = false;
                optionQuestionTypeIcon = option.icon"
              >
                <span class="text-sm max-w-full max-h-full flex flex-col  items-center p-2">
                  <component :is="iconComponents[option.icon] " class=""/>
                </span>
                {{ option.text }}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.popup {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
  text-align: center;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.popup-container {
  display: inline-block;
  text-align: start;
  top: 0;
  cursor: default;
  outline: 0;
  vertical-align: middle;
  width: 100%;
  height: 100%;
}

.popup-content {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  animation: auto ease 0s 1 normal none running;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  overflow: hidden auto;
}

.container-wrap {
  @apply w-full overflow-hidden h-full flex flex-col
}

.creator-container {
  @apply w-full overflow-hidden h-full flex flex-col
}

.creator-sidebar {
  position: fixed;
  left: 0px;
  z-index: 101;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  bottom: unset;
  width: 12rem;
  height: 100%;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  padding-top: 0px;
}

.question-demo.active-demo .sidebar-block {
  @apply bg-blue-300
}

.add-answer-btn {
  border: none;
  overflow: visible;
  outline: none;
  font-style: inherit;
  font-variant: inherit;
  font-stretch: inherit;
  font-family: inherit;
  font-optical-sizing: inherit;
  font-kerning: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  cursor: pointer;
  -webkit-font-smoothing: inherit;
  appearance: none;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(12px);
  display: flex;
  gap: 8px;
  -webkit-box-align: center;
  align-items: center;
  width: fit-content;
  margin: 8px;
  padding: 16px;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
  text-decoration: underline;
  border-radius: 0.25rem;
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

.dialog_title {
  @apply bg-white  p-2 m-0 text-center
}

.dialog-action {
  @apply flex justify-center w-full p-2.5 m-0 text-center
}

.list-button {
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
  background: rgb(242, 242, 242);
  padding: 0;
  scroll-behavior: smooth;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
}

@media (max-width: 500px) {
  .button-container {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.option-template, .option-blank {
  height: 232px;
  width: 200px;
  border-radius: 0.5rem;
  background-color: rgb(255, 255, 255);
  padding: 0px;
  cursor: pointer;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
}

.icon {
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  background: rgb(242, 242, 242);
  color: rgb(0, 0, 0);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 48px;
  min-height: 48px;
  height: 48px;
  padding: 0px 16px 4px;
  line-height: 48px;
  position: relative;
}

.dialog-action {
  width: calc(100% - 48px);
}

.button-template .icon {
  @apply bg-blue-500 text-white
}

.button-close {
  @apply flex justify-center w-full p-1.5 m-0 text-center
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
</style>