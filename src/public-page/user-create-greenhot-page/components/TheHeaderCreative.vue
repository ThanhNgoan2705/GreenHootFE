<script setup lang="ts">
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon,
} from 'mdb-vue-ui-kit';
import {PhotoIcon} from "@heroicons/vue/16/solid/index.js";
import {computed, onMounted, onUnmounted, PropType, ref} from "vue";
import {Exam, GetExamRequest, Packet, UpdateExamRequest} from "@/proto/Proto";
import { WS } from '@/socket/WS';
import { useExamStore } from '@/states/ExamStore';
import { showConfirmAlert, showWarningAlert,showSuccessAlert } from '@/service/Alert';
import { useQuestionStore } from '@/states/QuestionStore';
import router from '@/router';


const openPopup = ref(false);
const examTitle = ref('');
const examDescription = ref('');

const examId = sessionStorage.getItem('examId');
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

const handleGetExam = () => {
  let getExamRequest = GetExamRequest.create();
  getExamRequest.examId = parseInt(examId);
  let packet = Packet.create();
  packet.data = { oneofKind: 'getExamRequest', getExamRequest: getExamRequest };
  WS.send(packet);
  openPopup.value = true;
}

const togglePopup = () => {
  openPopup.value =
   !openPopup.value;
}

const examStore = useExamStore();
const questionStore = useQuestionStore();


const userId = sessionStorage.getItem('userId');

const sendUpdateExamRequest= (event:Event)=>{
  event.preventDefault();
  let exam = Exam.create();
  exam.userId = parseInt(userId);
  exam.title = examTitle.value;
  exam.description = examDescription.value;
  let request = UpdateExamRequest.create();
  request.exam = exam;
  let packet = Packet.create();
  packet.data = { oneofKind: 'updateExamRequest', updateExamRequest: request };
  console.log(packet);
  WS.send(packet);
}



const completeExam = () => {
  showConfirmAlert("Are you sure you want to exit?", () => {
    router.push("/UserHomePage");
    
  });
  
};
const saveExam = () => {
  if(questionStore.questions.length === 1&& questionStore.isUpdateQuestion=== false){
    showWarningAlert("Please add at  question content to save the exam.");
    return;
  }
  if(questionStore.isUpdateQuestion == true){
    showSuccessAlert("Exam saved successfully.");
    router.push("/UserHomePage");
  }
  if (questionStore.isNewQuestion) {
    showWarningAlert("Please add content and  save the question before saving the exam.");
    return;
    
  }

};

