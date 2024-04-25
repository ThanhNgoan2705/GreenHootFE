import { createRouter, createWebHashHistory } from 'vue-router'
import SignInPage from "@/auth-page/SignInPage.vue";
import SignupPage from "@/auth-page/SignupPage.vue";
import EmailVerification from "@/auth-page/EmailVerificationPage.vue";
import PasswordForgottenPage from "@/auth-page/PasswordForgottenPage.vue";
import ConfirmationPage from "@/auth-page/ConfirmationPage.vue";
import SignInPageDemo from "@/auth-page/signInPageDemo.vue";
import Home from "../HomePage.vue";
import userRoutes from "@/router/user.routes.js";
import sidebarRoutes from "@/router/sidebar.routes.js";
function requireAuth(to, from, next) {
    const isAuthenticated = false;  // replace with actual login check
    const isLoginSuccess = false;  // replace with actual login check
   if(isAuthenticated){
       next()
   }
    else{
         next('/SignInPage')
    }
}
const routes= [
    {path: '/Home',name:'Home', component: Home,meta:{showHeader: true} },
    { path: '/SignInPage', component: SignInPage,meta:{showHeader: false} },
    { path: '/SignupPage', component: SignupPage ,meta:{showHeader: false}},
    { path: '/EmailVerification',component: EmailVerification,meta:{showHeader: false} },
    {path: '/PasswordForgottenPage',component: PasswordForgottenPage,meta:{showHeader: false} },
    {path: '/ConfirmationPage',component: ConfirmationPage,meta:{showHeader: false} },
    {path: '/SignInPageDemo',component: SignInPageDemo,meta:{showHeader: false} },
    { path: '/', redirect: '/Home' },
    { path: '/:pathMatch(.*)*', redirect: '/Home' },
    ...userRoutes,
    ...sidebarRoutes,
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router
