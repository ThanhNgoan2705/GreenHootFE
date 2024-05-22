<script setup  lang="ts">
import {ref} from "vue";
import QrcodeVue, {type Level, type RenderAs} from "qrcode.vue";
import wsConfig from "@/config/Config";
const pinCode = ref(123456);
const value = wsConfig.host + '/play/' + pinCode.value;
const level = ref<Level> ('M');
const renderAs = ref<RenderAs>('svg');
const copyLink = (link :number) => {
  navigator.clipboard.writeText(link.toString());
}

</script>

<template>
  <div class="container-fluid waiting-wrapper">
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
        <div class="qr-code">
          <QrcodeVue :value="value" :level="level" :renderAs="renderAs" class="w-full h-full p-0.5"/>
        </div>
      </div>

    </div>
    <main class="main-content">
      <div class="content">
        <div class="player-showing w-full">

        </div>
      </div>
    </main>
    <div class="setting-option">

    </div>
  </div>
</template>

<style scoped>
.waiting-wrapper {
  @apply w-full h-full m-0 p-0  flex flex-col bg-[url('/src/public-page/user-play-page/components/image/background.jpg')] bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto;
}

.header {
  @apply flex w-full h-1/6 p-2 justify-center items-center ;
}

.invitation {
  @apply flex w-5/6 h-full  justify-center items-center border-none relative ;
}

.header-content {
  @apply flex w-1/2 h-full justify-between items-center;
}
.qr-code {
  width: 10vw;
  height: 10vw;
  max-width: 100%;
  max-height: 100%;
  background: white;
  border: none;
  margin-right: 2%;
  margin-left:2%;
  padding: 0;
  overflow: visible;
  display: flex;
  position: relative;
}

.join-link, .join-pin {
  @apply w-1/2 h-full bg-white;;
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

</style>