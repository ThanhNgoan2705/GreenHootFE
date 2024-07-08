import AbsHandler from "./AbsHandler";
import router from "@/router";
import type { PacketWrapper } from "@/proto/Proto";
import { showInfoAlert, showToastTopRight, showWarningAlert } from "@/service/Alert";
import { useRoomStore } from "@/states/RoomStore";

export class RoomHandler extends AbsHandler {
    constructor() {
        super();
    }

    onMessageHandle(packets: PacketWrapper) {
        let respone = 0;
        const roomStore = useRoomStore();
        for (let packet of packets.packet) {
            console.log(packet.data.oneofKind);

            if (packet.data.oneofKind === "resCreateRoom") {
                console.log("da vao duoc RoomHandler.onMessageHandler:::ResCreateRoom");
                let resCreateRoom = packet.data.resCreateRoom;
                respone = resCreateRoom.status;
                console.log(resCreateRoom.status);
                let roomId = resCreateRoom.roomId;
                sessionStorage.setItem('roomId', roomId.toString());
                console.log("roomId", resCreateRoom.roomId);
                router.push('/waiting-players');
            }
            if (packet.data.oneofKind === "resJoinRoom") {
                console.log("da vao duoc RoomHandler.onMessageHandler:::ResJoinRoom");
                let resJoinRoom = packet.data.resJoinRoom;
                respone = resJoinRoom.status;
                console.log(resJoinRoom.status);
                console.log(resJoinRoom.sessionId);
                const totalPlayer = resJoinRoom.totalPlayer - 1;
                roomStore.setTotalPlayer(totalPlayer);
                console.log("so luong nguoi choi (chua tinh chu phong)" + (resJoinRoom.totalPlayer - 1));
                const playerName = resJoinRoom.name;
                const user = JSON.parse(sessionStorage.getItem("auth-user") || "");
                const username = user.username;
                console.log("playerName : " + playerName);
                console.log("=================================");
                if (playerName !== username) {
                    showToastTopRight("player " + playerName + " join room");
                }
                else {
                    if (respone !== 400) {
                        sessionStorage.setItem('player-name', playerName);
                        showToastTopRight("You joined room successfully");
                        console.log("status : " + respone + "vo phong thanh cong");
                        router.push('/waiting-start');
                    } else {
                        showWarningAlert("You must login to join room");
                        router.push('/SignInPage');
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