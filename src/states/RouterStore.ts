import { defineStore } from "pinia";

export interface Route{
    redirectUrl:'/'
}
export const useRouterStore = defineStore('Router', {
    state: () => ({
        route: {} as Route,
    }),
    actions: {
        setRoute(route: Route) {
            this.route = route;
        },
    },
    getters: {
        getRoute: (state) => {
            return state.route;
        },
    },
});