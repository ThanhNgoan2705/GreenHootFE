<script setup  lang="ts">
import TheHeader from "@/public-page/user-public-page/components/profile-component/TheHeader.vue";
import {
  MDBTabs,
  MDBTabNav,
  MDBTabItem,
  MDBTabContent,
  MDBTabPane,
  MDBContainer,
  MDBCardTitle,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from 'mdb-vue-ui-kit';
import TheMenuSideBar from "@/public-page/user-public-page/components/profile-component/TheMenuSideBar.vue";
import {ref} from 'vue';

const activeTabId5 = ref('ex5-1');
const language = ref([
  {value: '1', text: 'English'},
  {value: '2', text: 'Vietnamese'},
  {value: '3', text: 'Japanese'},
  {value: '4', text: 'Korean'},
])
const types = ref([
  {value: '1', text: 'Teacher'},
  {value: '2', text: 'Student'},
  {value: '3', text: 'Parent'},
])
const isChecked = ref(true);
import {useUserStore} from "@/states/UserStore";
import { Packet, ReqChangePassword } from "@/proto/Proto";
import { WS } from "@/socket/WS";

const userStore = useUserStore();
const token = userStore.user?.token;
const userName = userStore.user?.username;
const phoneNumber = userStore.user?.phone;
const userEmail = userStore.user?.email;

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


const sendReqChangePassword = (event: Event) => {
   event.preventDefault();
   oldPassword.value = oldPassword.value.trim();
    newPassword.value = newPassword.value.trim();
    confirmPassword.value = confirmPassword.value.trim();
    if (newPassword.value !== confirmPassword.value) {
      alert('New password and confirm password do not match');
      return;
    }
   let reqChangePass = ReqChangePassword.create({oldPassword: oldPassword.value, newPassword: newPassword.value});
   console.log(reqChangePass);
   let packet = Packet.create();
    packet.data = {
      oneofKind: 'reqChangePassword',
      reqChangePassword: reqChangePass
    };
    console.log(packet);
    WS.send(packet);
}
const handleButtonSave = (event: Event) => {
  event.preventDefault();
  console.log('Save');
}
const imageUrl = ref('');

const uploadImage = (event: Event) => {
  event.preventDefault();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    // Create an instance of FormData
    const formData = new FormData();
    // Append the file to the formData object
    formData.append('file', file);
    fetch('http://localhost:8080/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID',
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        imageUrl.value = data;
        console.log(data);
      });
  };
  input.click();
}
</script>

