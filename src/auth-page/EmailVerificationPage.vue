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

const input1 = ref('');
</script>

<template>
  <MDBContainer fluid class="bg-image">
    <TheCommonHeader/>
    <MDBContainer xxl class="card-container">
      <MDBCard class="col-lg-4 mx-auto">
        <MDBCardBody>
          <MDBCardTitle class="text-center"> Verify your email to Continue</MDBCardTitle>
          <img class="align-items-center m-auto d-block w-25 h-25"
               src="../assets/icon-email.png"
               alt="..."
          />
          <p class="text-center">We will send a verification code to your email</p>
          <form>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <MDBInput
                    label="Email"
                    v-model="input1"
                    invalidFeedback="Please provide your Email address"
                    validFeedback="Looks good!"
                    isValid
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-0 mt-3 mb-2">
              <MDBBtn color="secondary" type="submit">Send Code</MDBBtn>
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
.card-container{
  width:100%;
  margin-top: 10%;
  margin-bottom: 15%;
}
</style>