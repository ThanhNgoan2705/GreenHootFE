<script setup lang="ts">
import TheHeader from "@/public-page/user-public-page/components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";
import {
  MDBContainer, MDBTabItem, MDBTabNav, MDBTabContent, MDBTabPane, MDBTabs
} from 'mdb-vue-ui-kit';
import { useReportStore } from "@/states/ReportStore";
import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from "vue";
import ReportCard from "@/public-page/user-public-page/components/greenhot-component/ReportCard.vue";
import MyDraftCards from "@/public-page/user-public-page/components/greenhot-component/MyDraftCards.vue";
import { WS } from "@/socket/WS";
import { Packet, ReqGetAllReportByHostId, ReqGetAllReportByPlayerId } from "@/proto/Proto";


const token = sessionStorage.getItem("auth-token")as string | '';
const user = JSON.parse(sessionStorage.getItem("auth-user")as string | '');
const userId = parseInt(user?.userId);


const isMobile = ref(window.innerWidth <= 767);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 767;
}
updateIsMobile();
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
})

const getAllExameJoinedReport = () => {
  console.log('get all report request');
    let getAllReportRequest = ReqGetAllReportByPlayerId.create();
    getAllReportRequest.userId = userId;
    let packet = Packet.create();
    packet.data = { oneofKind: 'reqGetAllReportByPlayerId', reqGetAllReportByPlayerId: getAllReportRequest };
    console.log(packet);
    console.log('sent get all exam');
    WS.send(packet);
};
const getAllHostedReport = () => {
  console.log('get all report request');
  let getAllReportRequest = ReqGetAllReportByHostId.create();
    getAllReportRequest.hostId = userId;
    let packet = Packet.create();
    packet.data = { oneofKind: 'reqGetAllReportByHostId', reqGetAllReportByHostId: getAllReportRequest };
    console.log(packet);
    console.log('sent get all exam');
    WS.send(packet);
};
const reportStore = useReportStore();
const listReport = ref(reportStore.getAllreports);
watchEffect(async () => {
  listReport.value = reportStore.getAllreports;
  console.log("listReport", listReport.value);
  await nextTick();
});
const reports = listReport.value;
console.log("reports", reports);
const activeTabId = ref('Recent');

</script>
<template>
  <MDBContainer fluid class="m-0 p-0">
    <div class="main-page w-full  ">
      <TheMenuSideBar />
      <div class="right-main-contain " style="--main-element-scrollbar-width: 16px">
        <TheHeader />
        <div class="main-page w-full ">
          <main class="d-inline-flex w-full  right-main-contain " style="--main-element-scrollbar-width: 16px">
            <div class="content-page w-full h-fit content-inside flex  bg-gray-100">
              <MDBTabs class="w-full" v-model="activeTabId">
                <MDBTabNav justify tabsClasses="mb-3 ">
                  <MDBTabItem tabId="Recent" href="Recent" @click="getAllHostedReport">Exam Host Reports</MDBTabItem>
                  <MDBTabItem tabId="ExamJoined" href="ExamJoined" @click="getAllExameJoinedReport">Exam Joined Reports</MDBTabItem>
                </MDBTabNav>
                <MDBTabContent>
                  <MDBTabPane tabId="Recent" class="flex overflow-auto">
                    <div class=" h-[530px] overflow-auto">
                      <div v-for="(item, index) in listReport" :key="index" class=" m-2">
                        <ReportCard :report="item" />
                      </div>
                    </div>
                  </MDBTabPane>
                  <MDBTabPane tabId="ExamJoined">
                    <div class=" h-[530px] overflow-auto">
                      <div v-for="(item, index) in listReport" :key="index" class=" m-2">
                        <MyDraftCards :report="item" />
                      </div>
                    </div>
                  </MDBTabPane>
                  <MDBTabPane tabId="ex1-3">Content #3</MDBTabPane>
                </MDBTabContent>
              </MDBTabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  </MDBContainer>
</template>
<style scoped>
.main-page {
  display: flex;
  box-sizing: border-box;

}

.right-main-contain {
  @apply flex w-full flex-col max-h-[svh] h-[calc(0rem+100vh)] overflow-hidden relative
}

.content-inside {
  @apply box-border min-w-0 my-0 mx-auto w-full h-fit flex flex-col
}

.content-page {
  @apply bg-gray-50 z-[2]
}

.tab-content {
  @apply h-[530px] w-full overflow-auto
}
</style>@/stores/UserStore