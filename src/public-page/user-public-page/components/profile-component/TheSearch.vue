<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const dropdown7 = ref(false);
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu, MDBDropdownToggle,
  MDBIcon, MDBInput,
  MDBRow
} from "mdb-vue-ui-kit";

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
const isMobile = ref(window.innerWidth <= 499);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 499;
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);

})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
})
</script>

<template>
  <MDBDropdown v-model="dropdown7" class="w-full">
    <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown7 = !dropdown7">
        <form class="flex input-group items-center w-fit flex-grow-1   ">
          <input
              type="search"
              class=" form-control form-input  rounded "
              placeholder="Search public GreenHots"
              aria-label="Search"
          />
          <div class="input-group-text border-0  text-center">
            <MDBIcon icon="search" class=" my-auto search-icon"></MDBIcon>
          </div>
        </form>
      <!-- Search form -->
    </MDBDropdownToggle>
    <MDBDropdownMenu id="extend-suggestion" class=" max-h-[350px] lg:w-[813px] xl:w-[813px] w-full mt-[8px] -translate-x-1/4  dropdown-modify dropdown-container">
      <MDBDropdownItem class="flex flex-row">
        <MDBDropdownItem class="flex flex-row" tag="h6" header>
          <MDBRow>
            <h6>Bạn Đang Tìm Kiếm </h6>
          </MDBRow>
        </MDBDropdownItem>
        <MDBRow>
          <MDBCol class="col-md-2 me-2 ms-2 d-inline-flex  w-75">
            <MDBBtn class="mb-2 select-button border-black">GreenHoots</MDBBtn>
            <MDBBtn class="mb-2 select-button border-black">Courses</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBDropdownItem>
      <MDBDropdownItem>
        <MDBDropdownItem tag="h6" header>
          <MDBRow>
            <h6>GreenHoots nổi bật </h6>
          </MDBRow>
        </MDBDropdownItem>
        <div class="flex flex-wrap max-w-full">
          <div v-for="item in famousList" class="flex-items">
            <MDBBtn
                color="secondary"
                :key="item.id"
                class="mb-2 select-button border-black">{{ item.label }}
            </MDBBtn>
          </div>
        </div>
      </MDBDropdownItem>
      <MDBDropdownItem class="suggest-container">
        <MDBDropdownItem tag="h6" header>
          <MDBRow>
            <h6> Categories </h6>
          </MDBRow>
        </MDBDropdownItem>
        <div class="grid-container w-full lg:w-[813px] xl-[813px] ">
          <div class="cate-row">
            <div
                v-for="item in categoriesList"
                class=" cate-list-btn ">
              <MDBBtn
                  :key="item.id"
                  :style="{background: `url(${item.img})  center center / cover no-repeat`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'}"
                  class="button-category  mb-2" arial-selected="false">
                <div class="category-card">{{ item.label }}</div>
              </MDBBtn>
            </div>
          </div>

        </div>
      </MDBDropdownItem>
    </MDBDropdownMenu>
    <!-- Search form -->
  </MDBDropdown>
</template>

<style scoped>
.dropdown-modify [id="extend-suggestion"] {
  @apply w-[813px] mt-[8px] -translate-x-1/4
}
.dropdown-container{
  @apply absolute box-border z-[140] top-[40px] left-0   overflow-y-auto mt-[4px] p-[16px] rounded-sm shadow bg-white
}
.search-icon {
  position: relative;
  margin: auto;
  top: 30%;
  transform: translateY(-50%);
}

.flex-items {
  flex: 1 0 auto;
}

.cate-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  gap: 16px;
  width: 100%;
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

.cate-list-btn {
  @apply h-[83px]
}

.button-category {
  display: flex;
  -webkit-box-pack: center;
  place-content: flex-end center;
  width: 100%;
  height: 100%;
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

.badge {
  font-size: 8px;
}

.dropdown-toggle::after {
  content: none;
}

  .dropdown-modify {
    @apply top-[56px] left-0 right-0 pb-4
  }
  .search-icon {
    top: 50%;
    transform: translateY(-50%);
  }
  input[type="search"] {
    @apply relative ps-[40px] min-h-[40px] text-lg
  }
  .form-input{
    @apply box-border w-auto min-h-[40px] border border-solid border-gray-300 rounded-sm bg-white leading-5 text-xl transition-all duration-200 ease-in appearance-none overflow-auto py-0 ps-[1rem] pe-[5rem] whitespace-nowrap
  }
</style>