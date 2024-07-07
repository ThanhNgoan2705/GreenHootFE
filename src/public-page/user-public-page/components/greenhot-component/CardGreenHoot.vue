<script setup lang="ts">
import {MDBCard, MDBCardImg, MDBCardBody, MDBCardText,MDBCardFooter,MDBBtn,MDBCardTitle} from 'mdb-vue-ui-kit';
import {PropType, ref} from "vue";
import {useUserStore} from "@/states/UserStore";
import {useExamStore} from "@/states/ExamStore";
import {Exam, Packet, ReqCreateRoom} from "@/proto/Proto";
import {WS} from "@/socket/WS";

const userStore = useUserStore();
const user = userStore.user;

const props = defineProps({
  data: {
    type: Object as PropType<Exam>,
    required: true
  }
});
const testId = props.data.examId;

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


</script>

<template>
<MDBCard>
      <MDBCardBody class="card-body w-full h-[12rem] ">
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center">
            <img
              :src="data.imageUrl"
              alt=""
              class="w-1/2 h-auto rounded"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">{{ data.title }}</p>
              <p class="text-muted mb-0">{{ user.username }}</p>
            </div>
          </div>
        </div>
      </MDBCardBody>
      <MDBCardFooter
        class="border-0 bg-light p-2 d-flex justify-content-around"
      >
      <button  class="w-1/2 start-button" @click="requestCreateRoom">Host</button>
      </MDBCardFooter>
    </MDBCard>
</template>

<style  >
.start-button{
  @apply w-full h-12 text-white bg-blue-500 rounded-md cursor-pointer text-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50;
}
.card-bd{
  padding: 0.5rem;
}
.bg-white{
  background-color: rgb(255, 255, 255);
}

</style>@/stores/ExamStore