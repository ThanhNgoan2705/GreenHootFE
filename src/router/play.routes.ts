import EnterPinPage from "@/public-page/user-play-page/player-page/EnterPinPage.vue";
import GreenHootPlay from "@/public-page/user-play-page/player-page/PlayPlayersPage.vue";
const routes = [
    {
        path:"/enter-pin",
        name: "EnterPage",
        component: EnterPinPage,
        meta: { showHeader: false },
    },
    {
        path:"/greenhoot-play",
        name: "GreenHootPlay",
        component: GreenHootPlay,
        meta: { showHeader: false },
    }
    ];
export default routes;