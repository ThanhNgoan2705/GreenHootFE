<script setup  lang="ts">
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBIcon,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBInput,
  MDBBadge,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBContainer,
} from 'mdb-vue-ui-kit';
import {ref} from 'vue';
import {useRoute} from "vue-router";

const dropdown6 = ref(false);
const dropdown7 = ref(false);
const route = useRoute();
const famousList = ref([
  {id: 1, label: 'Business'},
  {id: 2, label: 'Science'},
  {id: 3, label: 'Math'},
  {id: 4, label: 'History'},
  {id: 5, label: 'Art'},
  {id: 6, label: 'Music'},
  {id: 7, label: 'Language'},
])
const categoriesList = ref([
  {id: 1, label: 'Business', img: 'https://images-cdn.kahoot.it/da8021ec-6b44-48b6-adf5-51c37c75a8fd'},
  {id: 2, label: 'Science', img: 'https://images-cdn.kahoot.it/44853e1e-64af-4b51-9743-1c1cf66141bf'},
  {id: 3, label: 'Math', img: 'https://images-cdn.kahoot.it/9cd62527-e08b-4131-9a8c-55ea03893044'},
  {id: 4, label: 'History', img: 'https://images-cdn.kahoot.it/21b54f3d-f2c5-4b3a-98e4-b37c285af761'},
  {id: 5, label: 'Art', img: 'https://images-cdn.kahoot.it/95ba81ff-9b8e-4c04-a5e5-96a1759ac2a4'},
  {id: 6, label: 'Music', img: 'https://images-cdn.kahoot.it/4b3b955e-7f32-46f6-a81d-87d3aeec9ced'},
  {id: 7, label: 'Language', img: 'https://images-cdn.kahoot.it/ef13773e-0c0a-48f2-9647-9e0240db8e99'},
  {id: 8, label: 'Geography', img: 'https://images-cdn.kahoot.it/330a09be-638b-4ba7-98f7-32f0481169d1'},
])
</script>
<template>
  <div class="base-top-bar" style="height:65px">
    <MDBNavbar expand="xl" light bg="white" container position="top" class="nav-container">
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
      <MDBNavbarNav class="col-12 col-md-8 justify-content-sm-center">
        <MDBDropdown v-model="dropdown7">
          <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown7 = !dropdown7">
            <!-- Search form -->
            <form class="d-flex input-group align-items-center search-from col-12 col-sm-12 col-lg-4"
                  style="width: 400px">
              <MDBInput
                  type="search"
                  class="form-control rounded"
                  placeholder="Search public kahoots"
                  aria-label="Search"
              />
              <MDBIcon icon="search" class="mx-3 search-icon"></MDBIcon>
            </form>
          </MDBDropdownToggle>
          <MDBDropdownMenu class="search-dropdown dropdown-modify" style="max-height:200px">
            <MDBContainer lg class="search-container m-2">
              <MDBDropdownItem tag="h6" header>
                <MDBRow>
                  <h6>Bạn Đang Tìm Kiếm </h6>
                </MDBRow>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBRow>
                  <MDBCol class="col-md-2 me-2 ms-2 d-inline-flex  w-75">
                    <MDBBtn class="mb-2 select-button border-black">GreenHoots</MDBBtn>
                    <MDBBtn class="mb-2 select-button border-black">Courses</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBDropdownItem>
              <MDBDropdownItem tag="h6" header>
                <MDBRow>
                  <h6>GreenHoots nổi bật </h6>
                </MDBRow>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBRow class="gx-1">
                  <MDBCol class="col-md-2 ms-2 d-flex flex-row mb-3 w-100">
                    <MDBBtn v-for="item in famousList"
                            color="secondary"
                            :key="item.id"
                            class="mb-2 select-button border-black">{{ item.label }}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBDropdownItem>
              <MDBDropdownItem tag="h6" header>
                <MDBRow>
                  <h6> Categories </h6>
                </MDBRow>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBContainer class=" row cate-row d-flex flex-row flex-wrap mb-3">
                  <MDBBtn
                      v-for="item in categoriesList"
                      :key="item.id"
                      :style="{background: `url(${item.img})  center center / cover no-repeat`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'}"
                      class="button-category col-md-3 mb-2" arial-selected="false">
                    <div class="category-card">{{ item.label }}</div>
                  </MDBBtn>
                </MDBContainer>
              </MDBDropdownItem>
            </MDBContainer>
          </MDBDropdownMenu>
          <!-- Search form -->
        </MDBDropdown>
      </MDBNavbarNav>
      <MDBNavbarNav class="d-flex right-nav">
        <div class="d-flex align-items-center">
          <button class="create-button start-button" >
            <router-link to="/GreenHootCreativePage" class="text-white">Create</router-link>
          </button>
        </div>
        <!-- Avatar -->
        <MDBDropdown align="lg-end" class="nav-item" v-model="dropdown6">
          <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown6 = !dropdown6"
          ><img
              src="https://mdbootstrap.com/img/Photos/Avatars/img (31).webp"
              class="rounded-circle"
              height="35"
              width="35"
              alt=""
              loading="lazy"
          />
          </MDBDropdownToggle>
          <MDBDropdownMenu class="user-manager" :animation="false">
            <MDBDropdownItem class="action-dropdown d-inline-flex">
              <MDBIcon icon="user-circle" size="lg" class="m-1" style="color: darkgreen"/>
              Chanchan_2705
            </MDBDropdownItem>
            <MDBDropdownItem divider/>
            <MDBDropdownItem>
              <router-link to="/UserProfilePage" class="action-dropdown">Profile</router-link>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <router-link to="/UserSettingsPage" class="action-dropdown">Setting</router-link>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <router-link to="/Home" class="action-dropdown" style="color: red">
                <MDBIcon icon="sign-out-alt" size="lg" class="me-1"/>
                Sign out
              </router-link>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <!-- Badge -->
        <MDBNavbarItem to="#" class="m-2">
          <MDBIcon icon="bell" size="xl"></MDBIcon>
          <MDBBadge pill notification badge="danger">12</MDBBadge>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBNavbar>
  </div>
