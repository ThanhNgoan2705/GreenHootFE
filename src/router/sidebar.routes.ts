import UserHomePage from "@/public-page/user-public-page/UserHomePage.vue";
import UserLibraryPage from "@/public-page/user-public-page/UserLibraryPage.vue";
import UserReportsPage from "@/public-page/user-public-page/UserReportsPage.vue";
import UserReportDetailPage from "@/public-page/user-public-page/UserReportDetailPage.vue";

const routes = [
    {path: '/UserHomePage', component: UserHomePage, meta: {showHeader: false,activeLink:'Home'}},
    {path: '/UserLibraryPage', component: UserLibraryPage, meta: {showHeader: false,activeLink:'Library'}},
    {path: '/UserReportsPage', component: UserReportsPage, meta: {showHeader: false,activeLink:'Reports'}},
    {path: '/UserReportDetailPage', component: UserReportDetailPage, meta: {showHeader: false,activeLink:'ReportDetail'}},
    {path: '/', redirect: '/UserHomePage'},
    {path: '/:pathMatch(.*)*', redirect: '/UserHomePage'},
];
export default routes