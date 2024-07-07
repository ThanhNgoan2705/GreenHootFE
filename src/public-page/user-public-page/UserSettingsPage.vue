<script setup lang="ts">
import TheHeader from "@/public-page/user-public-page/components/profile-component/TheHeader.vue";
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";
import {useUserStore} from "@/states/UserStore";
import {onMounted, onUnmounted, ref} from "vue";
import {MDBBadge, MDBTable, MDBBtn, MDBContainer} from "mdb-vue-ui-kit";
const userStore = useUserStore();
const token = userStore.user;
const user = userStore.token;
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
        <div class="main-page w-full ">
          <main class="d-inline-flex w-full  right-main-contain "
                style="--main-element-scrollbar-width: 16px">
            <div class="content-page w-full h-fit content-inside flex  bg-gray-100">
              <MDBTable class="align-middle mb-0 bg-white">
                <thead class="bg-light">
                <tr>
                  <th>Exam</th>
                  <th>Author </th>
                  <th>Players Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style="width: 45px; height: 45px"
                           class="rounded-circle" />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">John Doe</p>
                        <p class="text-muted mb-0">john.doe@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Software engineer</p>
                    <p class="text-muted mb-0">IT department</p>
                  </td>
                  <td>
                    <MDBBadge badge="success" pill class="d-inline">Active</MDBBadge>
                  </td>
                  <td>Senior</td>
                  <td>
                    <MDBBtn color="link" size="sm" rounded>
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" class="rounded-circle" alt=""
                           style="width: 45px; height: 45px" />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Alex Ray</p>
                        <p class="text-muted mb-0">alex.ray@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Consultant</p>
                    <p class="text-muted mb-0">Finance</p>
                  </td>
                  <td>
                    <MDBBadge badge="primary" pill class="d-inline">Onboarding</MDBBadge>
                  </td>
                  <td>Junior</td>
                  <td>
                    <MDBBtn color="link" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }">
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" class="rounded-circle" alt=""
                           style="width: 45px; height: 45px" />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Kate Hunington</p>
                        <p class="text-muted mb-0">kate.hunington@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Designer</p>
                    <p class="text-muted mb-0">UI/UX</p>
                  </td>
                  <td>
                    <MDBBadge badge="warning" pill class="d-inline">Awaiting</MDBBadge>
                  </td>
                  <td>Senior</td>
                  <td>
                    <MDBBtn color="link" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }">
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
                </tbody>
              </MDBTable>
            </div>
          </main>
        </div>
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

.content-inside {
  @apply box-border min-w-0 my-0 mx-auto w-full max-w-[1280px] flex-nowrap h-fit
}

.content-page {
  @apply pb-[5rem] bg-gray-50 z-[2]
}

.main-content {
  @apply box-border my-0 mx-[1rem] min-w-0 w-full flex-[1_1_auto]
}
.main-page {
  display: flex;
  box-sizing: border-box;

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
.link-container{
  box-sizing: border-box;
  margin-top:0;
  min-width: 0;
  flex: 0 0 auto;
  width: 224px;
  background-color: rgb(255, 255, 255);
  padding: 0 0 40px;
  min-height: calc(-56px + 100vh);
  max-height: 100%;
  position: fixed;
  overflow-y: auto;
  border-right: 1px solid rgb(233, 233, 233);
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
.container-left, .main-content {
  box-sizing: border-box;
  margin-right: 5px;
  min-width: 0;
}


/* For devices with screen width greater than 1100px */
@media screen and (min-width: 1100px) {
  .ifo-container-left, .list-room-right {
    width: 350px;
    margin: 0 0 0 13px;
    flex: 0 0 auto;
  }
  .main-content {
    width: 600px;
    margin: 0 16px;
    flex: 1 1 auto;
  }
}

/* For devices with screen width between 768px and 1100px */
@media screen and (min-width: 768px) and (max-width: 1100px) {
  .container-left {
    width: 250px;
    margin: 0;
    flex: 0 0 auto;
  }
  .main-content {
    width: 100%;
    margin: 0 16px;
    flex: 1 1 auto;
  }
}

/* For devices with screen width less than 768px */
@media screen and (max-width: 768px) {
  .container-left {
    width: 100px;
    margin: 0;
    flex: 1 1 auto;
  }
  .main-content {
    width: 100%;
    margin: 0 16px;
    flex: 1 1 auto;
  }
}
.container-left{
  width: 224px;
  margin: 0;
  flex: 0 0 auto;

}


.title-gh span {
  font-size: 16px;
  font-weight: 500;
}

.g-info a {
  padding: 0;
  font-size: 12px;
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

</style>@/stores/UserStore