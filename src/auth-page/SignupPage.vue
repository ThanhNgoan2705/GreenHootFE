<script setup>
import {
  MDBContainer, MDBNavbar,
  MDBNavbarBrand,
  MDBInput, MDBRow, MDBCol, MDBCheckbox, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBIcon, MDBNavbarNav
} from "mdb-vue-ui-kit";
import {ref} from "vue";
import TheCommonHeader from "@/components/single-instance-components/public-component/TheCommonHeader.vue";
const input1 = ref('');
const input2 = ref('');
const checkbox3 = ref(false);
</script>
<template>
  <MDBContainer fluid class="bg-image">
    <MDBNavbar expand="xxl" light bg="white" container position="top" class="w-100 ms-0 me-0">
     <TheCommonHeader/>
      <MDBNavbarNav right>
        <Dropdown v-model="selectedLanguage" :options="languages" dropdown-icon="globe" option-label="name" placeholder="code" class="border-0">
          <template #dropdownicon>
            <i class="pi pi-globe" style="font-size: 1rem;color:black"></i>
          </template>
        </Dropdown>
      </MDBNavbarNav>
    </MDBNavbar>
    <MDBContainer sm class="justify-content-center mt-5">
      <MDBBtn class="align-content-center h-50 border-1 mt-4" tag="a"
              style="background-color: rgb(255,255,255);">
        <MDBIcon icon="chevron-left" size="lg" class="m-1"></MDBIcon>
        <router-link to="/Home">Back</router-link>
      </MDBBtn>
      <h3 class="text-center">Create an account</h3>
      <MDBCard  class="col-lg-4 m-auto ">
        <MDBCardBody>
          <MDBCardTitle class="text-center"> Sign up with your email</MDBCardTitle>
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
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <MDBInput
                    label="Last name"
                    v-model="input2"
                    invalidFeedback="Please provide your password"
                    validFeedback="Looks good!"
                    isValid
                    required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-0 mt-3 mb-2">
                <MDBBtn color="secondary" type="submit" >Sign Up</MDBBtn>
            </MDBRow>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
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
          </form>
          <MDBRow class="g-3 mt-3 mb-2">
            <MDBBtn > <img src="../assets/google.svg" alt="Google" class="float-start">Continue With Google</MDBBtn>
          </MDBRow>
          <MDBRow class="g-3 mt-3 mb-2">
            <p class="text-center">Already have an account?<a role="button" class="text-primary ms-1"> <u><router-link to="/SignInPage">Log In</router-link></u></a></p>
            <p ><router-link to="/EmailVerification"> verify email</router-link></p>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  </MDBContainer>
</template>
<style scoped>
.bg-image{
  background: rgb(140,202,252);
  background: linear-gradient(90deg, rgba(140,202,252,0.9623307941340599) 0%, rgba(181,210,245,1) 48%, rgba(198,237,255,1) 100%);
}
</style>