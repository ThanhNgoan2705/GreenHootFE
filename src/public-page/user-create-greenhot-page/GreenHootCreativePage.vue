<script setup>

import {nextTick, onMounted, ref} from "vue";
import {MDBIcon,MDBSelect} from "mdb-vue-ui-kit";
import TheHeaderCreative
  from "@/components/single-instance-components/create-greenhoot-components/TheHeaderCreative.vue";
import ListCardAnswers from "@/public-page/user-create-greenhot-page/components/ListCardAnswers.vue";
import MediaQuestionOption from "@/public-page/user-create-greenhot-page/components/MediaQuestionOption.vue";

const openPopup = ref(false);
const togglePopup = () => {
  openPopup.value = !openPopup.value;
}
onMounted(() => {
  openPopup.value = true;
})
const guildText = ref(null)
const savedText = ref('');
const qsContent = ref(false);

const optionsQuestionType = ref([
  {value: 1, text: 'Multiple choice'},
  {value: 2, text: 'True or False'},
  {value: 3, text: 'Type answer'},
  {value: 4, text: 'Puzzle'},
])
const selectedQuestionType = ref([]);
const makeEditable = () => {
  const question = document.getElementById('guild-content');
  if (question.innerText === 'Start typing your question') {
    question.innerText = '';
    guildText.value.contentEditable = true;
    savedText.value = question.innerText;
    guildText.value.focus();
  }

}
const saveText = () => {
  qsContent.value = true;
  nextTick(() => {
    const question = document.getElementById('guild-content');
    console.log("question " + question.innerText);
    savedText.value = question.innerText;
    if (savedText.value.length > 15) {
      savedText.value = savedText.value.substring(0, 10) + '...';
    }
    if (savedText.value === '') {
      question.innerText = 'Start typing your question';
      savedText.value = 'Question';
    }
    console.log(savedText.value);
  });
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
  <div class="container-wrap h-full flex flex-col overflow-auto">
    <div class="creator-container  ">
      <div class="creator-header pb-[56px] h-[56px] relative m-0 p-0">
        <TheHeaderCreative :themClick="themClick"/>
      </div>
      <div
          class="creator-sidebar box-border position-fixed left-0 z-20 overflow-hidden flex flex-col align-items-center bottom-0 w-1/6 h-full bg-white shadow-xl pt-0 ">
        <div class="side-bar-content block position-relative max-h-full h-auto w-full overflow-y-auto">
          <div class="w-full outline-0 ">
            <div class="sidebar-block h-full bg-blue-50 user-select-none py-2  pe-4 block" aria-label="question block">
              <div class=" flex justify-start items-center text-center text-gray-500 text-sm font-bold">
                <div class="qs-number  text-sm fw-normal text-gray-500 w-1.5 text-right ms-4">1</div>
                <div class="qs text-sm text-center ms-3">Quiz</div>
              </div>
              <div class="qs-content position-relative flex flex-row-reverse justify-center ">
                <div class="sidebar-block-gh justify-center " tabindex="0" role="button" aria-describedby="hidden-text"
                     draggable="false">
                  <div class="sidebar-block flex-col content-between h-full w-full max-w-full flex-1 py-0.5 px-1">
                    <div class="qs-title text-gray-500 text-center font-medium mt-2">
                      {{ qsContent ? savedText : 'Question' }}
                    </div>
                    <div class=" my-auto mx-0 flex justify-center relative ">
                      <div
                          class="qs-countdown block absolute top-1/2 left-0 w-6 h-6 border border-black rounded-full  text-center -translate-y-1/2  ">
                        20
                      </div>
                      <div class=" flex content-center items-center overflow-hidden ">
                        <div
                            class="  img-center flex w-8 h-6 justify-center items-center relative overflow-hidden border-2 border-dashed border-gray-500  text-gray-500 ">
                          <span class="flex z-50">
                        <MDBIcon icon="image" size="lg"/>
                      </span>
                        </div>

                      </div>
                    </div>
                    <div class="answer-selector flex flex-wrap mt-2">
                      <div class="answer-option relative h-3 mb-2 me-1  border border-gray-300 rounded-md "/>
                      <div class="answer-option relative h-3 mb-2   border border-gray-300 rounded-md "/>
                      <div class="answer-option relative h-3 mb-2 me-1  border border-gray-300 rounded-md "/>
                      <div class="answer-option relative h-3 mb-2   border border-gray-300 rounded-md 2"/>
                    </div>
                  </div>
                </div>
                <div class="sidebar-block-action visible flex flex-col justify-end self-end pe-0.5 ms-2">
                <span>
                  <span>
                    <button aria-label="duplicate" tabindex="0"
                            class=" p-0 border-0 w-auto bg-none rounded-sm cursor-pointer mt-2">
                      <span class="icon-dupli">
                        <MDBIcon icon="clone" size="sm"/>
                      </span>
                    </button>
                  </span>
                  <span>
                    <button aria-label="delete" tabindex="0"
                            class=" p-0 border-0 w-auto bg-none rounded-sm cursor-pointe mt-3 mb-1">
                      <span class="icon-delete inline-block ">
                        <MDBIcon icon="trash-alt" size="sm"/>
                      </span>
                    </button>
                  </span>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-bar-action ">
          <div class=" flex flex-col bg-white w-full justify-center items-center mt-2">
          <span>
            <button class="add-btn start-button">
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
                    Start typing your question</p>
                </div>
              </div>
            </div>
            <MediaQuestionOption/>
            <div class="flex flex-col w-full items-center">
              <ListCardAnswers/>
              <button class="add-answer-btn ">
                Add more answers
              </button>
            </div>
          </div>
          <div class="settings-side ">
            <div class="setting-side-content z-20 overflow-y-auto flex flex-col items-center bottom-0">
                <div class="list-options-setting flex flex-col items-center">
                  <div class="option-setting flex justify-center items-center w-full h-12 bg-white border-b-2 border-gray-200">
                 <MDBSelect>

                 </MDBSelect>
                  </div>
                  <div class="option-setting flex justify-center items-center w-full h-12 bg-white border-b-2 border-gray-200">
                    <div class="option-setting-title text-lg font-bold text-gray-500">
                      Theme
                    </div>
                  </div>
                  <div class="option-setting flex justify-center items-center w-full h-12 bg-white border-b-2 border-gray-200">
                    <div class="option-setting-title text-lg font-bold text-gray-500">
                      Media
                    </div>
                  </div>
                </div>
            </div>
            <div class="setting-side-action py-1.5 px-0 my-0 mx-1.5  border-t-2 flex content-center items-center">
              <button class="delete-btn  btn-style btn-border" style="width: inherit">
                Delete
              </button>
              <button class="dubp-btn btn-style btn-border " style="width: inherit">
                Duplicate
              </button>

            </div>
          </div>
          <div class="theme-side-selection hidden">
            <div class="theme-side-content z-20 overflow-y-auto flex flex-col items-center bottom-0">

            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<style>
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

.creator-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

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

@media (min-width: 600px)

@media (min-width: 600px) {
  .popup-content {
    animation: 0.2s ease 0s 1 normal forwards running ZwfxJ;
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
  margin: 3.5rem 0 0;
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
  max-height: calc(100% - 2 * clamp(0px, 0vmin, 48px));
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
  @apply leading-7 m-0 border-none cursor-pointer inline-block align-bottom bg-white text-black rounded-lg text-sm font-bold text-center decoration-0 min-w-10 min-h-10 h-10 pt-0 px-6 pb-1 relative
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

</style>