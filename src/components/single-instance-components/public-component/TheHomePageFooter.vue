<script setup lang="ts">
import { MDBFooter, MDBIcon, MDBContainer, MDBRow, MDBCol } from 'mdb-vue-ui-kit';
</script>

<template>
  <!-- Footer -->
  <MDBFooter :text="['center', 'lg-start', 'muted']" class="shadow-2xl">
    <!-- Section: Social media -->
    <section class="
        d-flex
        justify-content-center justify-content-lg-between
        p-4
        border-bottom
      ">
      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <!-- Left -->
      <!-- Right -->
      <div>
        <a href="" class="me-4 text-reset">
          <MDBIcon iconStyle="fab" icon="facebook-f"></MDBIcon>
        </a>
        <a href="" class="me-4 text-reset">
          <MDBIcon iconStyle="fab" icon="twitter"></MDBIcon>
        </a>
        <a href="" class="me-4 text-reset">
          <MDBIcon iconStyle="fab" icon="google"></MDBIcon>
        </a>
        <a href="" class="me-4 text-reset">
          <MDBIcon iconStyle="fab" icon="instagram"></MDBIcon>
        </a>
        <a href="" class="me-4 text-reset">
          <MDBIcon iconStyle="fab" icon="linkedin"></MDBIcon>
        </a>
        <a href="" class="me-4 text-reset">
          <MDBIcon iconStyle="fab" icon="github"></MDBIcon>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
    <!-- Section: Links  -->
    <section class="">
      <MDBContainer class="text-center text-md-start mt-5">
        <!-- Grid row -->
        <MDBRow class="mt-3">
          <!-- Grid column -->
          <MDBCol md="3" lg="4" xl="3" class="mx-auto mb-4">
            <!-- Content -->
            <div class="content-center">
              <img
                  src="../logo/green.png"
                  height="38"
                  width="150"
                  alt=""
                  loading="lazy"
                  class="m-auto"
              />
            </div>
            <p>
              Here you can start your creative projects, build your own lessons, and share them with your students.
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol md="2" lg="2" xl="2" class="mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Products</h6>
             <p>
                <a href="#!" class="text-reset">Greenhoots</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Tests</a>
              </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol md="3" lg="2" xl="2" class="mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
            <p>
              <a href="#!" class="text-reset">Pricing</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Settings</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Orders</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Help</a>
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol md="4" lg="3" xl="3" class="mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i class="fas fa-home me-3"></i> GreenTea, Faculty of Information Technology, Nong Lam University, Thu Duc, Ho Chi Minh City
            </p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              greenteafitnlu@gmail.com
            </p>
            <p>
              <MDBIcon icon="phone" class="me-3" /> + 01 234 567 88
            </p>
            <p>
              <MDBIcon icon="print" class="me-3" /> + 01 234 567 89
            </p>
          </MDBCol>
          <!-- Grid column -->
        </MDBRow>
        <!-- Grid row -->
      </MDBContainer>
    </section>
    <!-- Section: Links  -->
    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05)">
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    <!-- Copyright -->
  </MDBFooter>
  <!-- Footer -->
</template>

<style scoped>

</style>