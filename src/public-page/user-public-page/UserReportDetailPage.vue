<script setup lang="ts">
import TheHeader from "@/public-page/user-public-page/components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";
import {
    MDBContainer, MDBTabItem, MDBTabNav, MDBTabContent, MDBTabPane, MDBTabs
} from 'mdb-vue-ui-kit';
import { useReportStore } from "@/states/ReportStore";
import { computed, nextTick, onMounted, onUnmounted, PropType, ref, watchEffect } from "vue";
import { Report } from "@/proto/Proto";


const token = sessionStorage.getItem("auth-token");
const user = JSON.parse(sessionStorage.getItem("auth-user"));
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

const reportStore = useReportStore();
const report = ref(reportStore.getReport);
watchEffect(async () => {
    report.value = reportStore.report;
    console.log("report", report.value);
    await nextTick();
});

console.log("report tu server", report.value);
const reportData = reportStore.report;
console.log("report tu store", reportData);

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
                            <table class="table table-striped table-bordered table-responsive-md">
                                <thead>
                                    <tr>
                                        <th>Exam Title</th>
                                        <th>Host Name</th>
                                        <th>Score</th>
                                        <th>Total Question</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="rep in reportData.roomScore?.userScores" :key="rep.userName">
                                        <td>{{ report.examTitle }}</td>
                                        <td>{{ rep.userName }}</td>
                                        <td>{{ rep.score }}</td>
                                        <td>{{ report.roomScore.totalQuestion }}</td>
                                    </tr>
                                </tbody>
                            </table>

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