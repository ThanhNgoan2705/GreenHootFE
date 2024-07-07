<script setup  lang="ts">
import { useRoomStore } from '@/states/RoomStore';
const playerName = sessionStorage.getItem('player-name');
console.log(playerName);

</script>

<template>
  <div class=" waiting-wrapper">
    <main class="main-content">
      <div class="content w-full h-full">
        <div class="player-showing w-full h-full ">
          <p class="text-center text-4xl text-white text-bold welcome-text">Hello, {{playerName}}</p>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
.waiting-wrapper {
  @apply w-[100vw] h-[100vh] m-0 p-0  flex flex-col bg-[url('/src/public-page/user-play-page/components/image/background.jpg')] bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto;
}
.main-content {
  @apply w-full h-full  ;
} 
.welcome-text{
  @apply mt-[10rem];
}
</style>