<script setup lang="ts">
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBBtn, MDBCard, MDBCardBody
} from "mdb-vue-ui-kit";

import TheCommonHeader from "@/components/single-instance-components/public-component/TheCommonHeader.vue";
import { reactive } from "vue";
import { ref } from "vue";
import { Packet, ReqChangePasswordForgot, ReqVerify, ReqVerifyForgotPassword } from "@/proto/Proto";
import { WS } from "@/socket/WS";



const otpLength = 6; // Length of the OTP
const otp = reactive(Array(otpLength).fill(''));
const otpInput = ref<Array<HTMLInputElement | null>>([]);

const onInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  otp[index] = input.value;

  // Move to the next input field if there is a next field
  if (input.value && index < otpLength - 1) {
    if (otpInput.value[index + 1] !== null && otpInput.value[index + 1] !== undefined) {
      otpInput.value[index + 1]?.focus();
    }
  }
};

const onKeyDown = (event: KeyboardEvent, index: number) => {
  const input = event.target as HTMLInputElement;

  // Handle backspace to move to the previous input field
  if (event.key === 'Backspace' && !input.value && index > 0) {
    otpInput.value[index - 1]?.focus();
  }
};

const onSubmitVerifyEmail = (event: Event) => {
  const otpValue = otp.join('');
  const email = sessionStorage.getItem('email') as string;
  console.log(otpValue);
  let requestVerify = ReqVerify.create({ email: email, code: otpValue });
  console.log(requestVerify);
  let packet = Packet.create();
  packet.data = {
    oneofKind: 'reqVerify',
    reqVerify: requestVerify
  };
  console.log(packet);
  WS.send(packet);
};
const onSubmitVerifyChangePassword = (event: Event) => {
  const otpValue = otp.join('');
  const email = sessionStorage.getItem('email');
  console.log(otpValue);
  const code = otpValue;
  console.log(code);
  let requestVerifyForgotpass = ReqVerifyForgotPassword.create({ email: email, otp: code });
  console.log(requestVerifyForgotpass);
  let packet = Packet.create();
  packet.data = {
    oneofKind: 'reqVerifyForgotPassword',
    reqVerifyForgotPassword: requestVerifyForgotpass
  };
  console.log(packet);
  WS.send(packet);
  sessionStorage.removeItem('email');
};
</script>

<template>
  <MDBContainer fluid class="bg-image">
    <TheCommonHeader />
    <MDBContainer xxl class="card-container">
      <MDBCard class="col-lg-4 mx-auto">
        <MDBCardBody>
          <MDBCardTitle class="text-center"> Enter code</MDBCardTitle>
          <form>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol class="text-center">
                <input v-for="(value, index) in otp" :key="index" type="text" ref="otpInput" v-model="otp[index]"
                  @input="onInput($event, index)" @keydown="onKeyDown($event, index)" class="otp-input" />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-0 mt-3 mb-2">
              <MDBBtn color="secondary" @click="onSubmitVerifyEmail">Submit</MDBBtn>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  </MDBContainer>
</template>
<style scoped>
.bg-image {
  background: rgb(140, 202, 252);
  background: linear-gradient(90deg, rgba(140, 202, 252, 0.9623307941340599) 0%, rgba(181, 210, 245, 1) 48%, rgba(198, 237, 255, 1) 100%);
}

.card-container {
  margin-top: 15%;
  margin-bottom: 17%;
}

.otp-input {
  width: 35px;
  height: 35px;
  margin: 0 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
</style>