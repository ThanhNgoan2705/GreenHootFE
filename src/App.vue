<script setup lang="ts">
import TheHomePageHeader from "@/components/single-instance-components/public-component/TheHomePageHeader.vue";
import { Packet, ReqRelogin } from "@/proto/Proto";
import { WS } from "@/socket/WS";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
// import Relogin  from "@/service/AuthRelogin";
// const router = useRouter();
// onMounted(async () => {
//   const isAuthenticated = await Relogin();
//   if (!isAuthenticated) {
//     router.push('/SignInpage');
//   }
//   console.log(WS.me().ws.readyState+"sdadsdsdsd")
// });



</script>
<template>
  <TheHomePageHeader v-if="$route.meta.showHeader"/>
  <router-view :key="$route.fullPath"/>
</template>
<style scoped>
</style>
