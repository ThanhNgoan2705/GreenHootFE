import UserHomePage from "@/public-page/user-public-page/UserHomePage.vue";
import UserLibraryPage from "@/public-page/user-public-page/UserLibraryPage.vue";
import UserFolderPage from "@/public-page/user-public-page/UserFolderPage.vue";
import UserReportsPage from "@/public-page/user-public-page/UserReportsPage.vue";
import UserReportDetailPage from "@/public-page/user-public-page/UserReportDetailPage.vue";

const routes = [
    {path: '/UserHomePage',name:'userHome', component: UserHomePage, meta: {showHeader: false,activeLink:'Home'}},
    {path: '/UserLibraryPage',name:'userLibrary', component: UserLibraryPage, meta: {showHeader: false,activeLink:'Library'}},
    {path: '/UserFolderPage',name:'userFolder', component: UserFolderPage, meta: {showHeader: false,activeLink:'Folder'}},
    {path: '/UserReportsPage',name:'userReports', component: UserReportsPage, meta: {showHeader: false,activeLink:'Reports'}},
    {path: '/UserReportDetailPage',name:'userReportsDetail', component: UserReportDetailPage, meta: {showHeader: false,activeLink:'ReportDetail'}},
    {path: '/', redirect: '/UserHomePage'},
    {path: '/:pathMatch(.*)*', redirect: '/UserHomePage'},
];
export default routes