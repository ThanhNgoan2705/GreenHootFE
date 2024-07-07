<script setup lang="ts">
import {
  MDBBadge,
  MDBBtn,
  MDBCol, MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,

  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,

} from 'mdb-vue-ui-kit';
import { onMounted, onUnmounted, ref } from 'vue';
import { Packet, ReqLogout } from "@/proto/Proto";
import { WS } from "@/socket/WS";
import TheSearch from "@/public-page/user-public-page/components/profile-component/TheSearch.vue";
import { useUserStore } from "@/states/UserStore";
import router from "@/router";
import { showWarningAlert } from '@/service/Alert';
const dropdown6 = ref(false);
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
const collapse9 = ref(false);
const sendLogOut = (event: Event) => {
  event.preventDefault();
  let packet = Packet.create();
  packet.data = { oneofKind: 'reqLogout', reqLogout: ReqLogout.create() };
  WS.send(packet);
  console.log("send logout");
}
const sidebarItem = ref([
  {
    name: 'Home',
    icon: 'home',
    link: '/UserHomePage',
  },
  {
    name: 'Library',
    icon: 'list-ul',
    link: '/UserLibraryPage',
  },
  {
    name: 'Folder',
    icon: 'folder',
    link: '/UserFolderPage',
  },
  {
    name: 'Reports',
    icon: 'chart-bar',
    link: '/UserReportsPage',
  },
]);
const activeLink = ref(sidebarItem.value[0].link);
const isActive = ref(false);
const setActiveLink = (name: string) => {
  activeLink.value = sidebarItem.value.find((item) => item.name === name)?.link || '';
  isActive.value = true;
  console.log(activeLink.value);
};
const dropdown10 = ref(false);
const user = useUserStore().user;
const userToken = sessionStorage.getItem('auth-token');
const checkTokenHandler = () => {
  return userToken !== null;
}
const handleJoinRoom = () => {
  if (!checkTokenHandler) {
    showWarningAlert("Please login to play game");
    router.push('/Home');
    return;
  }
  router.push('/enter-pin');
}

