<script setup lang="ts">
import TheHeader from "@/components/single-instance-components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/components/single-instance-components/profile-component/TheMenuSideBar.vue";
import {userStore} from '@/stores/Auth';
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdb-vue-ui-kit"; // Import the exported store
const user = userStore(); // Create a reactive reference to the store
</script>
<template>
  <div class="main max-h-full max-w-full flex">
    <TheHeader/>
    <TheMenuSideBar/>
    <div class="user-home-page overflow-auto">
      <MDBContainer class="w-100 content-container">
        <!--         left-content-->
        <MDBRow>
          <MDBCol col="2" class="container-left mt-lg-4 p-0">
            <div class="position-fixed link-container">
              <router-link class="router-link" to="">
               <span class="fa-fw icon-span">
                 <svg viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"
                      aria-labelledby="label-f6fbb85f-143d-4c0a-a37c-0d0bd1c30349" aria-hidden="true"
                      class="icon-svg"><title id="label-f6fbb85f-143d-4c0a-a37c-0d0bd1c30349">Icon</title><path
                     d="M10,20.6c0-0.9,0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6S10,21.5,10,20.6z M11.5,9.8l-2,3.2h4  L11.5,9.8z M26,9v14c0,1.7-1.3,3-3,3H9c-1.7,0-3-1.3-3-3V9c0-1.7,1.3-3,3-3h14C24.7,6,26,7.3,26,9z M15,17H8v6c0,0.6,0.4,1,1,1h6V17  z M15,8H9C8.4,8,8,8.4,8,9v6h7V8z M24,17h-7v7h6c0.6,0,1-0.4,1-1V17z M24,9c0-0.6-0.4-1-1-1h-6v7h7V9z M22,19h-3v3h3V19z M18.5,11.5  l2,2l2-2l-2-2L18.5,11.5z"
                     style="fill: rgb(110, 110, 110);"></path></svg>
                </span>
                GreenHoot
              </router-link>
              <router-link class="router-link" to="">
                   <span class="fa-fw icon-span">
              <svg viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"
                   aria-labelledby="label-95173dc8-5a9e-4989-803e-13117fefbb46" aria-hidden="true"
                   class="icon-svg"><title id="label-95173dc8-5a9e-4989-803e-13117fefbb46">Icon</title><path
                  d="M8.89977 6.09998H21.4148V4.09998H8.89977V6.09998ZM6.77877 9.61398H23.5368V7.61398H6.77877V9.61398ZM18.821 22.6205L17.984 26.2915C17.9744 26.3316 17.9731 26.3721 17.9718 26.4127C17.9707 26.4439 17.9697 26.4752 17.965 26.5065H5.33997C4.78797 26.5065 4.33997 26.0595 4.33997 25.5065V12.4025C4.33997 11.8505 4.78797 11.4025 5.33997 11.4025H24.971C25.522 11.4025 25.969 11.8495 25.971 12.3995L25.975 13.5555C25.201 13.1855 24.338 12.9715 23.424 12.9715C20.153 12.9715 17.491 15.6335 17.491 18.9055C17.491 20.2635 17.966 21.5705 18.821 22.6205Z M23.4253 21.2817C22.1133 21.2817 21.0493 20.2187 21.0493 18.9057C21.0493 17.5937 22.1133 16.5297 23.4253 16.5297C24.7373 16.5297 25.8013 17.5937 25.8013 18.9057C25.8013 20.2187 24.7373 21.2817 23.4253 21.2817ZM26.1683 22.1037C27.0733 21.3267 27.6593 20.1887 27.6593 18.9057C27.6593 16.5707 25.7593 14.6717 23.4243 14.6717C21.0893 14.6717 19.1903 16.5707 19.1903 18.9057C19.1903 20.1897 19.7773 21.3277 20.6823 22.1047L19.6413 26.6697C19.5583 27.0347 19.6853 27.4147 19.9703 27.6557C20.1543 27.8107 20.3833 27.8917 20.6153 27.8917C20.7443 27.8917 20.8743 27.8667 20.9973 27.8157L23.4253 26.8117L25.8513 27.8157C26.1983 27.9587 26.5933 27.8967 26.8793 27.6557C27.1643 27.4147 27.2913 27.0347 27.2083 26.6697L26.1683 22.1037Z"
                  style="fill: rgb(110, 110, 110);"></path></svg>
                </span>
                Courses
              </router-link>
              <router-link class="router-link" to="">
                <MDBIcon icon="useUserStore-circle" size="lg" class="me-3 grey-color"/>
                Folder
                <MDBIcon icon="plus" size="sm" class="ms-5 grey-color"/>
              </router-link>
            </div>
            <!-- Sidenav-->
          </MDBCol>
          <MDBCol col="10" class="main-content">
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  </div>
</template>
<style>
.user-home-page {
  @apply max-h-full max-w-full m-0 p-0 flex flex-col items-center justify-center;
}

.content-container {
  box-sizing: border-box;
  min-width: 0;
  margin: 0 auto;
  width: 100%;
  max-width: unset;
  flex-wrap: nowrap;
  height: fit-content;
}

.container-left {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  flex: 0 0 auto;
  background-color: rgb(255, 255, 255);
  min-height: calc(-56px + 100vh);
  max-height: 100%;
  overflow-y: auto;
  border-right: 1px solid rgb(233, 233, 233);
}

.link-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.router-link {
  height: 40px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
}

.icon-span {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}

.icon-span svg {
  display: block;
  margin: 0px auto;
}

.icon-svg {
  pointer-events: none;
}

.link-container .router-link {
  color: rgb(110, 110, 110);
  text-decoration: none;
  cursor: pointer;
}

.router-link:hover {
  background-color: rgb(192, 191, 191);
}

.router-link {
  padding: 0 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

</style>