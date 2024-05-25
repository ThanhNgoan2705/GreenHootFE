import {defineStore} from 'pinia';
import {ref, watch} from "vue";

interface User {
    userId: number;
    username: string;
    playerName: string;
    gender: number;
    email: string;
    phone: string;
}

interface UserState {
    user: User | null;
    token: string | null;
}

interface UserActions {
    setUser(user: User | null): void;

    setToken(token: string): void;

    getUserInfo(): User | null;

    getToken(): string | null;
}

interface UserStore {
    state: UserState;
    actions: UserActions;
}

function useLocalStorage<T>(key: string, defaultValue?: T) {
    const val = ref(defaultValue);
    const storageValue = window.localStorage.getItem(key);
    if (storageValue) {
        val.value = JSON.parse(storageValue);
    }
    watch(val, (newValue) => window.localStorage.setItem(key, JSON.stringify(newValue)),
        {deep: true}
    );
    return val;
}

export const useUserStore = defineStore('userStore', () => {
    const user = useLocalStorage<User>("auth-user");

    function setUser(newUser: any) {
        user.value = newUser;
    }

    function setToken(token: string) {
        localStorage.setItem("auth-token", token);
    }

    function getUserInfo(): User | null {
        const userJson = localStorage.getItem("auth-user");
        return userJson ? JSON.parse(userJson) : null;
    }

    function getToken(): string | null {
        return localStorage.getItem("auth-token");
    }
    return{
        user,
        setUser,
        setToken,
        getUserInfo,
        getToken
    }
});