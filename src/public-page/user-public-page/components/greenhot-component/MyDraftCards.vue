<script setup lang="ts">
import type {PropType} from 'vue';
import {MDBIcon} from 'mdb-vue-ui-kit';
import {Packet, Report, ReqGetReport} from '@/proto/Proto';
import {WS} from '@/socket/WS';

const props = defineProps({
  report: {
    type: Object as PropType<Report>,
    required: true
  }
});
const data = props.report;
console.log("data", data);

const seeReportDetail = () => {
  console.log("seeReportDetail", data);
  let getReport = ReqGetReport.create();
  getReport.examSessionId = data.examSessionId;
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqGetReport', reqGetReport: getReport };
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
      <div class="card-image mx-2 cursor-pointer" @click="seeReportDetail">
        <img :src="data?.examTitle" class=" w-[176px] h-[120px]" alt="..." />
      </div>
      <div class="card-content flex">
        <div class="card-title  flex flex-row justify-between">
          <h5 class="card-name ">{{ data?.examTitle }}</h5>
          <div class="card-setup ">
            <div class="card-edit">
              <button class="mx-2" @click="seeReportDetail">
                <MDBIcon icon="eye" size="lg" class="grey-color "/>
              </button>
            </div>
          </div>
        </div>
        <div class="card-action  flex flex-row justify-between">
          <div class="card-info justify-self-start ">
              <span class="mx-2">{{ data?.hostName}}</span>
              <MDBIcon icon="circle" size="sm" class="green-color"/>
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