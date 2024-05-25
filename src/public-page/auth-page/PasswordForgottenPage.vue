<script setup  lang="ts">
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardImg
} from "mdb-vue-ui-kit";
import {ref} from "vue";
import TheCommonHeader from "@/components/single-instance-components/public-component/TheCommonHeader.vue";
import {Packet, ReqForgotPassword} from "@/proto/Proto";
import {WS} from "@/socket/WS";

const emailInput = ref('');
const sendForgottenPasswordRequest = (event: Event) => {
  event.preventDefault();
  let reqForgotPassword = ReqForgotPassword.create();
  reqForgotPassword.email = emailInput.value;
  console.log("sent forgot password");
  let packet = Packet.create();
  packet.data = {oneofKind: 'reqForgotPassword', reqForgotPassword: reqForgotPassword};
  console.log(packet);
  console.log(emailInput.value);
  WS.send(packet);
}
</script>

<template>
  <div class="bg-image w-full h-full flex  overflow-auto  ">
    <TheCommonHeader/>
    <div class="card-container flex ">
      <MDBCard class="col-lg-4 card-item ">
        <MDBCardBody>
          <MDBCardTitle class="text-center"> Enter your email address to get code</MDBCardTitle>
          <img class="align-items-center m-auto d-block w-25 h-25"
               src="../../assets/icon-email.png"
               alt="..."
          />
          <p class="text-center">We will send a verification code to your email</p>
          <form>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <MDBInput
                    label="Email"
                    v-model="emailInput"
                    invalidFeedback="Please provide your Email address"
                    validFeedback="Looks good!"
                    isValid
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-0 mt-3 mb-2">
              <MDBBtn color="secondary" @click="sendForgottenPasswordRequest"><router-link to="">Send Code</router-link></MDBBtn>
            </MDBRow>
            <hr>
            <MDBRow class="g-0 mt-3 mb-2">
              <p class="text-center"><a role="button" class="text-primary ms-1"><u>
                <router-link to="/SignInPage">Back to log in</router-link>
              </u></a></p>
            </MDBRow>
          </form>

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
.card-container {
  @apply w-full  justify-center items-center
}
.card-item{
  @apply w-[30rem] h-[25rem] m-auto bg-white rounded-md p-[2.5rem]  transition-all duration-500 ease-in-out;
}
</style>