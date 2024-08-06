<script setup lang="ts">
import {  defineEmits } from 'vue';
import type { PropType } from 'vue';
import { MDBIcon } from 'mdb-vue-ui-kit';
import { DeleteExamRequest, Exam, GetExamRequest, Packet, ReqCreateRoom, UpdateExamRequest } from '@/proto/Proto';
import { useUserStore } from '@/states/UserStore';
import { WS } from '@/socket/WS';
import { useExamStore } from '@/states/ExamStore';


const userStore = useUserStore();
const user = userStore.user;

const examStore = useExamStore();


const props = defineProps({
  data: {
    type: Object as PropType<Exam>,
    required: true
  }
});

console.log(props.data);
const testId = props.data.examId;
console.log(testId);

const emit = defineEmits(['deleteExam']);
const removeExam = (event: Event) => {
  event.preventDefault();
  emit('deleteExam', props.data.examId);
}

const requestCreateRoom = (event: Event) => {
  event.preventDefault();
  let requestCreateRoom = ReqCreateRoom.create();
  requestCreateRoom.testId = testId;
  requestCreateRoom.userId = user?.userId;
  console.log(testId+" testId in card");
  sessionStorage.setItem('examId', testId.toString());
  sessionStorage.setItem('isHost', 'true');
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqCreateRoom', reqCreateRoom: requestCreateRoom };
  console.log(packet);
  console.log('sent create room');
  WS.send(packet);
}
const deleteExam = (event: Event) => {
  event.preventDefault();
 let selectExam = DeleteExamRequest.create();
  selectExam.examId = testId;
  selectExam.userId = user?.userId;
  let packet = Packet.create();
  let exam = Exam.create();
  exam.examId = testId;
  packet.data = { oneofKind: 'deleteExamRequest', deleteExamRequest: selectExam };
  console.log(packet);
  WS.send(packet);
}
const EditExam = (event: Event) => {
  event.preventDefault();
 let getExamRequest = GetExamRequest.create();
  getExamRequest.examId = testId;
  sessionStorage.setItem('examId', testId.toString());
  let packet = Packet.create();
  packet.data = { oneofKind: 'getExamRequest', getExamRequest: getExamRequest };
  console.log(packet);
  WS.send(packet);
}




</script>

<template>
<div class="card w-">
  <div class="card-body flex flex-row">
    <div class="card-select w-[2rem] h-full flex py-[3rem]  items-center flex-[0_0_auto]">
      <input type="checkbox" class="card-select-input " id="card-select-1">
      <label for="card-select-1" class="card-select-label"></label>
    </div>
    <div class="card-image mx-2 cursor-pointer" @click="EditExam">
      <img :src="data.imageUrl" class=" w-[176px] h-[120px]" alt="..." />
    </div>
    <div class="card-content flex">
      <div class="card-title  flex flex-row justify-between">
        <h5 class="card-name ">{{ data.title }}</h5>
        <div class="card-setup ">
          <div class="card-edit">
            <button class="mx-2" @click="EditExam">
              <MDBIcon icon="edit" size="lg" class="grey-color "/>
            </button>
            <button
              @deleteExam="$emit('deleteExam', testId)"
              class=" mx-2"
              @click="deleteExam"
             >
              <MDBIcon icon="trash" size="lg" class="grey-color"/>
            </button>
          </div>
        </div>
      </div>
      <div class="card-action  flex flex-row justify-between">
        <div class="card-info justify-self-start ">
            <span class="mx-2">{{ data.description }}</span>
        </div>
        <div class="flex flex-row content-center items-center ">
          <a href="#" class="btn btn-primary mx-2" @click="requestCreateRoom">Host Live</a>
        </div>

      </div>
    </div>
  </div>
</div>
</template>
<style scoped>

.card-select-input[type="checkbox"] {
  @apply flex-[0_0_auto] block appearance-none block h-[1rem] w-[1rem] rounded-full border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
}
.card-select-input[type="checkbox"]:checked {
  @apply bg-blue-600 border-transparent
}
.card-select-input[type="checkbox"]:not(:checked) {
  @apply bg-white border-gray-300
}
.card-content {
  @apply  w-full box-border flex-col m-0 min-w-0 items-stretch justify-between
}

</style>