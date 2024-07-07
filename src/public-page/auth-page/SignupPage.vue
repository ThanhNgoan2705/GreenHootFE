<script setup lang="ts">
import {
  MDBContainer, MDBNavbar,
  MDBInput, MDBRow, MDBCol, MDBCheckbox, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBIcon, MDBNavbarNav
} from "mdb-vue-ui-kit";
import {onMounted, ref} from "vue";
import TheCommonHeader from "@/components/single-instance-components/public-component/TheCommonHeader.vue";
import {Packet, ReqRegister, ResRegister} from "@/proto/Proto";
import {WS} from "@/socket/WS";
import {AuthHandler} from "@/handler/AuthHandler";

const userName = ref('');
const password = ref('');
const email = ref('');
const checkbox3 = ref(false);
const sendRegister = (event:Event) => {
  let reqRegister = ReqRegister.create();
  event.preventDefault();
  reqRegister.username = userName.value;
  reqRegister.password = password.value;
  reqRegister.email = email.value;
  reqRegister.sponsor = '';
  reqRegister.phone = '';
  let packet = Packet.create();
  packet.data = {
    oneofKind: 'reqRegister',
    reqRegister: {username: userName.value, password: password.value, sponsor: '', phone: '',email: email.value}
  };
  console.log(packet);
  WS.send(packet);
  sessionStorage.setItem('email', email.value);
}


</script>
<template>
  <div  class="bg-image overflow-auto w-[100vw] h-[100vh]">
    <MDBNavbar expand="xxl" light bg="white" container position="top" class="w-100 ms-0 me-0">
      <TheCommonHeader/>
    </MDBNavbar>
    <div class="flex flex-col justify-center mt-5 overflow-y-auto mb-10">
      <MDBBtn class="align-content-center flex flex-row w-[6rem] h-auto border-1 mt-4" tag="a"
              style="background-color: rgb(255,255,255);">
        <MDBIcon icon="chevron-left" size="lg" ></MDBIcon>
        <router-link to="/Home">Back</router-link>
      </MDBBtn>
      <h3 class="text-center">Create an account</h3>
      <MDBCard class="col-lg-4 mx-auto ">
        <MDBCardBody>
          <MDBCardTitle class="text-center"> Sign up with your User Name</MDBCardTitle>
          <form>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <MDBInput
                    label="User name"
                    v-model="userName"
                    invalidFeedback="Please provide your Email address"
                    validFeedback="Looks good!"
                    isValid
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <MDBInput
                    label="Email"
                    v-model="email"
                    invalidFeedback="Please provide your Email address"
                    validFeedback="Looks good!"
                    isValid
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <MDBInput
                    label="Password"
                    v-model="password"
                    type="password"
                    invalidFeedback="Please provide your password"
                    validFeedback="Looks good!"
                    isValid
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol class="border-0">
                <MDBCheckbox

                    label="I wish to receive information, offers, recommendations, and updates from Green Hoot!"
                    v-model="checkbox3"
                    invalidFeedback="You must agree before submitting."
                    validFeedback="Looks good!"
                    :isValid="false"
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-0 mt-3 mb-2">
              <button class="btn-sign-up transition ease-in-out delay-150" @click="sendRegister($event)">Sign Up
              </button>
            </MDBRow>

          </form>
          <MDBRow class="g-3 mt-3 mb-2">
            <MDBBtn><img src="../../assets/img/google.svg" alt="Google" class="float-start">Continue With Google</MDBBtn>
          </MDBRow>
          <MDBRow class="g-3 mt-3 mb-2">
            <p class="text-center">Already have an account?<a role="button" class="text-primary ms-1"> <u>
              <router-link to="/SignInPage">Log In</router-link>
            </u></a></p>
            <p>
              <router-link to="/EmailVerification"> verify email</router-link>
            </p>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  </div>
</template>
<style scoped>
.bg-image {
  background: rgb(140, 202, 252);
  background: linear-gradient(90deg, rgba(140, 202, 252, 0.9623307941340599) 0%, rgba(181, 210, 245, 1) 48%, rgba(198, 237, 255, 1) 100%);
}

 .form-check {
  @apply border-0 shadow-none
}

.btn-sign-up {
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;
  background: rgb(5, 120, 3);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0px 16px 4px;
  position: relative;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>