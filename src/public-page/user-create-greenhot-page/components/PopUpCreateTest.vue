<script setup lang="ts">
import { CreateExamRequest, Exam, Packet, UpdateExamRequest } from '@/proto/Proto';
import { WS } from '@/socket/WS';
import { useExamStore } from '@/states/ExamStore';
import { useUserStore } from '@/states/UserStore';
import { onMounted, ref } from 'vue';

const openPopup = ref(false);
const togglePopup = () => {
  openPopup.value = !openPopup.value;
}
onMounted(() => {
  openPopup.value = true;
})
const examStore = useExamStore();
const userId = useUserStore().user?.userId;
const examTitle = ref('');
const description = ref('');


const handleCreateExam = (event: Event) => {
  event.preventDefault();
  let requestCreateExam = CreateExamRequest.create();
  let exam = Exam.create();
  exam.userId = userId;
  exam.title = examTitle.value;
  exam.description = description.value;
  exam.imageUrl = coverPhoto.value;
  requestCreateExam.exam = exam;
  console.log(requestCreateExam);
  let packet = Packet.create();
  packet.data = { oneofKind: 'createExamRequest', createExamRequest: requestCreateExam };
  console.log(packet);
  console.log('sent create exam');
  WS.send(packet);

}
const coverPhoto = ref('');
const uploadImage = (event: Event) => {
  event.preventDefault();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    // Create an instance of FormData
    const formData = new FormData();
    // Append the file to the formData object
    formData.append('file', file);
    fetch('http://localhost:8080/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID',
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        coverPhoto.value = data;
        console.log(data);
      });
  };
  input.click();
}



</script>
<template>
  <!--        popup content goes here-->
   <div  v-if="openPopup" class="popup-wrapper">
  <div v-if="examStore.isCreateNewExam" class="popup">
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
                      placeholder="Enter GreenHoot Title..." v-model="examTitle"
                      class="block w-full h-10 rounded-md border border-dashed border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
                </div>
                <div class="sm:col-span-8">
                  <label for="about" class="block text-sm font-medium leading-6 text-gray-900"><b>Description</b>(
                    Optional)</label>
                  <div class="mt-2">
                    <textarea id="about" name="about" rows="3" v-model="description"
                      class="block w-full rounded-md border border-dashed border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                      <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <button @click="uploadImage" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer">Upload
                            a file</button> 
                            <img v-if="coverPhoto" :src="coverPhoto" class="w-1/2 h-auto m-auto" alt="cover photo" />
                        </label>
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
          <button  class="btn-done" @click="handleCreateExam">Create</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.popup-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

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
</style>