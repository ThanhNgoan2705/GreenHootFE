<script setup>
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBIcon,
} from 'mdb-vue-ui-kit';
import {PhotoIcon} from "@heroicons/vue/16/solid/index.js";
import {ref} from "vue";

const openPopup = ref(false);
const togglePopup = () => {
  openPopup.value = !openPopup.value;
}
</script>
<template>
  <header>
    <div class="base-top-bar" style="height:65px">
      <MDBNavbar expand="xl" light bg="white" container position="top" class="nav-container flex">
        <MDBNavbarNav>
          <MDBNavbarBrand href="#">
            <img
                src="../logo/green.png"
                height="50"
                width="150"
                alt=""
                loading="lazy"
            />
          </MDBNavbarBrand>
        </MDBNavbarNav>
        <MDBNavbarNav class="w-2/3">
          <button class="button-setting justify-between" @click="togglePopup">
            <span class="setting-title m-0 "> Enter GreenHoot Title...</span>
            <span class="setting-btn-container w-1/3 border-black bg-gray-400 ">
                <span class="st-btn">Settings</span>
              </span>
          </button>
        </MDBNavbarNav>
        <MDBNavbarNav class="flex justify-between mr-auto mb-lg-0">
          <MDBNavbarItem>
            <button class="flex flex-auto align-items-center whitespace-nowrap my-0 ms-4 px-8 theme-button">
              <MDBIcon fas icon="palette"/>
              Themes
            </button>
          </MDBNavbarItem>
          <div class="flex justify-content-center align-items-center my-0 mx-2.5">
            <div class="bg-gray-400 h-3/4 " style="width:1px"></div>
          </div>
          <MDBNavbarItem>
            <button class="block shadow-gray-400 action-btn exit-btn"> Exit</button>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <button class=" block shadow-gray-600 action-btn save-btn"> Save</button>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBNavbar>
    </div>
  </header>
  <div v-if="openPopup" class="popup ">
    <div class="popup-container p-1">
      <div class="greenhoot-sumary">
        <div class="d-flex justify-content-between">
          <div class="dialog_title flex p-2 m-0 text-center ">
            <h1 class="text-xl font-bold text-gray-900">
              GreenHoot Summary
            </h1>
          </div>
        </div>
        <div class=" summary-form">
          <form class=" grid grid-cols-12 gap-4">
            <div class=" col-start-1 col-end-8 border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-8 ">
                  <label for="last-name" class="block text-sm  font-bold leading-6 text-black">Title</label>
                  <div class="mt-2">
                    <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                           placeholder="Enter GreenHoot Title..."
                           class="block w-full h-10 rounded-md border border-dashed border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
                </div>
                <div class="sm:col-span-8">
                  <label for="about" class="block text-sm font-medium leading-6 text-gray-900"><b>Description</b>(
                    Optional)</label>
                  <div class="mt-2">
                    <textarea id="about" name="about" rows="3"
                              class="block w-full rounded-md border border-dashed border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Pro tip: a good description will help other users find your GreenHoot.</p>
                </div>
              </div>
              <div class="mt-2 grid grids-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-8">
                  <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Save to</label>
                    <button id="save-to" name="save-to" rows="8"
                            class=" button-add  justify-between">
                      <span class="setting-title m-0 text-gray-400">Yours Folders</span>
                      <span class=" btn-sv mx-1 text-sm leading-6 text-gray-600">Change</span>
                    </button>
                </div>
              </div>
            </div>
            <div class=" col-start-8 col-span-5 ">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-8">
              <label for="cover-photo" class="block text-sm font-bold leading-6 text-gray-900">Cover photo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
                </div>
                <div class="sm:col-span-8 mt-6">
                  <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Language</label>
                  <div class="mt-1">
                    <select id="languages" name="languages" autocomplete="languages"
                            class="block w-full rounded-md border border-dashed border-gray-900/25 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-10">
                      <option>English</option>
                      <option>VietNamese</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="dialog-action ">
          <button class="btn-cls" @click="togglePopup">Cancel</button>
          <button class="btn-done" @click="togglePopup">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-setting,.button-add {
  height: 40px;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px;
  cursor: pointer;
  overflow: hidden;
  width: 45%;
  max-width: 320px;
  border: 1px solid rgb(204, 204, 204);
}
.button-add{
  width: 100%;
  max-width: 100%;
}
.btn-sv{
  background: rgb(19, 104, 206);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 32px;
  min-height: 32px;
  height: 32px;
  padding: 0px 16px 4px;
  line-height: 32px;
  position: relative;
}

.setting-title {
  padding-left: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

.setting-title {
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.2px;
  color: rgb(110, 110, 110);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 1rem;
}

@media (min-width: 768px) {
  .setting-title {
    font-size: 1rem;
  }
}

.setting-btn-container {
  display: inline-block;
  margin-left: 12px;
  margin-right: 0.25rem;
  border-radius: 4px;
  background-color: rgb(242, 242, 242);
  transition: background-color 0.5s ease 0s;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  color: rgb(51, 51, 51);
}

@media (min-width: 768px) {
  .setting-btn-container {
    padding: 7px 13px;
  }
}

.popup {
  display: block;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
  text-align: center;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.popup-container {
  display: inline-block;
  text-align: start;
  top: 0px;
  cursor: default;
  outline: 0px;
  vertical-align: middle;
}

.greenhoot-sumary {
  width: 100%;
  height: 100%;
  border-radius: 0px;
  animation: auto ease 0s 1 normal none running;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  overflow: hidden auto;
}

@media (min-width: 600px) {
  .greenhoot-sumary {
    max-width: 95vw;
    max-height: 95vh;
    width: 800px;
    height: auto;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 600px)

@media (min-width: 600px) {
  .greenhoot-sumary {
    animation: 0.2s ease 0s 1 normal forwards running ZwfxJ;
  }
}

.summary-form {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 0px 24px;
}

.dialog-action {
  width: calc(100% - 48px);
  flex: 0 0 auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 20px;
}

.dialog-action button {
  min-width: 7.5rem;
  margin: 0px 4px;
}

.btn-cls {
  width: initial;
  margin: 0px;
  border: 0px;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;
  background: rgb(242, 242, 242);
  color: rgb(0, 0, 0);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0px 16px 4px;
  position: relative;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.btn-done {
  width: initial;
  margin: 0;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;
  background: rgb(38, 137, 12);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0px 16px 4px;
  position: relative;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.theme-button {
  width: initial;
  margin: 0;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  background: rgb(19, 104, 206);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  height: 42px;
  padding: 0 16px 4px;
  line-height: 42px;
  position: relative;
}

.action-btn {
  width: initial;
  margin: 0 4px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  background: rgb(242, 242, 242);
  color: rgb(51, 51, 51);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  height: 42px;
  padding: 0 16px 4px;
  line-height: 42px;
  position: relative;
}

.action-btn.exit-btn {
  background: rgb(255, 255, 255);
  color: rgb(51, 51, 51);
  border: 1px solid rgb(204, 204, 204);
}

.action-btn.save-btn {
  background: rgb(97, 97, 97);
  color: rgb(255, 255, 255);
}

</style>