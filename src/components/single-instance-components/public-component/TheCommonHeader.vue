<script setup  lang="ts">
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav} from "mdb-vue-ui-kit";
import TheLanguageSelector from "@/components/single-instance-components/public-component/TheLanguageSelector.vue";
</script>
<template>
  <MDBNavbar expand="xxl" light bg="white" container position="top" class="w-100 ms-0 me-0">
    <MDBNavbarBrand href="/Home">
      <img
          src="../logo/green.png"
          height="38"
          width="150"
          alt=""
          loading="lazy"
      />
    </MDBNavbarBrand>
    <MDBNavbarNav right>
      <TheLanguageSelector/>
    </MDBNavbarNav>
  </MDBNavbar>
</template>
<style scoped>
</style>