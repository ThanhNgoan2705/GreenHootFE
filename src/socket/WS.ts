import wsConfig from "../config/Config";

import { Packet, PacketWrapper, ReqLogin } from "@/proto/Proto";
import {HandlerManage} from "@/manage/HandleManage";

export class WS {
    set ws(value: WebSocket) {
        this._ws = value;
    }

    public get ws(): WebSocket {
        return this._ws;
    }

    private static _instance: WS = new WS();
    // @ts-ignore
    private _ws: WebSocket;
    private _url: string = wsConfig.host + ":" + wsConfig.port + wsConfig.path;
    private static listPacket: Packet[] = [];
    private connectFailLastTime: number = 0;

    public static me(): WS {
        if (WS._instance == null) {
            WS._instance = new WS();
        }
        return WS._instance;
    }

    public static send(msg: Packet): void {
        // console.debug("WS.send:::", msg)
        // this.listPacket.push(msg);
        if (WS.me()._ws.readyState == WebSocket.OPEN) {
            WS.me()._ws.send(PacketWrapper.toBinary(PacketWrapper.create({ packet: [msg] })));
        } else {
            console.log("WS.send:::WS is not ready");
        }
    }

    public sendWithBuffer() {
        // cứ 0,1s đóng gói và gửi đi
        if (WS._instance._ws.readyState != WebSocket.OPEN || WS.listPacket.length <= 0) {
            return;
        }
        let packets = PacketWrapper.create();
        packets.packet = WS.listPacket;
        this._ws.send(PacketWrapper.toBinary(packets));
        WS.listPacket = [];
    }

    constructor() {
        // this.checkAndReconnect();
        this.connect();
        console.log("WS created")
        console.debug("WS created");
    }

    onOpen = (event: any) => {
        console.log("WS.onOpen:::", event.data);
        console.debug("WS connected");

    };

    onMessage = (event: any) => {
        console.log("WS.onMessage:::", event.data);
        let data = new Uint8Array(event.data);
        let msg = PacketWrapper.fromBinary(data);
        console.log("WS.onMessage:::", msg);
        console.log(msg)
        // let resData = msg.packet[0].data.resData;
        // console.log(JSON.parse(resData.dataString))
        // console.log(resData.action);
        HandlerManage.me()?.onMessageHandler(msg);

    };

    onClosed = (event: any) => {
        HandlerManage.me()?.onClosed();
    };

    onError = (event: any) => {
        HandlerManage.me()?.onError();
    };

    async connect() {
        this._ws = new WebSocket(this._url);
        this._ws.binaryType = "arraybuffer";
        this._ws.onopen = this.onOpen;
        this._ws.onmessage = this.onMessage;
        this._ws.onclose = this.onClosed;
        this._ws.onerror = this.onError;
    }

}


