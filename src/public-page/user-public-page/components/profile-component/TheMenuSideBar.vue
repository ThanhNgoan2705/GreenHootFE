<script setup lang="ts">
import { GetAllExamRequest, Packet,ReqGetAllReportByHostId } from '@/proto/Proto';
import { WS } from '@/socket/WS';
import { useExamStore } from '@/states/ExamStore';
import { useUserStore } from '@/states/UserStore';
import {MDBIcon} from 'mdb-vue-ui-kit';
import {computed, ref} from 'vue';

const sidebarItem = ref([
  {
    name: 'Home',
    icon: 'home',
    link: '/UserHomePage',
  },
  {
    name: 'Library',
    icon: 'list-ul',
    link: '/UserLibraryPage',
  },
  {
    name: 'Reports',
    icon: 'chart-bar',
    link: '/UserReportsPage',
  },
]);
const activeLink = ref(sidebarItem.value[0].link);
const isActive = ref(false);
const setActiveLink = (name: string) => {
  
  activeLink.value = sidebarItem.value.find((item) => item.name === name)?.link || '';
  getAllExamRequest( activeLink.value);
  getAllReportRequest( activeLink.value);
  isActive.value = true;
  console.log(activeLink.value);
};
const userId = parseInt(JSON.parse(sessionStorage.getItem('auth-user') || '{}').userId);
const getAllExamRequest = ( activeLink: String) => {
  console.log('get all exam request');
  if (activeLink === '/UserLibraryPage') {
    let getAllExam = GetAllExamRequest.create();
    getAllExam.userId = userId;
    let packet = Packet.create();
    packet.data = { oneofKind: 'getAllExamRequest', getAllExamRequest: getAllExam };
    console.log(packet);
    console.log('sent get all exam');
    WS.send(packet);
  }
};

const getAllReportRequest = ( activeLink: String) => {
  console.log('get all report request');
  if (activeLink === '/UserReportsPage') {
    let getAllReportRequest = ReqGetAllReportByHostId.create();
    getAllReportRequest.hostId = userId;
    let packet = Packet.create();
    packet.data = { oneofKind: 'reqGetAllReportByHostId', reqGetAllReportByHostId: getAllReportRequest };
    console.log(packet);
    console.log('sent get all exam');
    WS.send(packet);
  }
};
</script>
<template>
  <div class="menu-sidebar__content" height="370">
      <ul class="list-sidebar-item">
        <div v-for="item in sidebarItem" :key="item.name" class="item-container">
          <router-link
              :to="item.link"
              class="sidebar-item"
              @click="setActiveLink(item.name)"
              :class="{active : activeLink === item.link}"
              :aria-current="activeLink=== item.name ? 'page' : undefined"
          >
            <span class="sidebar-icon text-center content-center">
                      <MDBIcon :icon="item.icon" size="xl" class="my-auto  "/>
            </span>
            <div class="sidebar-title  " :class="isActive? 'color-white':'color-black'">{{
                item.name
              }}</div>
          </router-link>
        </div>
      </ul>
  </div>
</template>
<style scoped>

.menu-sidebar__content {
  @apply bg-white min-w-[79px] w-[79px]  xl:min-w-[216px] box-border overflow-y-auto max-h-[calc(370px+0rem)] h-[370px] p-0.5 border-e-2 border-solid border-gray-200 flex flex-col justify-between z-[141]
}

.sidebar-icon {
  @apply z-[90] w-[27px] h-[27px]
}
a .sidebar-item:active {
  @apply text-white bg-blue-800

}
.list-sidebar-item {
  @apply flex flex-col gap-1 mt-[5rem] px-1.5
}

.sidebar-item {
  @apply rounded-sm min-h-[50px] w-full p-[2px] box-border flex flex-col items-center justify-center text-black decoration-0 cursor-pointer
}
.sidebar-title {
  @apply text-[12px] text-center
}


ul {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}

.item-container {
  border-radius: 0.25rem;
  min-height: 50px;
  width: 100%;
  padding: 2px;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: rgb(51, 51, 51);
  text-decoration: none;
  cursor: pointer;
}

a {
  font-size: 12px;
  font-weight: 500;
  color: rgb(51, 51, 51);
  text-decoration: none !important;
}

.sidebar-item.active {
  border-radius: 0.25rem;
}

.sidebar-item.router-link-active {

  background-color: rgb(70, 53, 171);
  color: rgb(255, 255, 255);
}

a.router-link-active {
  color: rgb(255, 255, 255);
}

  .sidebar-item {
    @apply xl:min-h-[40px] xl:min-w-[200px]  xl:flex-row justify-start gap-1 py-[4px] px-[8px] box-border
  }
  .sidebar-icon{
    @apply xl:inline-block xl:align-middle xl:w-[32px] xl:h-[32px]
  }
  .sidebar-title {
    @apply text-[16px]
  }
</style>