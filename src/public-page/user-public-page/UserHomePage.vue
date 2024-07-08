<script setup lang="ts">
import TheHeader from "@/public-page/user-public-page/components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";
import {
  MDBRow, MDBCol,
  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBContainer, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem
} from 'mdb-vue-ui-kit';
import CardGreenHoot from "@/public-page/user-public-page/components/greenhot-component/CardGreenHoot.vue";
import ReportCard from "@/public-page/user-public-page/components/greenhot-component/ReportCard.vue";
import { useExamStore } from "@/states/ExamStore";
import { computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import router from "@/router";
import { GetAllExamRequest, Packet, ReqRelogin } from "@/proto/Proto";
import { WS } from "@/socket/WS";
import { useReportStore } from "@/states/ReportStore";


const token = sessionStorage.getItem("auth-token")as string | '';
const user = JSON.parse(sessionStorage.getItem("auth-user")as string | '');
const userId = parseInt(user?.userId);

console.log("token" + token);
console.log("user" + user);




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


const handleRequestListExam = () => {
  console.log("userId" + userId);
  let getAllExamByUserId = GetAllExamRequest.create({
    userId: userId,
  });
  let packet = Packet.create();
  packet.data = { oneofKind: 'getAllExamRequest', getAllExamRequest: getAllExamByUserId };
  console.log(packet);
  console.log("sent get all exam request to server");
  WS.send(packet);
}
onMounted(() => {
  handleRequestListExam();
});
const examStore = useExamStore();
const listExam = ref(examStore.getExams);
watchEffect(async () => {
  listExam.value = examStore.getExams;
  await nextTick();
});
const exams = listExam.value;

const reportStore = useReportStore();
const listReport = ref(reportStore.getAllreports);
watchEffect(async () => {
  listReport.value = reportStore.getAllreports;
  await nextTick();
});
const reports = listReport.value.slice(0, 4);

// pagination
const currentPage = ref(1);
const pageSize = 4;
let totalPages = Math.ceil(exams.length / pageSize);

const paginationData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return exams.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}




</script>
<template>
  <MDBContainer fluid class="m-0 p-0">
    <div class="main-page w-full  ">
      <TheMenuSideBar />
      <div class="right-main-contain " style="--main-element-scrollbar-width: 16px">
        <TheHeader />
        <main class="content-container">
          <div class="content-inside content-page flex flex-wrap lg:flex-nowrap xl:flex-nowrap">
            <!--         left-content-->
            <div class="sm:w-full md:w-full lg:w-[30%] xl:w-[30%] px-2">
              <MDBCard class="mb-3" style="max-width: 540px">
                <MDBRow class="g-0 content-center justify-center">
                  <MDBCol md="8">
                    <img src="../image/bear.jpg" alt="" class="w-full h-full rounded m-auto" />
                  </MDBCol>
                  <MDBCol md="12">
                    <MDBCardBody>
                      <MDBCardTitle>{{ user.username }}</MDBCardTitle>
                      <MDBCardText>
                        {{ user.email }}
                      </MDBCardText>
                      <MDBCardText>
                        <small class="text-muted">Last updated 3 mins ago</small>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </div>
            <!---content-->
            <div class="sm:w-full md:w-full lg:w-[70%] xl:w-[70%] px-2 ">
              <div class="main-content">
                <div class="content-list">
                  <MDBRow class="flex flex-row listTest">
                    <MDBCol class="col-xl-5 col-lg-4  mb-4" v-for="(item, index) in paginationData" :key="index">
                      <component class="main-card" :is="CardGreenHoot" :key="index" :data="item" />
                    </MDBCol>

                  </MDBRow>
                  <MDBRow class="flex justify-content-between">
                    <!-- <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
                    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button> -->
                  </MDBRow>
                </div>
                <div class="flex justify-center">
                  <MDBBtn color="primary" @click="router.push('/UserLibraryPage')">
                    See more
                    <MDBIcon icon="angle-right" size="xl" />
                  </MDBBtn>
                </div>
              </div>

            </div>
            <div class="report-list">
                <span class="text-lg font-bold"> Lastest Reports</span>
                <MDBListGroup light style="min-width: 25rem" class="list-report">
                  <component v-if="reports.length!==0" class="info-card" v-for="(item, index) in reports" :key="index" :is="ReportCard" :report="item" />
                  <div v-else class="report-noti">
                    <span
                      class="text-lg font-bold">No report</span>
                    <span
                    class="text-lg font-bold cursor-pointer text-blue-500"
                    >Take a test to get your report</span>
                    
                    <button
                      class="btn btn-primary"
                      @click="router.push('/UserLibraryPage')">Host Exam</button>
                  </div>
                </MDBListGroup>


              </div>
          </div>

        </main>
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

.content-container {
  @apply overflow-auto flex-[1_1_0%]
}


.content-inside {
  @apply box-border min-w-0 my-0 mx-auto w-full max-w-[1280px] flex-nowrap h-fit
}

.content-page {
  @apply pt-[2rem] pb-[5rem] bg-gray-50 z-[2]
}

.listTest {
  @apply flex flex-wrap justify-center items-center
}

.content-list {
  @apply w-full
}

.report-list {
  @apply w-full overflow-auto bg-white rounded-md shadow-md p-2 mb-2
}
.list-report{
  @apply w-full overflow-auto bg-white rounded-md shadow-md p-2 mb-2 

}

.main-content {
  @apply box-border my-0 mx-[1rem] min-w-0 w-full flex-[1_1_auto]
}

@media screen and (min-width: 1280px) {
  .content-page {
    @apply overflow-auto flex flex-row
  }

  .ifo-container-left {
    @apply w-[310px] m-0 flex-[0_0_auto]
  }

  .main-content {
    @apply w-full
  }
}

/* For devices with screen width greater than 1100px */
@media screen and (min-width: 1100px) {

  .ifo-container-left {
    @apply w-[308px] m-0 flex-[0_0_auto]
  }

  .main-content {
    @apply w-full
  }
}

@media screen and (min-width: 768px) {
  .ifo-container-left {
    @apply w-[308px] my-0 ms-[16px] me-0 flex-[0_0_auto]
  }

  .main-content {
    @apply w-full
  }
}

/* For devices with screen width less than 768px */
@media screen and (min-width: 375px) {
  .ifo-container-left {
    @apply w-full my-0 ms-[16px] me-0 flex-[1_1_auto]
  }

  .content-page {
    box-sizing: border-box;
    flex-wrap: wrap;
    min-width: 0;
    width: 100%;
  }

  .info-card {
    width: 100%;
  }

  .main-content {
    width: 100%;
    flex-wrap: wrap;
  }

  .main-card {
    width: 100%;
    height: auto;
  }
}
.report-noti {
  @apply flex flex-col items-center justify-center
}




</style>