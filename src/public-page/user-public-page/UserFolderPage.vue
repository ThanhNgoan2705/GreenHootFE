<script setup lang="ts">
import TheHeader from "@/components/single-instance-components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/components/single-instance-components/profile-component/TheMenuSideBar.vue";
import {
  MDBRow, MDBCol,
  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBListGroup,
  MDBListGroupItem
} from 'mdb-vue-ui-kit';
import CardGreenHoot from "@/public-page/user-common-component/CardGreenHoot.vue";
import {userStore} from '@/stores/Auth'; // Import the exported store
const user = userStore(); // Create a reactive reference to the store
</script>
<template>
  <div class="main max-h-full max-w-full flex">
    <TheHeader/>
    <TheMenuSideBar/>
    <div class="user-home-page overflow-auto">
      <div class="main-page max-w-full ">
        <div class="d-inline-flex  right-main-contain ms-[5rem]  overflow-auto"
             style="--main-element-scrollbar-width: 16px">
          <div class="content-page content-inside flex justify-between mt-[7rem] me-2rem">
            <!--         left-content-->
            <div class="ifo-container-left w-1/5 ">
              <MDBCard class="w-100 info-card ">
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
                      <p>{{ user.getUserInfo().name }} </p>
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
            <div class="main-content w-1/2">
              <div class="d-flex justify-content-between">
                <CardGreenHoot/>
                <CardGreenHoot/>
              </div>
            </div>
            <!--         right-content-->
            <div class="list-room-right w-1/4">
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
                      <h5>Latest Reports</h5>
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
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.user-home-page {
  @apply max-h-full max-w-full m-0 p-0 flex flex-col items-center justify-center;
}

.main-page {
  display: flex;
  box-sizing: border-box;

}

.right-main-contain {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-height: 100svh;
  overflow: hidden;
  position: relative;
  background-color: rgb(250, 250, 250);
}

.content-inside {
  display: flex;
  background-color: rgb(250, 250, 250);
  min-height: 100vh;
  z-index: 2;
}

.content-page {
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
  max-width: 1280px;
  flex-wrap: nowrap;
  height: fit-content;
}

.ifo-container-left, .main-content, .list-room-right {
  box-sizing: border-box;
  margin-right: 5px;
  min-width: 0;
}

@media screen and (min-width: 1100px) {
  .ifo-container-left {
    width: 350px;
    margin: 0 0 0 13px;
    flex: 0 0 auto;
  }
}

@media screen and (min-width: 768px) {
  .ifo-container-left {
    width: 350px;
    margin: 0 0 0 13px;
    flex: 0 0 auto;
  }
}

@media screen and (min-width: 375px) {
  .ifo-container-left {
    width: 100%;
    margin: 0 13px;
    flex: 1 1 auto;
  }
}

@media screen and (min-width: 1100px) {
  .main-content {
    width: 400px;
    margin: 0 16px;
    flex: 1 1 auto;
  }
}

@media screen and (min-width: 768px) {
  .main-content {
    width: 100%;
    margin: 0 16px;
    flex: 1 1 auto;
  }
}

@media screen and (min-width: 375px) {
  .main-content {
    width: 100%;
    margin: 0 16px;
    flex: 1 1 auto;
  }
}

@media screen and (min-width: 1100px) {
  .list-room-right {
    width: 350px;
    margin: 0 16px 0 0;
    flex: 0 0 auto;
  }
}

@media screen and (min-width: 768px) {
  .list-room-right {
    width: 250px;
    margin: 0;
    flex: 0 0 auto;
  }
}

@media screen and (min-width: 375px) {
  .list-room-right {
    width: 100%;
    margin: 0;
    flex: 1 1 auto;
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
</style>