</script>
<template>
  <MDBNavbar expand="xl" light bg="white" position="top" class="nav-container ">
    <div class="flex w-full ">
      <MDBNavbarBrand href="#" >
        <img
            src="../../../components/single-instance-components/logo/green.png"
            height="50"
            width="150"
            alt=""
            loading="lazy"
            class="cursor-pointer flex items-center"
        />
      </MDBNavbarBrand>
      <button v-if="!isMobile" class="button-setting " @click="handleGetExam">
        <span class="setting-title m-0 " > Enter GreenHoot Title...</span>
        <span class="setting-btn-container w-1/3 border-black bg-gray-400 ">
                <span class="st-btn">Settings</span>
              </span>
      </button>
      <button v-else class="button-setting " @click="togglePopup">
        <span class="setting-title m-0 ">Enter GreenHoot Title... </span>
        <span class="setting-btn-container p-1  border-black bg-gray-400 ">
                <MDBIcon fas icon="cog" size="lg"/>
              </span>
      </button>
      <div class="style-filler"></div>
      <div class="flex justify-content-center align-items-center my-0 mx-2.5">
        <div class="bg-gray-400 h-3/4 " style="width:1px"></div>
      </div>
      <button v-if="!isMobile" class=" action-btn exit-btn" @click="completeExam"> Exit</button>
      <button class=" action-btn save-btn" @click="saveExam" > Save</button>
    </div>
  </MDBNavbar>
  <div v-if="openPopup" class="popup ">
    <div class="popup-container p-1">
      <div class="greenhoot-sumary">
        <div class="d-flex justify-content-between">
          <div class="dialog_title flex p-2 m-0 text-center ">
            <h1 class="text-xl font-bold text-gray-900">
              GreenHoot Summary
            </h1>
          </div>
        </div>
        <div class=" summary-form">
          <form class=" grid grid-cols-12 gap-4">
            <div class=" col-start-1 col-end-8 border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-8 ">
                  <label for="last-name" class="block text-sm  font-bold leading-6 text-black">Title</label>
                  <div class="mt-2">
                    <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                           placeholder="Enter GreenHoot Title..."
                           v-model="examTitle"
                           class="block w-full h-10 rounded-md border border-dashed border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
                </div>
                <div class="sm:col-span-8">
                  <label for="about"
          
                         class="block text-sm font-medium leading-6 text-gray-900"><b>Description</b>(
                    Optional)</label>
                  <div class="mt-2">
                    <textarea id="about" name="about" rows="3"
                    v-model="examDescription"
                              class="block w-full rounded-md border border-dashed border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Pro tip: a good description will help other users find
                    your GreenHoot.</p>
                </div>
              </div>

            </div>
            <div class=" col-start-8 col-span-5 ">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-8">
                  <label for="cover-photo" class="block text-sm font-bold leading-6 text-gray-900">Cover photo</label>
                  <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                      <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                      <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="file-upload"
                               class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" />
                    
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="dialog-action ">
          <button class="btn-cls" @click="togglePopup">Cancel</button>
          <button class="btn-done" @click="sendUpdateExamRequest">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-container {
  background: rgb(255, 255, 255);
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  color: rgb(255, 255, 255);
  padding: 0 1rem;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.button-setting {
  @apply h-[42px] rounded-[4px] bg-[#f2f2f2] flex items-center cursor-pointer justify-between overflow-hidden w-[45%] max-w-[320px] border border-[#ccc];
}

.button-add {
  width: 100%;
  max-width: 100%;
}
.setting-title {
  @apply text-sm font-bold text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis ms-[1rem]
}

.setting-btn-container {
  @apply inline-block ms-[px] me-[0.25rem] rounded-sm bg-[#f2f2f2] transition-colors font-bold text-sm text-gray-700;
}
.style-filler{
  display:flex;
  flex:1 1 0%
}

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
}

.greenhoot-sumary {
  width: 100%;
  height: 100%;
  border-radius: 0;
  animation: auto ease 0s 1 normal none running;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  overflow: hidden auto;
}


.summary-form {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 0 24px;
}

.dialog-action {
  width: calc(100% - 48px);
  flex: 0 0 auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 20px;
}

.dialog-action button {
  min-width: 7.5rem;
  margin: 0 4px;
}

.btn-cls {
  width: initial;
  margin: 0;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0 -4px inset;
  background: rgb(242, 242, 242);
  color: rgb(0, 0, 0);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0 16px 4px;
  position: relative;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.btn-done {
  width: initial;
  margin: 0;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0 -4px inset;
  background: rgb(38, 137, 12);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0 16px 4px;
  position: relative;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.theme-button {
  width: initial;
  margin: 0;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  background: rgb(19, 104, 206);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  height: 42px;
  padding: 0 16px 4px;
  line-height: 42px;
  position: relative;
}

.action-btn {
  width: initial;
  margin: 0 4px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  background: rgb(242, 242, 242);
  color: rgb(51, 51, 51);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  height: 42px;
  padding: 0 16px 4px;
  line-height: 42px;
  position: relative;
}

.action-btn.exit-btn {
  background: rgb(255, 255, 255);
  color: rgb(51, 51, 51);
  border: 1px solid rgb(204, 204, 204);
}

.action-btn.save-btn {
  background: rgb(97, 97, 97);
  color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  display: flex;
  flex: 0 0 auto;
}

@media (max-width: 1008px) {
  .button-setting {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .setting-btn-container {
    padding: 7px 13px;
  }
}

@media (min-width: 600px) {
  .greenhoot-sumary {
    max-width: 95vw;
    max-height: 95vh;
    width: 800px;
    height: auto;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
  }

  .greenhoot-sumary {
    animation: 0.2s ease 0s 1 normal forwards running ZwfxJ;
  }
}
</style>@/stores/UserStore