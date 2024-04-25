<script setup>
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBBtn, MDBCard, MDBCardBody, MDBCardImg
} from "mdb-vue-ui-kit";
import {ref} from "vue";
import TheCommonHeader from "@/components/single-instance-components/public-component/TheCommonHeader.vue";

const value = ref(null);
</script>

<template>
  <MDBContainer fluid class="bg-image">
    <TheCommonHeader/>
    <MDBContainer xxl class="card-container">
      <MDBCard class="col-lg-4 mx-auto">
        <MDBCardBody>
          <MDBCardTitle class="text-center"> Enter code</MDBCardTitle>
          <form>
            <MDBRow class="g-3 mt-3 mb-2">
              <MDBCol>
                <InputOtp
                    class="mx-5"
                    :numInputs="6"
                    v-model="value"
                    :length="6"
                    integer-only
                    :inputStyle="{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                  backgroundColor: '#fff',
                  color: '#495057'
                }"
                    :focusStyle="{
                  borderColor: '#80bdff',
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
                }"
                    :disabledStyle="{
                  backgroundColor: '#e9ecef'
                }"
                    :errorStyle="{
                  borderColor: '#dc3545',
                  backgroundColor: '#f8d7da'
                }"
                />
              </MDBCol>
            </MDBRow>
            <MDBRow class="g-0 mt-3 mb-2">
              <MDBBtn color="secondary" type="submit">Submit</MDBBtn>
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
</style>