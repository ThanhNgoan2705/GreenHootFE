import AbsHandler from "./AbsHandler";
import type {PacketWrapper} from "@/proto/Proto";
import router from "@/router";
import {useUserStore} from "@/states/UserStore";
import {showErrorAlert, showToastTopRight, showWarningAlert} from "@/service/Alert";

import { getAllExameJoinedReport, getAllHostedReport, handleRequestListExam } from "@/service/UserService";
export class AuthHandler extends AbsHandler {

    constructor() {
        super();
    }
    onMessageHandle(packets: PacketWrapper) {
        let respone = 0;
        const userStore = useUserStore();
        let count = 0;
        const actionAfterLogin = sessionStorage.getItem("actionAfterLogin")as string |'';

        for (let packet of packets.packet) {
            // console.log("AuthHandler.onMessageHandler:::packet");
            if (packet.data.oneofKind === "resLogin") {
                console.log("da vao duoc AuthHandler.onMessageHandler:::ResLogin");
                let resLogin = packet.data.resLogin;
                respone = resLogin.status;

                console.log(resLogin.status);

                if (resLogin.status === 200) {
                    router.push('/UserHomePage');
                    showToastTopRight("Login successfully")
                    userStore.setToken(resLogin.token);
                    sessionStorage.setItem("auth-token", resLogin.token);
                    userStore.setUser(resLogin.user);
                    sessionStorage.setItem("auth-user", JSON.stringify(resLogin.user));
                    if(resLogin.user?.userId){
                        handleRequestListExam(resLogin.user?.userId);
                        getAllHostedReport(resLogin.user?.userId);
                    }    
                }
                if (resLogin.status === 201) {
                    console.log("da vao duoc relogin va lay duoc userId");
                    const currentRoute = router.currentRoute.value.name;
                    console.log(currentRoute);

                   userStore.setToken(resLogin.token);
                   sessionStorage.setItem("auth-token", resLogin.token);
                   userStore.setUser(resLogin.user);
                   sessionStorage.setItem("auth-user", JSON.stringify(resLogin.user));
                   sessionStorage.setItem("actionAfterLogin", 'Logined');
                   if(router.currentRoute.value.name!=='Login'&& resLogin.user?.userId){
                    handleRequestListExam(resLogin.user?.userId);
                    getAllHostedReport(resLogin.user?.userId);
                   }
                   else{
                    router.push('/UserHomePage');
                    showToastTopRight("Login successfully")
                    if(resLogin.user?.userId){
                        handleRequestListExam(resLogin.user?.userId);
                        getAllHostedReport(resLogin.user?.userId);
                   }
                }
                }
                if (resLogin.status === 400) {
                    showErrorAlert("Invalid username or password");

                } if (resLogin.status === 401) {
                    showWarningAlert("This account is bocked");
                }
                if (resLogin.status === 402) {
                    showErrorAlert("This account is not verified yet");
                }
                if (resLogin.status === 403) {
                    console.log(" 403")
                }
                if (resLogin.status === 404) {
                    showWarningAlert("This account is logged in another device");
                }
            }
            if (packet.data.oneofKind === "resRegister") {
                count++;
                if (count === 1) {
                    console.log("da vao duoc AuthHandler.onMessageHandler:::ResRegister");
                    let resRegister = packet.data.resRegister;
                    console.log(resRegister.status);
                    respone = resRegister.status;
                    if (resRegister.status === 200) {
                        router.push('/ConfirmationPage');
                    }
                    if (resRegister.status === 400) {
                        showErrorAlert("Username already exists");
                    }
                    if (resRegister.status === 401) {
                        showErrorAlert("Email already exists");
                    }
                    if (resRegister.status === 500) {
                        showErrorAlert("Server error");
                    }
                }
            }
            if (packet.data.oneofKind === "resVerify") {
                count++;
                if (count === 1) {
                    console.log("da vao duoc AuthHandler.onMessageHandler:::ResVerify");
                    let resVerify = packet.data.resVerify;
                    console.log(resVerify.status);
                    respone = resVerify.status;
                    if (resVerify.status === 200) {
                        router.push('/SignInPage');
                        showToastTopRight("Verify successfully");
                    }
                    if (resVerify.status === 400) {
                        showErrorAlert("Invalid code");
                    }
                    if (resVerify.status === 401) {
                        showErrorAlert("Code has expired");
                    }
                }
            }
            if (packet.data.oneofKind === "resLogout") {
                count++;
                if (count === 1) {
                    console.log("da vao duoc AuthHandler.onMessageHandler:::ResLogout");
                    let resLogout = packet.data.resLogout;
                    console.log(resLogout.status);
                    respone = resLogout.status;
                    if (resLogout.status === 200) {
                        router.push('/SignInPage');
                        showToastTopRight("Logout successfully");
                    }
                }
            }
            if (packet.data.oneofKind === "resForgotPassword") {
                count++;
                if (count === 1) {
                    // console.log("da vao duoc AuthHandler.onMessageHandler:::ResForgotPassword");
                    let resForgotPassword = packet.data.resForgotPassword;
                    console.log(resForgotPassword.status);
                    respone = resForgotPassword.status;
                    if (resForgotPassword.status === 200) {
                        router.push({ name: "ForgotPassword", query: { type: "verifyForgotPassword" } });
                    } else {
                        showErrorAlert("Invalid email");
                    }
                }

            }
            if (packet.data.oneofKind === "resVerifyForgotPassword") {
                count++;
                if (count === 1) {
                    let resVerifyForgotPassword = packet.data.resVerifyForgotPassword;
                    respone = resVerifyForgotPassword.status;
                    if (resVerifyForgotPassword.status === 200) {
                        router.push('/ConfirmationPage');
                    } else {
                        showErrorAlert("Invalid email");
                    }
                }

            }
            if (packet.data.oneofKind === "resUserInfo") {
                count++;
                if (count === 1) {
                    console.log("da vao duoc AuthHandler.onMessageHandler:::ResUserInfo");
                    let resUserInfo = packet.data.resUserInfo;
                    console.log(resUserInfo.user);
                    if (resUserInfo.user) {
                        userStore.setUser(resUserInfo.user);
                        sessionStorage.setItem("auth-user", JSON.stringify(resUserInfo.user));
                        showToastTopRight("Update user info successfully");
                    } else {

                    }

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