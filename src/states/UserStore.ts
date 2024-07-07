import {defineStore} from 'pinia';
export const useUserStore = defineStore('userStore' ,{
     state : () => ({
        user: JSON.parse(sessionStorage.getItem("auth-user") || "{}"),
        token: sessionStorage.getItem("auth-token") || "",
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        setToken(token: string) {
            this.token = token;
        },
        logout() {
            this.user = {};
            this.token = "";
            sessionStorage.removeItem("auth-user");
            sessionStorage.removeItem("auth-token");
        }
    },
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
    }
    
});