</script>
<template>
  <div class="pb-[65px] nav-container">
    <header class="base-top-bar">
      <MDBNavbar expand="xl" light bg="white" position="top" class=" navbar-main ">
        <MDBNavbarNav v-if="isMobile">
          <button @click="collapse9 = !collapse9" class="navbar-toggler toggle-btn my-auto" :aria-expanded="collapse9"
            aria-label="Toggle navigation" aria-controls="navbarToggleExternalContent9">
            <div class="animated-icon1" :class="[collapse9 && 'open']">
              <span></span><span></span><span></span>
            </div>
          </button>
        </MDBNavbarNav>
        <div v-if="checkTokenHandler" class="nav-brand cursor-pointer">
          <MDBNavbarBrand @click="router.push('/UserHomepage')">
            <img src="../../../../components/single-instance-components/logo/green.png" height="50" width="150" alt=""
              loading="lazy" />
          </MDBNavbarBrand>

        </div>
        <div v-else class="nav-brand">
          <MDBNavbarBrand @click="router.push('/Home')" class="cursor-pointer">
            <img src="../../../../components/single-instance-components/logo/green.png" height="50" width="150" alt=""
              loading="lazy" />
          </MDBNavbarBrand>
        </div>
        <div v-if="!isMobile" class="nav-search  ">
          <TheSearch />
        </div>
        <div v-if="!isMobile" class="right-action">
          <MDBNavbarItem class="w-full ">
            <button v-if="!isMobile" class="create-button start-button ">
              <router-link to="/enter-pin" class="text-white" @click="handleJoinRoom">Play</router-link>
            </button>
            <router-link v-else to="/enter-pin" >
              <MDBIcon icon="gamepad" class="icon-btn text-xl text-white"></MDBIcon>
            </router-link>
          </MDBNavbarItem>
          <MDBNavbarItem class="w-full ">
            <button v-if="!isMobile" class="create-button start-button">
              <router-link to="/GreenHootCreativePage" class="text-white">Create</router-link>
            </button>
            <router-link v-else to="/GreenHootCreativePage">
              <MDBIcon icon="plus" class="icon-btn text-xl text-white"></MDBIcon>
            </router-link>
          </MDBNavbarItem>

          <!-- Avatar -->
          <MDBNavbarItem>
            <MDBDropdown align="lg-end" class="nav-item" v-model="dropdown6">
              <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown6 = !dropdown6">
                <img src="../../../image/bear.jpg"
                  class="rounded-circle me-[2rem] w-[35px] h-[35px]" alt="" loading="lazy" />
              </MDBDropdownToggle>
              <MDBDropdownMenu class="user-manager" :animation="false">
                <MDBDropdownItem class="action-dropdown d-inline-flex">
                  <MDBIcon icon="useUserStore-circle" size="lg" class="m-1" style="color: darkgreen" />
                  {{ user?.username}}
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>
                  <router-link to="/UserProfilePage" class="action-dropdown">Profile</router-link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <router-link to="/UserSettingsPage" class="action-dropdown">Setting</router-link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <router-link to="/Home" @click="sendLogOut" class="action-dropdown" style="color: red">
                    <MDBIcon icon="sign-out-alt" size="lg" class="me-1" />
                    Log out
                  </router-link>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
          <!-- Badge -->
          <MDBNavbarItem to="#">
            <MDBIcon icon="bell" size="xl" class="text-black"></MDBIcon>
            <MDBBadge pill notification badge="danger">12</MDBBadge>
          </MDBNavbarItem>
        </div>
        <div v-else class="right-action">
          <MDBNavbarItem>
            <MDBIcon icon="bell" size="lg" class="text-black"></MDBIcon>
            <MDBBadge pill notification badge="danger">12</MDBBadge>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBDropdown v-model="dropdown10" class="nav-item">
              <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown10 = !dropdown10">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                  class="rounded-circle me-[2rem] w-[35px] h-[35px]" alt="" loading="lazy" />

              </MDBDropdownToggle>
              <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
                <MDBDropdownItem href="#">Action</MDBDropdownItem>
                <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
        </div>
      </MDBNavbar>
      <MDBCollapse v-model="collapse9" id="navbarToggleExternalContent9">
        <div class="menu-sidebar__content" height="338">
          <div class="sidebar-container">
            <ul class="list-sidebar-item">
              <div v-for="item in sidebarItem" :key="item.name" class="item-container">
                <router-link :to="item.link" class="sidebar-item" @click="setActiveLink(item.name)"
                  :class="{ active: activeLink === item.link }"
                  :aria-current="activeLink === item.name ? 'page' : undefined">
                  <span class="sidebar-icon text-center content-center">
                    <MDBIcon :icon="item.icon" size="xl" class="my-auto  " />
                  </span>
                  <div class="sidebar-title  " :class="isActive ? 'color-white' : 'color-black'">{{
                    item.name
                  }}
                  </div>
                </router-link>
              </div>
            </ul>
          </div>
        </div>
      </MDBCollapse>
    </header>
  </div>
</template>

<style scoped>
.base-top-bar {
  @apply fixed left-0 right-0 z-[145]
}

.navbar-main {
  @apply h-[64px] px-[2.5rem] flex items-center justify-between shadow-none border-b border-solid border-gray-200
}

.nav-brand {
  @apply flex items-center content-center
}

.nav-search {
  @apply w-auto flex text-black relative sm:relative sm:w-auto sm:me-[13px] md:w-auto md:relative xl:w-[447px] xl:absolute xl:left-1/3
}

.right-action {
  @apply flex justify-end mx-3 my-0 gap-[12px] items-center relative
}

.right-action .nav-item {
  @apply flex items-center
}

.create-button {
  @apply w-full transition ease-in-out delay-150 bg-blue-500 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300
}

.user-manager {
  transform: translate3d(40px, 60px, 0px);
}

.dropdown-toggle::after {
  content: none;
}

.action-dropdown {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 40px;
  padding: 1rem 1rem;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  color: rgb(51, 51, 51);
}

.dropdown-toggle::after {
  content: none;
}

/* Extra small devices (phones, 500px and down) */
@media only screen and (max-width: 499px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media (min-width: 500px) and (max-width: 899px) {
  .icon-btn {
    @apply block
  }

  .base-top-bar {
    @apply fixed left-0 right-0 z-[145]
  }

  .nav-brand {
    @apply flex items-center content-center
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

  .dropdown-toggle::after {
    content: none;
  }
}
</style>