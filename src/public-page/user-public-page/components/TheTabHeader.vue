<script setup lang="ts">
import {
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';

const activeTabId1 = ref('ex1-1');
</script>
<template>
  <MDBTabs v-model="activeTabId1">
    <!-- Tabs navs -->
    <MDBTabNav tabsClasses="mb-3">
      <MDBTabItem tabId="ex1-1" href="ex1-1">Tab #1</MDBTabItem>
      <MDBTabItem tabId="ex1-2" href="ex1-2">Tab #2</MDBTabItem>
      <MDBTabItem tabId="ex1-3" href="ex1-3">Tab #3</MDBTabItem>
    </MDBTabNav>
    <!-- Tabs navs -->
    <!-- Tabs content -->
    <MDBTabContent>
      <MDBTabPane tabId="ex1-1">Content #1</MDBTabPane>
      <MDBTabPane tabId="ex1-2">Content #2</MDBTabPane>
      <MDBTabPane tabId="ex1-3">Content #3</MDBTabPane>
    </MDBTabContent>
    <!-- Tabs content -->
  </MDBTabs>
</template>

<style scoped>

</style>