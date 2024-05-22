import WaitingPlayersPage from "@/public-page/user-play-page/host-page/WaitingPlayersPage.vue";
import HostPlay from "@/public-page/user-play-page/host-page/HostDisplayQuestionPage.vue";
const routes = [
    {
        path: "/waiting-players",
        name: "WaitingPlayersPage",
        component: WaitingPlayersPage,
        meta: { showHeader: false },
    },
    {
        path:"/host-play",
        name: "HostPlay",
        component: HostPlay,
        meta: { showHeader: false },
    }
];
export default routes;