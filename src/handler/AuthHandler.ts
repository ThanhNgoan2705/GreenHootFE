import AbsHandler from "./AbsHandler";
import type {PacketWrapper, ReqUpdateUserInfo} from "@/proto/Proto";
import router from "@/router";
import {useUserStore} from "@/stores/userStore";


// export function setUserInformation(id: string, name: string, email: string, phone: string) {
//     const store = userStore();
//     store.setUserInfo(id, name, email, phone);
// }
function setUserInfo(user: any) {
    const store = useUserStore();
    store.setUser(user);
    console.log("setUserInfo:::user", user);
}
function setToken(token: string) {
    const store = useUserStore();
    store.setToken(token);
}

export class AuthHandler extends AbsHandler {
    constructor(private readonly userStore: ReturnType<typeof useUserStore>) {
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
                    // console.log(resLogin.user?.userId, resLogin.user?.username, resLogin.user?.email, resLogin.user?.phone);
                    // sessionStorage.setItem('token', resLogin.token);
                    // sessionStorage.setItem('user', JSON.stringify(resLogin.user));
                    // user.setLogin(true);
                    // setUserInformation(resLogin.user?.userId.toString(), resLogin.user?.username.toString(), resLogin.user?.email.toString(), resLogin.user?.phone.toString());
                    setUserInfo(resLogin.user);
                    setToken(resLogin.token);
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
            if (packet.data.oneofKind === "resLogout") {
                console.log("da vao duoc AuthHandler.onMessageHandler:::ResLogout");
                let resLogout = packet.data.resLogout;
                console.log(resLogout.status);
                respone = resLogout.status;
                if (resLogout.status === 200) {
                    this.userStore.setUser(undefined, undefined, undefined, undefined, undefined, undefined);
                    router.push('/Login');
                }
            }
            if (packet.data.oneofKind === "resUserInfo") {
                console.log("da vao duoc AuthHandler.onMessageHandler:::ResUserInfo");
                let resUserInfo = packet.data.resUserInfo;
                console.log(resUserInfo.status);
                respone = resUserInfo.status;
                if (resUserInfo.status === 200) {
                    setUserInformation(resUserInfo.user?.userId.toString(), resUserInfo.user?.username.toString(), resUserInfo.user?.email.toString(), resUserInfo.user?.phone.toString());
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