</template>

<style scoped>
.create-button {
  @apply transition ease-in-out delay-150 bg-blue-500 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  duration-300
}
.base-top-bar {
  padding-bottom: 65px;
  position: relative;
}

.right-nav {
  justify-content: space-between;
}

.search-from {
  position: relative;
}

.search-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.search-dropdown {
  width: 800px;
  height: 420px;
  position: absolute;
  top: 40px;
  left: 0;
  transform: translateX(-25%);
  overflow-y: auto;
}

.search-container {
  display: flex;
  flex-direction: column;
  width: 98%;
}


.button-category {
  display: flex;
  -webkit-box-pack: center;
  place-content: flex-end center;
  width: 170px;
  height: 80px;
  border: none;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  font-family: inherit;
  font-optical-sizing: inherit;
  font-kerning: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  line-height: normal;
  background: linear-gradient(transparent 0%, transparent 1rem, rgb(51, 51, 51));
  -webkit-font-smoothing: inherit;
  appearance: none;
  border-radius: 0.25rem;
}

.cate-row {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.category-card {
  align-self: flex-end;
  text-transform: capitalize;
  color: rgb(255, 255, 255);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
  padding: 8px;
}

.user-manager {
  transform: translate3d(40px, 60px, 0px);
}

.action-dropdown {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 40px;
  padding: 1rem 1rem;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  color: rgb(51, 51, 51);
}

.badge {
  font-size: 8px;
}

.dropdown-toggle::after {
  content: none;
}

@media (min-width: 992px) {
  .navbar {
    display: flex;
    justify-content: space-between;
  }
}

/* CSS for medium screens */
@media (min-width: 768px) and (max-width: 991px) {
  .start-button, form.search-from {
    display: none;
  }
}

/* CSS for small screens */
@media (max-width: 767px) {
  .navbar {
    display: flex;
    flex-direction: column;
  }
}


</style>