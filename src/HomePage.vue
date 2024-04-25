<script setup>
import TheHomePageHeader from "@/components/single-instance-components/public-component/TheHomePageHeader.vue";
</script>
<template>
  <TheHomePageHeader v-if="$route.meta.showHeader"/>
</template>

<style scoped>

</style>