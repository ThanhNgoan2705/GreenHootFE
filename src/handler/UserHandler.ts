import AbsHandler from "./AbsHandler";
import type {PacketWrapper, ReqUpdateUserInfo} from "@/proto/Proto";
import router from "@/router";
import {showToastTopRight} from "@/service/Alert";
import { showErrorAlert } from "@/service/Alert";
import { showWarningAlert } from "@/service/Alert";


export class UserHandler extends AbsHandler {
    constructor() {
        super();
    }
    onMessageHandle(packets: PacketWrapper) {
        let respone = 0;
        for (let packet of packets.packet) {
            // console.log("UserHandler.onMessageHandler:::packet", packet);
            if (packet.data.oneofKind === "resChangePassword") {                                
                console.log("reschange");
                let resChangePassword = packet.data.resChangePassword;
                respone = resChangePassword.status;
                if (respone=== 200) {
                    console.log("change password successfully");
                } if (respone === 400) {
                    console.log("change password failed");
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