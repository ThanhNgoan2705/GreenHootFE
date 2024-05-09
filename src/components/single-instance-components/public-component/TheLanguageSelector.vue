<script setup lang="ts">
import {ref} from "vue";
import {MDBBtn} from "mdb-vue-ui-kit";

const languages = ref([
  {name: 'English', code: 'EN'},
  {name: 'Vietnamese', code: 'VI'},
  {name: 'Chinese', code: 'ZH'},
  {name: 'Japanese', code: 'JA'},
  {name: 'Italian', code: 'IT'},
]);
const selectedLanguage = ref(languages.value[0].code);
const showLanguage = ref(false);
const selectLanguage = (lang: string) => {
  const codeSelected = languages.value.find(l => l.name === lang)?.code;
  if (codeSelected === undefined) return;
  selectedLanguage.value = codeSelected;
  showLanguage.value = false;
}
</script>

<template>
  <MDBBtn class="language-selector-toggle d-inline-flex m-auto" @click="showLanguage = !showLanguage">
    <i class="pi pi-globe" style="font-size: 1rem;color:black; margin:auto"></i>
    <span class="ms-1">{{ selectedLanguage ? selectedLanguage : 'EN' }}</span>
  </MDBBtn>
  <div v-if="showLanguage" class="language-dropdown">
    <div v-for="(lang, index) in languages" :key="index" @click="selectLanguage(lang.name)" class="m-auto">
      <span class="ms-1 text-sm cursor-pointer" >{{ lang.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.language-selector-toggle {
  padding: 0.1rem 0.5rem;
  font-weight: bold;
  border-radius: 3rem;
  border: 0.0625rem solid #333;
  -webkit-transition: all .1s;
  transition: all .1s;
  position: relative;
  background: #fff;
  color: #333;
}

.language-dropdown {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  background: #fff;
  border: 0.0625rem solid #565656;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 5rem;
}

.language-dropdown div {
  color: black;
  padding: 5px 4px;
  text-decoration: none;
  display: block;
}

.language-dropdown div:hover {
  background-color: #f1f1f1;
}

</style>