<template>
  <MDBContainer fluid class="user-home-page">
    <TheHeader/>
    <MDBContainer fluid class="user-home-page_content d-inline-flex ">
      <MDBContainer class="w-100 ">
        <div class="w-100 my-lg-4">
          <h3 class="ms-4">Settings</h3>
        </div>
        <MDBTabs v-model="activeTabId5">
          <!-- Tabs navs -->
          <MDBTabNav tabsClasses="mb-3" class="list-tab">
            <MDBTabItem class="custom-tab" tabId="ex5-1" href="ex5-1">
              Edit profile
            </MDBTabItem>
            <MDBTabItem class="custom-tab" tabId="ex5-2" href="ex5-2">
              Privacy
            </MDBTabItem>
            <MDBTabItem class="custom-tab" tabId="ex5-3" href="ex5-3">
              Change Password
            </MDBTabItem>
          </MDBTabNav>
          <!-- Tabs navs -->
          <!-- Tabs content -->
          <MDBTabContent>
            <MDBTabPane tabId="ex5-1">
              <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <MDBCard>
                      <MDBCardBody>
                        <div class="title-box align-items-center">
                          <MDBCardTitle>User Information</MDBCardTitle>
                        </div>
                        <div>
                          <MDBRow>
                            <MDBCol col="4">
                              <button @click="uploadImage" >
                                <img :src="imageUrl" class="img-fluid mt-3"
                                alt="..."/>
                                <span class="d-block text-center mt-2 upload-image">Change Image</span>
                              </button>
                             
                                   
                            </MDBCol>
                            <MDBCol col="8">
                              <label for="username" class="fw-bold">UserName</label>
                              <input type="text"
                                     id="username"
                                      v-model="userName"
                                     class=" form-control mt-1 mb-3"/>
                              <label for="Name" class="fw-bold">Phone</label>
                              <input type="text"
                                     id="phone"
                                      v-model="phoneNumber"
                                     class="form-control mt-1 mb-3"/>
                              <label for="email" class="fw-bold">Email</label>
                              <input type="email"
                                     id="email"
                                      v-model="userEmail"
                                     class="form-control mt-1 mb-3"/>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <div>
                              <h5 class="fs-6">Verified Profile</h5>
                              <p>
                                <MDBIcon icon="info-circle" size="2x" class="me-2"/>
                                Apply for your verified profile today
                              </p>
                            </div>
                          </MDBRow>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard>
                      <MDBCardBody>
                        <div class="title-box align-items-center">
                          <MDBCardTitle>Account Detail</MDBCardTitle>
                        </div>
                        <MDBRow>
                          <MDBCol class="col-md-6">
                            <label for="school">Organization</label>
                            <input type="text" id="school" class="form-control"/>
                          </MDBCol>
                          <MDBCol class="col-md-6">
                            <label for="language">Language</label>
                            <select id="language" class="form-select">
                              <option v-for="item in language" :value="item.value">{{ item.text }}</option>
                            </select>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow class="my-3">
                          <MDBCol class="col-md-6">
                            <label for="account-type">Account types</label>
                            <select id="account-type" class="form-select" disabled>
                              <option v-for="item in types" :value="item.value">{{ item.text }}</option>
                            </select>
                          </MDBCol>
                          <MDBCol class="col-md-6">
                            <label for="work-place">Type of workplace</label>
                            <select id="work-place" class="form-select" disabled>
                              <option v-for="item in types" :value="item.value">{{ item.text }}</option>
                            </select>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                    <div class="mt-lg-4">
                      <router-link to="">
                        <a class="text-danger link-underline-danger fw-bold ">Delete account</a>
                      </router-link>
                      <p class="fw-lighter fs-6">If you delete your account, you'll lose access to all the GreenHoots
                        you created.</p>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="ex5-2">
              <MDBContainer>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBCard>
                      <MDBCardBody>
                        <div class="title-box align-items-center">
                          <MDBCardTitle>Notifications</MDBCardTitle>
                        </div>
                        <MDBRow>
                          <h5>Email me when someone:</h5>
                        </MDBRow>
                        <MDBRow class="list-checkbox">
                          <div class="form-check">
                            <h5 class="fs-6 m-1">Shares a kahoot with you</h5>
                            <label class="switch">
                              <input type="checkbox" :aria-checked="isChecked" @click="isChecked = !isChecked">
                              <span class="slider"></span>
                            </label>
                          </div>
                        </MDBRow>
                        <MDBRow class="list-checkbox">
                          <div class="form-check">
                            <h5 class="fs-6 m-1">Features your kahoot to other users</h5>
                            <label class="switch">
                              <input type="checkbox" :aria-checked="isChecked" @click="isChecked = !isChecked">
                              <span class="slider"></span>
                            </label>
                          </div>
                        </MDBRow>
                        <MDBRow class="list-checkbox">
                          <div class="form-check">
                            <h5 class="fs-6 m-1">Shares your kahoot with other users</h5>
                            <label class="switch">
                              <input type="checkbox" :aria-checked="isChecked" @click="isChecked = !isChecked">
                              <span class="slider"></span>
                            </label>
                          </div>
                        </MDBRow>
                        <MDBRow class="list-checkbox">
                          <div class="form-check">
                            <h5 class="fs-6 m-1">Favorites your kahoot</h5>
                            <label class="switch">
                              <input type="checkbox" :aria-checked="isChecked" @click="isChecked = !isChecked">
                              <span class="slider"></span>
                            </label>
                          </div>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol col="6">
                    <MDBCard class="d-flex flex-column mb-2">
                      <MDBCardBody>
                        <div class="title-box align-items-center">
                          <MDBCardTitle>Privacy</MDBCardTitle>
                        </div>
                        <MDBRow class="pri-box d-flex flex-row ">
                          <div class="form-check">
                            <div class="content-box w-75">
                              <h5 class="fs-6 m-1 me-5">I have read and agree with the Kahoot! <router-link to="">terms and conditions</router-link> and
                               <router-link to="">privacy policy</router-link>  and agree to Kahoot! collecting and processing my personal data as
                                described in the privacy policy.</h5>
                            </div>
                            <label class="switch">
                              <input type="checkbox" disabled >
                              <span class="slider"><MDBIcon icon="lock" size="sm" class=" icon-lock"/></span>
                            </label>
                            </div>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="ex5-3">
              <MDBContainer>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBCard>
                      <MDBCardBody>
                        <div class="title-box align-items-center">
                          <MDBCardTitle>Change Password</MDBCardTitle>
                        </div>
                        <MDBRow>
                          <MDBCol class="col-md-6">
                            <label for="current-password">Current Password</label>
                            <div class="input-icon-container">
                              <input type="password" 
                              v-model="oldPassword"
                              id="current-password" class="form-control"/>
                              <MDBIcon icon="eye" class="input-icon"/>
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol class="col-md-6">
                            <label for="new-password">New Password</label>
                            <div class="input-icon-container">
                              <input type="password"
                              v-model="newPassword"
                               id="new-password" class="form-control"/>
                              <MDBIcon icon="eye" class="input-icon"/>
                            </div>
                          </MDBCol>
                          <MDBCol class="col-md-6">
                            <label for="confirm-password">Confirm Password</label>
                            <div class="input-icon-container">
                              <input type="password" 
                              v-model="confirmPassword"
                              id="confirm-password" class="form-control"/>
                              <MDBIcon icon="eye" class="input-icon"/>
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow class="my-3">
                          <MDBCol class="col-md-6">
                            <MDBBtn color="primary" class="save-btn " @click="sendReqChangePassword">Save</MDBBtn>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="ex5-4">Tab 4 content</MDBTabPane>
          </MDBTabContent>
          <!-- Tabs content -->
        </MDBTabs>
      </MDBContainer>
    </MDBContainer>
  </MDBContainer>
