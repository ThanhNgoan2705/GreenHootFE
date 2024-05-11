import { createRouter, createWebHashHistory } from 'vue-router'
import SignInPage from "@/public-page/auth-page/SignInPage.vue";
import SignupPage from "@/public-page/auth-page/SignupPage.vue";
import EmailVerification from "@/public-page/auth-page/EmailVerificationPage.vue";
import PasswordForgottenPage from "@/public-page/auth-page/PasswordForgottenPage.vue";
import ConfirmationPage from "@/public-page/auth-page/ConfirmationPage.vue";
import Home from "../HomePage.vue";
import userRoutes from "@/router/user.routes";
import sidebarRoutes from "@/router/sidebar.routes";
import playRoutes from "@/router/play.routes";

const routes= [
    {path: '/Home',name:'Home', component: Home,meta:{showHeader: true} },
    { path: '/SignInPage', component: SignInPage,meta:{showHeader: false} },
    { path: '/SignupPage', component: SignupPage ,meta:{showHeader: false}},
    { path: '/EmailVerification',component: EmailVerification,meta:{showHeader: false} },
    {path: '/PasswordForgottenPage',component: PasswordForgottenPage,meta:{showHeader: false} },
    {path: '/ConfirmationPage',component: ConfirmationPage,meta:{showHeader: false} },
    { path: '/', redirect: '/Home' },
    { path: '/:pathMatch(.*)*', redirect: '/Home' },
    ...userRoutes,
    ...sidebarRoutes,
    ...playRoutes
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router
