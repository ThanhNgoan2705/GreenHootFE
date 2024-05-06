<script setup  lang="ts">
import {MDBIcon} from 'mdb-vue-ui-kit';
import {computed, ref} from 'vue';
const sidebarItem = ref([
  {
    name: 'Home',
    icon: 'home',
    link: '/UserHomePage',
  },
  {
    name: 'Library',
    icon: 'list-ul',
    link: '/UserLibraryPage',
  },
  {
    name: 'Folder',
    icon: 'folder',
    link: '/UserFolderPage',
  },
  {
    name: 'Reports',
    icon: 'chart-bar',
    link: '/UserReportsPage',
  },
]);
const activeLink = ref('Home');
const setActiveLink = (name: string) => {
  activeLink.value = name;
};
</script>
<template>
  <div class="menu-sidebar__content">
    <ul>
      <li v-for="item in sidebarItem" :key="item.name">
        <router-link
          :to="item.link"
          class="sidebar-item"
          :class="{active: activeLink === item.name}"
          @click="setActiveLink(item.name)"
          :aria-current="activeLink=== item.name ? 'page' : undefined"
        >
          <MDBIcon :icon="item.icon" size="ms" class="mb-2" />
          <a :class="{active: activeLink === item.name}">{{ item.name }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.menu-sidebar__content {
  background-color: rgb(255, 255, 255);
  min-width: 79px;
  max-width: 79px;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  padding-top: 64px;
  border-right: 1px solid rgb(233, 233, 233);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  z-index: 141;
}

li {
  list-style: none;
  padding: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.menu-sidebar__content{
  position:fixed;
  left: 0;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 4px;

}
ul {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}

a.sidebar-item {
  border-radius: 0.25rem;
  min-height: 50px;
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: rgb(51, 51, 51);
  text-decoration: none;
  cursor: pointer;
}

a {
  font-size: 12px;
  font-weight: 500;
  color: rgb(5, 5, 5);
  text-decoration: none !important;
}
.sidebar-item{
  transition: background-color 0.3s;
}
.sidebar-item.active {
  background-color: rgb(70, 23, 143);
  border-radius: 0.25rem;
  min-height: 50px;
}
a.active {
  color: rgb(255, 255, 255);
}


</style>