<script setup lang="ts">
import {
  MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBBtn, MDBCardImg
} from 'mdb-vue-ui-kit';
import { ref} from 'vue';
import TheHomePageFooter from "@/components/single-instance-components/public-component/TheHomePageFooter.vue";
import IconAware from "@/components/icons/IconAware.vue";
import IconStream from "@/components/icons/IconStream.vue";
const cardItems = ref([
  {
    id: 1,
    title: 'For Teacher',
    text: 'We glad to help you to find the best place for your team to enjoy your lessons and take a rest.',
    img: './creativeIcon.png',
    icon: IconAware
  },
  {
    id: 2,
    title: 'For Students',
    text: 'Hope you will find the best place for your team to study make more friends and enjoy your time.',
    img: './study.png',
    icon: IconStream
  },
])


</script>
<template>
  <div class="overflow-auto w-[100vw] max-h-[100vh] p-3 m-1">
    <div class="w-full max-h-full h-auto flex justify-between content-wrap items-center">
      <div class="w-full flex items-stretch card-wrap">
        <div v-for="(item,index) in cardItems" :key="index" class=" w-full m-1 h-full md:flex-col ">

          <MDBCard class="shadow-5 w-full">
            <a v-mdb-ripple="{ color: 'light' }">
              <MDBCardImg :src="item.img" top alt="..."/>
            </a>
            <MDBCardBody>
              <MDBCardTitle class="flex flex-row justify-between">
                <div class="flex justify-start">
                  <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                </div>
                <div class="flex justify-end ">
                  <component :is="item.icon" class="w-10 h-10"/>
                </div>
              </MDBCardTitle>

              <MDBCardText>
                {{ item.text }}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
      <div class="w-full">
        <div class="grid gap-[3.75rem] grid-cols-1  justify-between">
          <div class="max-w-md mx-1 my-2 bg-white rounded-xl overflow-hidden md:max-w-2xl shadow-2xl">
            <div class="md:flex">
              <div class="md:shrink-0">
                <img class="h-48 w-full object-cover md:h-full md:w-48 sm:max-w-32 img-fluid img-intro" src="/greenhoticon.png"
                     alt="Modern building architecture">
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">FOR HIGHER SCHOOL</div>
                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Engaging
                  group
                  and distance learning for teachers and students.</a>
                <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and
                  take in
                  some sunshine? We have a list of places to do just that.</p>
              </div>
            </div>
          </div>
          <div class="max-w-md mx-1 my-2 bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
            <div class="md:flex">
              <div class="md:shrink-0 ">
                <img class="h-48 w-full object-cover md:h-full md:w-48  img-fluid img-intro" src="/greenhoticon.png"
                     alt="Modern building architecture">
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">FOR PROFESSIONAL</div>
                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible
                  accommodation for your team</a>
                <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and
                  take in
                  some sunshine? We have a list of places to do just that.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheHomePageFooter/>
  </div>

</template>
<style scoped>
.img-intro{
  object-fit: cover;
}
@media  (max-width: 768px){
  .card-wrap{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  .content-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
}
</style>@/stores/UserStore