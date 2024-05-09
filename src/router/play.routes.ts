import WaitingPlayersPage from "@/public-page/user-play-page/WaitingPlayersPage.vue";
import EnterPinPage from "@/public-page/user-play-page/EnterPinPage.vue";
const routes = [
    {
        path: "/waiting-players",
        name: "WaitingPlayersPage",
        component: WaitingPlayersPage,
        meta: { showHeader: false },
    },
    {
        path:"/enter-pin",
        name: "EnterPage",
        component: EnterPinPage,
        meta: { showHeader: false },
    }
    ];
export default routes;