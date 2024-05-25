<script setup lang="ts">
import {MDBCard, MDBCardImg, MDBCardBody, MDBCardText,MDBCardFooter,MDBBtn,MDBCardTitle} from 'mdb-vue-ui-kit';
import {ref} from "vue";

</script>

<template>
<MDBCard class="card-container">
  <MDBCardImg src="https://images-cdn.kahoot.it/da8021ec-6b44-48b6-adf5-51c37c75a8fd" alt="Card image cap" top />
  <MDBCardBody class="card-bd">
    <MDBCardTitle class="card-title">The History</MDBCardTitle>
    <p class="text-muted">Study</p>
    <MDBCardText>
      <small class="text-muted">Last updated 3 mins ago</small>
    </MDBCardText>
    <MDBCardFooter class="align-items-center bg-white">
      <button  class="w-100 m-auto start-button" @click="hostRoom()">Start</button>
    </MDBCardFooter>
  </MDBCardBody>
</MDBCard>
</template>

<style>
.card-container{
  width: 48%;
  margin: 0;
  padding: 0;
  box-shadow: none;
}
.start-button{
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;
  background: rgb(19, 104, 206);
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
.card-bd{
  padding: 0.5rem;
}
.bg-white{
  background-color: rgb(255, 255, 255);
}
</style>