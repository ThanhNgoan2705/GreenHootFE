import UserHomePage from "@/public-page/user-public-page/UserHomePage.vue";
import UserLibraryPage from "@/public-page/user-public-page/UserLibraryPage.vue";
import UserFolderPage from "@/public-page/user-public-page/UserFolderPage.vue";
import UserReportsPage from "@/public-page/user-public-page/UserReportsPage.vue";

const routes = [
    {path: '/UserHomePage', component: UserHomePage, meta: {showHeader: false,activeLink:'Home'}},
    {path: '/UserLibraryPage', component: UserLibraryPage, meta: {showHeader: false,activeLink:'Library'}},
    {path: '/UserFolderPage', component: UserFolderPage, meta: {showHeader: false,activeLink:'Folder'}},
    {path: '/UserReportsPage', component: UserReportsPage, meta: {showHeader: false,activeLink:'Reports'}},
    {path: '/', redirect: '/UserHomePage'},
    {path: '/:pathMatch(.*)*', redirect: '/UserHomePage'},
];
export default routes