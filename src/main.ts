import {WS} from "@/socket/WS";
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from "primevue/config";
import router from './router'
import InputOtp from "primevue/inputotp";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import ConfirmPopup  from "primevue/confirmpopup";
import vue3GoogleLogin from 'vue3-google-login';
import GoogleSignInPlugin from "vue3-google-signin"
import VOtpInput from "vue3-otp-input";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import {createPinia} from "pinia"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

WS.me();
// Create a new Vue instance
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(VueSweetalert2);
const gAuthClientId= '212976418566-uv2ci7odbmrl9i40bbe3ri1vvlqmg67a.apps.googleusercontent.com';
app.use(GoogleSignInPlugin, {
    clientId: '205642226183-8vk3f54u5d08uurj4cs1dpq3eb2b06d5.apps.googleusercontent.com',
  });

app.component('InputOtp', InputOtp)
app.component('DataView', DataView)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('ConfirmPopup', ConfirmPopup)
app.component('VOtpInput', VOtpInput);

app.mount('#app')

