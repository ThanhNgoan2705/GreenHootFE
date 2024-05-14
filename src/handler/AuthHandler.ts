import AbsHandler from "./AbsHandler";
import type {PacketWrapper} from "@/proto/Proto";

export class AuthHandler extends AbsHandler {
    constructor() {
        super();
    }
    onMessageHandler(packets: PacketWrapper) {
        packets.packet;
        //to do
    }
    onError() {
        //to do
    }
    onClosed() {
        //to do
    }
}