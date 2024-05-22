import {defineStore} from 'pinia'
import type Test from "@/stores/Test";
import type {State} from "@headlessui/vue/dist/internal/open-closed";

export interface User {
    id: String;
    name: String;
    email: String;
    phone: String;
    isLogin: Boolean;
    listTest: Array<Test>;
}
export const userStore = defineStore('auth', {
    state: (): State => ({
       users : [] as UserState[],
    }),
    actions: {
        setLogin(isLogin: Boolean) {
            this.isLogin = isLogin;
        },
        setListTest(listTest: Array<Test>) {
            this.listTest = listTest;
        },
        setUserInfo(id: String, name: String, email: String, phone: String) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.phone = phone;
        },
        getUserInfo() {
            return {
                id: this.id,
                name: this.name,
                email: this.email,
                phone: this.phone,
            };
        }
    }
});

