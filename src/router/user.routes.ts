import UserHomePage from "@/public-page/user-public-page/UserHomePage.vue";
import UserProfilePage from "@/public-page/user-public-page/UserProfilePage.vue";
import UserSettingsPage from "@/public-page/user-public-page/UserSettingsPage.vue";
import GreenHootCreativePage from "@/public-page/user-create-greenhot-page/GreenHootCreativePage.vue";
import GreenHootEditPage from "@/public-page/user-edit-greenhot-page/GreenHootEditPage.vue";

const routes = [
    {path: '/UserHomePage', name:'userHomePage' , component: UserHomePage, meta: {showHeader: false}},
    {path: '/', redirect: '/UserHomePage'},
    {path: '/UserProfilePage',name:'userProfile', component: UserProfilePage, meta: {showHeader: false}},
    {path: '/UserSettingsPage',name:'userSetting', component: UserSettingsPage, meta: {showHeader: false}},
    {path: '/GreenHootCreativePage',name:'userCreative', component: GreenHootCreativePage, meta: {showHeader: false}},
    {path: '/GreenHootEditPage',name:'userEdit', component: GreenHootEditPage, meta: {showHeader: false}},
    {path: '/:pathMatch(.*)*', redirect: '/UserHomePage'},
];
export default routes