<script setup>
import {onBeforeMount, getCurrentInstance,ref} from "vue";
  const openPopup = ref(false);
  const togglePopup = () => {
    openPopup.value = !openPopup.value;
  };
  openPopup;
  togglePopup;
</script>

<template>
  <div class="popup-container p-1">
    <div class="popup-content">
      <div class="d-flex justify-content-between">
        <div class = "dialog_title flex p-2 m-0 text-center ">
          <h1 class="text-xl font-bold text-gray-900">
            Create new Green Hoot
          </h1>
        </div>
      </div>
      <div class=" list-button ">
        <div class="button-container d-flex justify-content-between grid gap-3.5 p-10">
          <div class="flow mx-10  option-blank flex justify-center">
            <button class="button-template ">
              <div class = "align-items-center  icon bg-blue-500 ">
                <MDBIcon icon="file-alt" size="xl" style="color:white"/>
              </div>
              <div class="text-center">
                <h1 class="text-lg font-bold">Templates </h1>
                <div class="text-sm font-normal text-gray-500">Create a kahoot from scratch</div>
              </div>
            </button>
          </div>
          <div class=" flow mx-10  option-template flex justify-center">
            <button class="button-template ">
              <div class = "align-items-center icon">
                <MDBIcon icon="plus" size="xl"/>
              </div>
              <div class="text-center">
                <h1 class="text-lg font-bold">Blank Canvas</h1>
                <div class="text-sm font-normal text-gray-500">Create a kahoot from scratch</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class ="dialog-action">
                <span class="button-close">
                  <button class="btn-cls" @click="togglePopup">Close</button>
                </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.popup-container{
  display: inline-block;
  text-align: start;
  top: 0;
  cursor: default;
  outline: 0;
  vertical-align: middle;
  width: 100%;
  height: 100%;
}
.popup-content {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  animation: auto ease 0s 1 normal none running;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  overflow: hidden auto;
}
@media (min-width: 600px) {
  .popup-content {
    max-width: 95vw;
    max-height: 95vh;
    width: 58.5rem;
    height: 29.5rem;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (min-width: 600px)
@media (min-width: 600px) {
  .popup-content {
    animation: 0.2s ease 0s 1 normal forwards running ZwfxJ;
  }
}


@keyframes ZwfxJ {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.dialog_title {
  @apply bg-white  p-2 m-0 text-center
}
.dialog-action{
  @apply flex justify-center w-full p-2.5 m-0 text-center
}
.list-button{
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
  background: rgb(242, 242, 242);
  padding: 0;
  scroll-behavior: smooth;
}

.button-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
}
@media (max-width: 500px) {
  .button-container {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
.option-template , .option-blank{
  height: 232px;
  width: 200px;
  border-radius: 0.5rem;
  background-color: rgb(255, 255, 255);
  padding: 0px;
  cursor: pointer;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
}
.icon{
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  background: rgb(242, 242, 242);
  color: rgb(0, 0, 0);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 48px;
  min-height: 48px;
  height: 48px;
  padding: 0px 16px 4px;
  line-height: 48px;
  position: relative;
}
.dialog-action{
  width: calc(100% - 48px);
}
.button-template .icon{
  @apply bg-blue-500 text-white
}
.button-close{
  @apply flex justify-center w-full p-1.5 m-0 text-center
}
.btn-cls{
  @apply bg-white text-black font-bold py-2 px-4 rounded border border-black hover:bg-black hover:text-white hover:border-transparent transition ease-in-out delay-150 duration-300
}

</style>