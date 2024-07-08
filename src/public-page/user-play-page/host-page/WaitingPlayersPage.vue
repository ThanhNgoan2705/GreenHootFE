<script setup  lang="ts">
import { ref } from "vue";
import QrcodeVue, { type Level, type RenderAs } from "qrcode.vue";
import wsConfig from "@/config/Config";
import { showToastTopRight } from "@/service/Alert";
import { Packet, ReqStartExam } from "@/proto/Proto";
import { WS } from "@/socket/WS";


const roomId = JSON.parse(sessionStorage.getItem('roomId')as string | '');
const examId = JSON.parse(sessionStorage.getItem('examId')as string | '');
const hostId = JSON.parse(sessionStorage.getItem('auth-user')as string | '').userId;

const pinCode = parseInt(roomId);
console.log(pinCode);
const copyLink = (link: number) => {
  navigator.clipboard.writeText(link.toString());
  showToastTopRight("Copied to clipboard");
}
const startGameRequest = () => {
  let startGame = ReqStartExam.create();
  startGame.roomId = roomId;
  startGame.examId = examId;
  startGame.hostId = hostId;
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqStartExam', reqStartExam: startGame };
  console.log(packet);
  console.log("sent start game request to server");
  WS.send(packet);
}
</script>

<template>
  <div class=" waiting-wrapper">
    <div class="header">
      <div class="header-content">
        <div class="invitation">
          <div class="join-link rounded-s-md me-2 flex justify-center items-center">
            <span class="text-lg ">Join at <b>www.greenhoot.com</b></span>
          </div>
          <div class="join-pin rounded-e-md flex flex-col justify-center items-center">
            <span class="text-lg">Join with pin:</span>
            <span class="text-5xl ms-2 font-bold cursor-pointer " @click="copyLink(pinCode)">{{ pinCode }}</span>
          </div>
        </div>
      </div>

    </div>
    <main class="main-content">
      <div class="content">
        <div class="player-showing w-full flex content-center justify-center mt-[5rem]">
          <button class="start-button" @click="startGameRequest">Start Game</button>
        </div>
      </div>
    </main>
    <div class="setting-option">

    </div>
  </div>
</template>

<style scoped>
.waiting-wrapper {
  @apply w-[100vw] h-[100vh] m-0 p-0 flex flex-col bg-[url('/src/public-page/user-play-page/components/image/background.jpg')] bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto;
}

.header {
  @apply flex w-full h-1/6 p-2 justify-center items-center;
}

.invitation {
  @apply flex w-full h-full justify-center items-center border-none relative;
}

.header-content {
  @apply flex w-1/2 h-full justify-between items-center;
}

.join-link,
.join-pin {
  @apply w-1/2 h-full bg-white rounded-md flex justify-center items-center;
}

/* For screens smaller than 600px */
@media (max-width: 600px) {
  .header {
    @apply h-[6rem];
  }
}

/* For screens between 600px and 900px */
@media (min-width: 600px) and (max-width: 900px) {
  .header {
    @apply h-[7rem];
  }
}

/* For screens larger than 900px */
@media (min-width: 900px) {
  .header {
    @apply h-[8rem];
  }
}

.start-button {
  @apply w-1/5 h-12 text-black bg-white rounded-md cursor-pointer text-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50;
}</style>