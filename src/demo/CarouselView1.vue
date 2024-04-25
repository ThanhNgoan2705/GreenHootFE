<script setup>
import {MDBCarousel, MDBBtn} from "mdb-vue-ui-kit";
import {useCarouselStore} from "@/components/stores/CarouselStore.js";
const carouselStore = useCarouselStore();
</script>

<template>
  <div class="text-center">
    <MDBBtn
        rounded
        color="primary"
        class="mb-3"
        @click="carouselStore.increment()"
    >Increase counter from View 1</MDBBtn
    >
  </div>
  <div class="position-relative">
    <h2
        class="text-center position-absolute left-0 top-0 ms-3 mt-3 text-white"
        style="z-index: 10"
    >
      view 1 - item id <span>{{ carouselStore.carousel }}</span> - counter
      <span>{{ carouselStore.counter }}</span>
    </h2>
    <MDBCarousel
        v-model="carouselStore.carousel"
        :items="carouselStore.CarouselData"
        fade
    />
  </div>
</template>

<style scoped>

</style>