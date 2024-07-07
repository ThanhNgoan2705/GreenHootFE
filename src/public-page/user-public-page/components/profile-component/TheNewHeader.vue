<template>
  <MDBNavbar expand="lg" light bg="light" container class="nav-container">
    <MDBNavbarNav class="mb-2 mb-lg-0 nav-search ">
      <MDBNavbarToggler
          target="#navbarSide"
          :aria-expanded="collapse14"
          @click="collapse14 = !collapse14"
      ></MDBNavbarToggler>
      <MDBNavbarItem class="nav-brand">
        <MDBNavbarBrand href="#">
          <img
              src="../../../../components/single-instance-components/logo/green.png"
              alt=""
              loading="lazy"
              class="w-[150px] h-[50px]"
          />
        </MDBNavbarBrand>
      </MDBNavbarItem>
      <MDBNavbarItem>
        <TheSearch/>
      </MDBNavbarItem>
      <MDBCollapse id="navbarSide" v-model="collapse14">
        <!-- Search form -->
         <TheMenuSideBar />
        <!-- Search form -->
      </MDBCollapse>
    </MDBNavbarNav>
    <MDBNavbarNav class=" me-0 nav-action">
      <MDBNavbarItem to="#">
        <button  class="create-button start-button block   ">
          <router-link to="/GreenHootCreativePage" class="text-white">Create</router-link>
        </button>
        <button class="icon-start start-button hidden" >
        <MDBIcon  icon="plus" size="xl"></MDBIcon>
        </button>
      </MDBNavbarItem>
      <MDBNavbarItem to="#">
        <MDBIcon icon="bell" size="lg"></MDBIcon>
        <MDBBadge pill notification badge="danger">12</MDBBadge>
      </MDBNavbarItem>
      <MDBNavbarItem>
        <!-- Navbar dropdown -->
        <MDBDropdown v-model="dropdown10" class="nav-item">
          <MDBDropdownToggle
              tag="a"
              class="nav-link"
              @click="dropdown10 = !dropdown10"
          >
             <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                class="rounded-circle me-[2rem] w-[35px] h-[35px]"
                height="22"
                alt=""
                loading="lazy"
            />

          </MDBDropdownToggle>
          <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
            <MDBDropdownItem href="#">Action</MDBDropdownItem>
            <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
            <MDBDropdownItem href="#"
            >Something else here</MDBDropdownItem
            >
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavbarItem>
    </MDBNavbarNav>
  </MDBNavbar>
</template>

<script setup lang="ts">
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBBadge,
  MDBInput,
  MDBCollapse, MDBCol,
} from 'mdb-vue-ui-kit';
import {onMounted, onUnmounted, ref} from "vue";
import TheSearch from "@/public-page/user-public-page/components/profile-component/TheSearch.vue";
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";

const collapse14 = ref(false);
const dropdown10 = ref(false);
const isMobile = ref(window.innerWidth <= 499);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 499;
}
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
})
</script>
<style scoped>
.dropdown-toggle::after {
  content: none;
}
.nav-container{
  @apply w-full justify-between h-[56px] content-center items-center
}

.nav-brand img {
  @apply w-[150px] h-[50px]
}
.navbar-nav.nav-action,.nav-search{
  @apply flex flex-row my-auto justify-end items-center content-center space-x-4
}
.nav-action{
  @apply me-0 !important;
}
.dropdown-toggle::after {
  content: none;
}
/* Extra small devices (phones, 500px and down) */
@media only screen and (max-width: 639px) {
  .create-button{
    @apply hidden;
  }
  .icon-start{
    @apply block;
  }
  /* Icon 1 */
  .animated-icon1 {
    width: 28px;
    height: 28px;
    position: relative;
    margin: 5px;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;
  }
  .animated-icon1 span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
  }

  .animated-icon1 span {
    background: #2d7ef7;
  }

  .animated-icon1 span:nth-child(1) {
    top: 0px;
  }

  .animated-icon1 span:nth-child(2) {
    top: 10px;
  }

  .animated-icon1 span:nth-child(3) {
    top: 20px;
  }

  .animated-icon1.open span:nth-child(1) {
    top: 11px;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  .animated-icon1.open span:nth-child(2) {
    opacity: 0;
    left: -60px;
  }

  .animated-icon1.open span:nth-child(3) {
    top: 11px;
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  .toggle-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    outline: none;
  }


}
/* Medium devices (landscape tablets, 768px and up) */
@media (min-width: 500px) and  (max-width: 899px) {

}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media  (min-width:900px) and (max-width: 1200px) {

}
@media  only screen and (min-width:1201px) {

}
</style>