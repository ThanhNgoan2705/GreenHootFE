import { createApp } from 'vue'
import App from './App.vue'
import 'mdb-vue-ui-kit/css/mdb.min.css'
//in main.js

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import "./assets/style.css"
import PrimeVue from "primevue/config";
import Dropdown from 'primevue/dropdown';
import router from './router/index.js'
import InputOtp from "primevue/inputotp";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import ConfirmPopup  from "primevue/confirmpopup";
import vue3GoogleLogin from 'vue3-google-login';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import {createPinia} from "pinia";

// Create a new Vue instance
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(PrimeVue)
let gAuthClientId= '212976418566-uv2ci7odbmrl9i40bbe3ri1vvlqmg67a.apps.googleusercontent.com';
app.use(vue3GoogleLogin, {
    clientId: gAuthClientId ,
})
app.component('Dropdown', Dropdown)
app.component('InputOtp', InputOtp)
app.component('DataView', DataView)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('ConfirmPopup', ConfirmPopup)
app.mount('#app')

