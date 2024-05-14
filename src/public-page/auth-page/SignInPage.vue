<script setup lang="ts">
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-vue-ui-kit";
import {ref} from "vue";
import TheCommonHeader from "@/components/single-instance-components/public-component/TheCommonHeader.vue";
import router from "@/router";
import {googleAuthCodeLogin} from "vue3-google-login"
import {Packet,ReqLogin} from "@/proto/Proto";
import {WS} from "@/socket/WS";

const login = () => {
  googleAuthCodeLogin().then((response) => {
    console.log("Handle the response", response)
  })
}
const userNameInput = ref('');
const passwordInput = ref('');

const sendLogInAccount=()=>{
  let reqLogin = ReqLogin.create();
  console.log(userNameInput.value);
  console.log(passwordInput.value);
  reqLogin.username = userNameInput.value;
  reqLogin.password = passwordInput.value;
  let packet = Packet.create();
  packet.data = {oneofKind: 'reqLogin', reqLogin: {username: userNameInput.value, password: passwordInput.value}};
  WS.send(packet);
}
</script>
<template>
  <MDBContainer fluid class="bg-image ">
    <TheCommonHeader/>
    <MDBCard class="col-lg-4 mt-xl-5 p-3 m-auto ">
      <MDBCardBody class="">
        <MDBCardTitle class="text-center"> Log in</MDBCardTitle>
        <form>
          <MDBRow class="g-3 mt-3 mb-2">
            <MDBCol>
              <MDBInput
                  label="userName"
                  v-model="userNameInput"
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
                  v-model="passwordInput"
                  invalidFeedback="Please provide your password"
                  validFeedback="Looks good!"
                  type="password"
                  isValid
                  required
              />
            </MDBCol>
          </MDBRow>
          <MDBRow class="g-0 mt-3 mb-2">
            <MDBBtn color="secondary" type="submit" @click="sendLogInAccount()">Log In</MDBBtn>
          </MDBRow>

        </form>
        <MDBRow class="g-3 mt-3 mb-2">
          <p class="text-center">Forgot Password?<a role="button" class="text-primary ms-1"><router-link to="/PasswordForgottenPage">Reset your
            password</router-link></a></p>
        </MDBRow>
        <MDBRow class="g-0 mt-3 mb-2">
          <MDBBtn @click="login"><img src="../../assets/google.svg" alt="Google" class="float-start">Continue With Google
          </MDBBtn>

        </MDBRow>
        <MDBRow class="g-3 mt-3 mb-2">
          <p class="text-center">Don't have an account?<a role="button" class="text-primary ms-1"><u>
            <router-link to="/SignupPage">Sign Up</router-link>
          </u></a></p>
        </MDBRow>

      </MDBCardBody>
    </MDBCard>
    <p class="text-center mt-3">By continuing, you agree to Green Hoot's <a role="button" class="text-primary ms-1"><u>Terms
      of Service</u></a> and <a role="button" class="text-primary ms-1"><u>Privacy Policy</u></a></p>
  </MDBContainer>
</template>
<style scoped>
.bg-image {
  background: rgb(140, 202, 252);
  background: linear-gradient(90deg, rgba(140, 202, 252, 0.9623307941340599) 0%, rgba(181, 210, 245, 1) 48%, rgba(198, 237, 255, 1) 100%);
}
</style>