<script setup lang="ts">
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBadge,
  MDBIcon,
  MDBCollapse, MDBBtn
} from 'mdb-vue-ui-kit';
import { onMounted, ref } from "vue";
import router from "@/router";
import TheLanguageSelector from "@/components/single-instance-components/public-component/TheLanguageSelector.vue";
import { Packet, ReqRelogin } from '@/proto/Proto';
import { WS } from '@/socket/WS';

const collapse12 = ref(false);

</script>

<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarToggler
        target="#navbarTogglerDemo03"
        @click="collapse12 = !collapse12"
    ></MDBNavbarToggler>
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
    <MDBCollapse id="navbarTogglerDemo03" v-model="collapse12" class="justify-end">
      <MDBNavbarNav class="me-md-0 align-items-center right-nav w-25 d-flex ">
        <MDBNavbarItem class="fw-bold me-2" ><router-link to="/enter-pin" class="text-black font-bold">Play</router-link></MDBNavbarItem>
        <MDBNavbarItem class="me-2 ms-2">
          <MDBBtn class="align-content-center h-50 text-body-secondary" tag="a" @click="router.push('/SignupPage')"
                  style="background-color: rgb(15,116,26)">
            <router-link to="/SignupPage" style="color:white;text-decoration: none!important;">Sign Up</router-link>
          </MDBBtn>
        </MDBNavbarItem>
        <MDBNavbarItem class="fw-bold me-2 ms-2" @click="router.push('/SignInPage')">
          <button  style="color:black" @click="">Log In</button>
        </MDBNavbarItem>
        <MDBNavbarItem class="ms-lg-3 mb-lg-0">
          <TheLanguageSelector/>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>

<style scoped>

</style>