<script setup  lang="ts">
import router from "@/router/index";
import {
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
} from "mdb-vue-ui-kit";
import { ref} from "vue";
import TheLanguageSelector from "@/components/single-instance-components/public-component/TheLanguageSelector.vue";
const navList = ref([
  {name: 'School', link: 'School.vue'},
  {name: 'Work', link: 'Work.vue'},
  {name: 'Home', link: 'Home.vue'},
  {name: 'Study', link: 'Study.vue'},
]);
router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  next();
});

</script>
<template>
  <header>
    <MDBNavbar expand="lg" light bg="white" container position="sticky" class="p-md-1">
      <MDBNavbarNav class="float-md-start align-items-center left-nav w-50">
        <MDBNavbarBrand class="mt-1" href="#">
          <img
              src="../logo/green.png"
              height="38"
              width="150"
              alt=""
              loading="lazy"
          />
        </MDBNavbarBrand>
        <MDBBtn class="align-content-center page-header btn-wrap h-50 mt-2 " tag="a" color="primary" href="#!"
                style="background-color: rgb(5,87,181);">
          <MDBIcon icon="newspaper" size="lg"></MDBIcon>
          News
        </MDBBtn>
        <MDBNavbarItem v-for="(li, index) in navList" :key="index" :to="li.link" link class="fw-bold mt-2">{{li.name}}</MDBNavbarItem>
      </MDBNavbarNav>
      <MDBNavbarNav class="me-md-0 align-items-center right-nav w-25 d-flex ">
        <MDBNavbarItem class="fw-bold me-2" ><router-link to="/enter-pin" class="text-black font-bold">Play</router-link></MDBNavbarItem>
        <MDBNavbarItem class="me-2 ms-2">
          <MDBBtn class="align-content-center h-50 text-body-secondary" tag="a" @click="router.push('/SignupPage')"
                  style="background-color: rgb(15,116,26)">
            <router-link to="/SignupPage" style="color:white;text-decoration: none!important;">Sign Up</router-link>
          </MDBBtn>
        </MDBNavbarItem>
        <MDBNavbarItem class="fw-bold me-2 ms-2" @click="router.push('/SignInPage')">
          <router-link to="/SignInPage" style="color:black">Log In</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem class="ms-lg-3 mb-lg-0">
        <TheLanguageSelector/>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBNavbar>
  </header>
</template>
<style scoped>
.page-header {
  background-color: #1368CE;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.page-header.btn-wrap {
  font-size: .875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: #fff;
  font-weight: 600;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  display: inline-block;
  top: -0.05rem;
  position: relative;
  text-align: center;
}
</style>