import AbsHandler from "./AbsHandler";
import type {PacketWrapper} from "@/proto/Proto";
import router from "@/router";
import {userStore} from "@/stores/Auth";

export function setUserInformation(id: string, name: string, email: string, phone: string) {
    const store = userStore();
    store.setUserInfo(id, name, email, phone);
}

export class AuthHandler extends AbsHandler {
    constructor() {
        super();
    }

    onMessageHandle(packets: PacketWrapper) {
        let respone = 0;
        for (let packet of packets.packet) {
            console.log("AuthHandler.onMessageHandler:::packet", packet);
            if (packet.data.oneofKind === "resLogin") {
                console.log("da vao duoc AuthHandler.onMessageHandler:::ResLogin");
                let resLogin = packet.data.resLogin;
                respone = resLogin.status;
                console.log(resLogin.status);
                if (resLogin.status === 200) {
                    // User.actions.setLogin(true);
                    console.log(resLogin.user?.userId, resLogin.user?.username, resLogin.user?.email, resLogin.user?.phone);
                    // user.setLogin(true);
                    setUserInformation(resLogin.user?.userId.toString(), resLogin.user?.username.toString(), resLogin.user?.email.toString(), resLogin.user?.phone.toString());
                    router.push('/UserHomePage');
                } else {
                    console.log("Login failed");
                }
                console.log(resLogin.status);
                console.log(resLogin.token);
                console.log(resLogin.user);
            }
            if (packet.data.oneofKind === "resRegister") {
                console.log("da vao duoc AuthHandler.onMessageHandler:::ResRegister");
                let resRegister = packet.data.resRegister;
                console.log(resRegister.status);
                respone = resRegister.status;
                if (resRegister.status === 200) {
                    router.push('/EmailVerification');
                }
            }
        }
    }

    onError() {
        //to do
    }

    onClosed() {
        //to do
    }
}