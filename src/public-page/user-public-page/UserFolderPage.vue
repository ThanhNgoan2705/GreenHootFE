<script setup lang="ts">
import TheHeader from "@/public-page/user-public-page/components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";
import {
  MDBRow, MDBCol,
  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBListGroup,
  MDBListGroupItem, MDBContainer
} from 'mdb-vue-ui-kit';
import CardGreenHoot from "@/public-page/user-public-page/components/greenhot-component/CardGreenHoot.vue";
import {useUserStore} from "@/states/UserStore";
import {onMounted, onUnmounted, ref} from "vue";

const userStore = useUserStore();
const token = userStore.token;
const user = userStore.user;
console.log("token" + token);
console.log("user" + user);
const isMobile = ref(window.innerWidth <= 767);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 767;
}
updateIsMobile();
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
})
</script>
<template>
  <MDBContainer fluid class="m-0 p-0">
    <div class="main-page w-full  ">
      <TheMenuSideBar />
      <div class="right-main-contain "
           style="--main-element-scrollbar-width: 16px">
        <TheHeader/>
        <main class="content-container">
          <div class="content-inside content-page flex flex-wrap lg:flex-nowrap xl:flex-nowrap">
            <!--         left-content-->
            <div  class="sm:w-full md:w-full lg:w-[25%] xl:w-[25%] px-2">
              <MDBCard class="w-full info-card ">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol class="col-md-10">
                      <MDBBtn tag="a" outline="secondary" size="sm">
                        Add name
                        <MDBIcon icon="plus" class="me-2"></MDBIcon>
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol class="col-md-7">
                      <p>{{ user?.username }}</p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow class="m-auto bg-color">
                    <MDBCol class="col-md-7">
                      Your interests
                    </MDBCol>
                    <MDBCol class="col-md-5">
                      <a role="button" class="link-underline-light">
                        Add
                      </a>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow class="m-auto mt-2 bg-color text-center h-50">
                    <h5>Verified profile
                      <MDBIcon icon="info-circle" height="5px" width="5px"/>
                    </h5>
                    <p>Apply for your verified profile today!</p>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </div>
            <!--         center-content-->
            <div  class="sm:w-full md:w-full lg:w-[50%] xl:w-[50%] px-2 ">
              <MDBRow class="flex flex-row">
                <MDBCol class="col-md-6" v-for="(item,index) in 2" :key="index">
                  <component class="main-card" :is="CardGreenHoot"/>
                </MDBCol>
              </MDBRow>
            </div>
            <!--         right-content-->
            <div class=" sm:w-full md:w-full lg:w-[25%] xl:w-[25%] px-2">
              <MDBCard class="create-box">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol class="col-md-10">
                      <h5>Your Kahoot</h5>
                    </MDBCol>
                  </MDBRow>
                  <MDBCard>
                    <MDBRow class="greenHot-card">
                      <MDBCol md="4">
                        <img src="../image/placeholder-cover-kahoot.png" alt="placeCover" class="w-100 h-100 rounded-3">
                        <div class="question-card">
                          <p class="mb-lg-0"><span class="me-1">2</span>Questions</p>
                        </div>
                      </MDBCol>
                      <MDBCol md="8" class="g-info">
                        <a href="#" class="title-gh"><span>GreenHoot name</span></a>
                        <div class="gh-info mx-1">
                          <span class="author-name">Chan chan</span>
                          <span class="player-number">2 players</span>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                  <MDBRow class="m-auto mt-2 bg-color text-center h-75">
                    <p>Start creating your own GreenHoots using one of our templates</p>
                    <button class="m-auto h-50 w-50 start-button">Create GreenHoot</button>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBCard class="mt-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol class="col-md-10">
                      <h5>Latest ReportStore</h5>
                    </MDBCol>
                  </MDBRow>
                  <MDBListGroup light>
                    <MDBListGroupItem>
                      <div>
                        <img src="https://picsum.photos/200/300/?image=25" class="greenhot-icon" alt="Image"/>
                        <p>View all</p>
                      </div>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <div>
                        <h5>Recent Kahoots</h5>
                        <p>View all</p>
                      </div>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  </MDBContainer>
</template>
<style scoped>
.main-page {
  display: flex;
  box-sizing: border-box;

}
.right-main-contain {
  @apply flex w-full flex-col max-h-[svh] h-[calc(0rem+100vh)] overflow-hidden relative
}
.content-container{
  @apply overflow-auto flex-[1_1_0%]
}

.content-inside {
  @apply box-border min-w-0 my-0 mx-auto w-full max-w-[1280px] flex-nowrap h-fit
}

.content-page {
  @apply pt-[2rem] pb-[5rem] bg-gray-50 z-[2]
}
.ifo-container-left {
  @apply box-border min-w-0 w-full my-0 mx-[16px] flex-[1_1_auto]
}

.main-content {
  @apply box-border my-0 mx-[1rem] min-w-0 w-full flex-[1_1_auto]
}
.list-room-right {
  @apply box-border min-w-0 w-full my-0 mx-[16px] flex-[1_1_auto]
}
@media  screen and (min-width: 1280px){
  .content-page{
    @apply overflow-auto flex flex-row
  }
  .ifo-container-left{
    @apply w-[310px] m-0 flex-[0_0_auto]
  }
  .main-content{
    @apply w-full
  }
  .list-room-right{
    @apply w-[310px] m-0
  }

}
/* For devices with screen width greater than 1100px */
@media screen and (min-width: 1100px) {

  .ifo-container-left {
    @apply w-[308px] m-0 flex-[0_0_auto]
  }
  .list-room-right{
    @apply w-[308px] my-0 ms-[16px] me-0
  }
  .main-content{
    @apply w-full
  }
}
@media screen and (min-width: 768px) {
  .ifo-container-left{
    @apply w-[308px] my-0 ms-[16px] me-0 flex-[0_0_auto]
  }
  .main-content{
    @apply w-full
  }
  .list-room-right{
    @apply w-[308px] m-0 flex-[0_0_auto]
  }
}

/* For devices with screen width less than 768px */
@media screen and (min-width: 375px) {
  .ifo-container-left{
    @apply w-full my-0 ms-[16px] me-0 flex-[1_1_auto]
  }
  .list-room-right{
    @apply w-full my-0 ms-[16px] me-0 flex-[1_1_auto]
  }
  .content-page {
    box-sizing: border-box;
    flex-wrap: wrap;
    min-width: 0;
    width: 100%;
  }

  .info-card {
    width: 100%;
  }

  .main-content {
    width: 100%;
    flex-wrap: wrap;
  }

  .main-card {
    width: 100%;
    height: auto;
  }
}

.greenHot-card {
  padding: 8px 16px;
  height: 75px;
}

.bg-color {
  background-color: rgb(242, 242, 242);
}

.title-gh span {
  font-size: 16px;
  font-weight: 500;
}

.title-gh {
  text-decoration: none;
  color: #000;
}

.g-info a {
  padding: 0;
  font-size: 12px;
}

.gh-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.author-name, .player-number {
  font-size: 12px;
  color: #000;
  font-weight: 500;
}

.question-card {
  position: absolute;
  bottom: 1px;
  left: 2px;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  padding: 1.5px 8px;
  background-color: rgba(51, 51, 51, 0.8);
  border-radius: 3px;
}

.greenhot-icon {
  width: 10%;
  height: auto;
  border-radius: 3px;
}
</style>@/stores/UserStore