import UserHomePage from "@/public-page/user-public-page/UserHomePage.vue";
import UserLibraryPage from "@/public-page/user-public-page/UserLibraryPage.vue";
import UserFolderPage from "@/public-page/user-public-page/UserFolderPage.vue";
import UserReportsPage from "@/public-page/user-public-page/UserReportsPage.vue";

const routes = [
    {path: '/UserHomePage', component: UserHomePage, meta: {showHeader: true,activeLink:'Home'}},
    {path: '/UserLibraryPage', component: UserLibraryPage, meta: {showHeader: true,activeLink:'Library'}},
    {path: '/UserFolderPage', component: UserFolderPage, meta: {showHeader: true,activeLink:'Folder'}},
    {path: '/UserReportsPage', component: UserReportsPage, meta: {showHeader: true,activeLink:'Reports'}},
    {path: '/', redirect: '/UserHomePage'},
    {path: '/:pathMatch(.*)*', redirect: '/UserHomePage'},
];
export default routes