</template>

<style>
.list-tab .custom-tab {
  text-decoration: none;
  text-transform: none;
  color: rgb(110, 110, 110);
  font-weight: bold;
  font-size: 1rem;
  border: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.title-box {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.save-btn[disabled] {
  min-height: 32px;
  padding-bottom: 0px;
  background-color: rgb(204, 204, 204);
  color: rgb(255, 255, 255);
  box-shadow: none;
  cursor: not-allowed;
}

.save-btn {
  width: initial;
  margin: 0px;
  border: 0px;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  background: rgb(38, 137, 12);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 32px;
  min-height: 32px;
  padding: 0px 16px 4px;
  position: relative;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.input-icon-container {
  position: relative;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.form-check {
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  border: 1px solid rgb(242, 242, 242);
  padding: 2px 10px;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.25s ease-in 0s;
  display: flex;
  justify-content: space-between;
}

.content-box {
  box-sizing: border-box;
  min-width: 0;
  margin: 0.5rem;
}
.switch {
  position: relative;
  display: inline-block;
  width: 10%;
  height: 25px;
  margin: 0 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 2.5px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #0f741a;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
.list-checkbox {
  margin-top: 10px;
  height: 50px;
}
.icon-lock{
  display: inline-block;
  position: absolute;
  top: 45%;
  transition: inset-inline-start 0.125s ease-out 0s;
  inset-inline-start: 7px;
}
.upload-image{
  @apply text-center text-gray-500 text-sm mt-2 mb-3 
}
</style>