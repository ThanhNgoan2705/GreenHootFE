<script setup lang="ts">
import TheHomePageHeader from "@/components/single-instance-components/public-component/TheHomePageHeader.vue";
</script>
<template>
  <TheHomePageHeader v-if="$route.meta.showHeader"/>
  <router-view :key="$route.fullPath"/>
</template>
<style scoped>
</style>
