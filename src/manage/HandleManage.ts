import type AbsHandler from "@/handler/AbsHandler";
import { AuthHandler } from "@/handler/AuthHandler";
import {RoomHandler} from "@/handler/RoomHandler";
import type {PacketWrapper} from "@/proto/Proto";
import {ExamHandler} from "@/handler/Examhandler";
import { UserHandler } from "@/handler/UserHandler";
import { PlayHandler } from "@/handler/PlayHandler";
import { ReportHandler } from "@/handler/ReportHandler";
export class HandlerManage{
    private static _instance: HandlerManage = new HandlerManage();
    private handles : AbsHandler[];
    private processedPacketIds: Set<string> = new Set();
    public static me(): HandlerManage {
        return this._instance;
    }

    constructor() {
        this.handles = [];
        // add handles here
        this.handles.push(new AuthHandler());
        this.handles.push(new RoomHandler());
        this.handles.push(new ExamHandler());
        this.handles.push(new UserHandler());
        this.handles.push(new PlayHandler());
        this.handles.push(new ReportHandler());
    }
    onMessageHandler(packets: PacketWrapper) {
        console.log("so packet nhan duoc tu server : "+packets.packet.length);
        this.handles?.forEach(handle => {
            // console.log("HandlerManage.onMessageHandler:::handle.onMessageHandle" );
            handle.onMessageHandle(packets);
        });
    }
    onError() {
        this.handles?.forEach(handle => {
            handle.onError();
        });
    }
    onClosed() {
        this.handles?.forEach(handle => {
            handle.onClosed();
        });
    }
}