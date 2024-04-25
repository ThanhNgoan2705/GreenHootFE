import UserHomePage from "@/public-page/user-public-page/UserHomePage.vue";
import UserProfilePage from "@/public-page/user-public-page/UserProfilePage.vue";
import UserSettingsPage from "@/public-page/user-public-page/UserSettingsPage.vue";
import GreenHootCreativePage from "@/public-page/user-create-greenhot-page/GreenHootCreativePage.vue";

const routes = [
    {path: '/UserHomePage', component: UserHomePage, meta: {showHeader: true}},
    {path: '/', redirect: '/UserHomePage'},
    {path: '/UserProfilePage', component: UserProfilePage, meta: {showHeader: true}},
    {path: '/UserSettingsPage', component: UserSettingsPage, meta: {showHeader: true}},
    {path: '/GreenHootCreativePage', component: GreenHootCreativePage, meta: {showHeader: true}},
    {path: '/:pathMatch(.*)*', redirect: '/UserHomePage'},
];
export default routes