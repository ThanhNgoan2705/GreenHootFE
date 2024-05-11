import wsConfig from "@/config/Config";
import type {Packet} from "@/proto/Proto";
import {PacketWrapper} from "@/proto/Proto";

export class WS {
    set ws(value: WebSocket) {
        this._ws = value;
    }

    get ws(): WebSocket {
        return this._ws;
    }
    private static _instance: WS = new WS();
    // @ts-ignore
    private _ws: WebSocket;
    private _url: string = wsConfig.host + ":" + wsConfig.port + wsConfig.path;
    private static listPacket: Packet[] = [];

    public static me(): WS {
        if (WS._instance == null) {
            WS._instance = new WS();
        }
        return WS._instance;
    }
    public static send(msg: Packet): void {
        if (WS.me()._ws.readyState == WebSocket.OPEN) {
            WS.me()._ws.send(PacketWrapper.toBinary(PacketWrapper.create({ packet: [msg] })));
        } else {
            console.log("WS.send:::WS is not ready");
        }
    }
    constructor() {
        this.connect();
        console.debug("WS created");
    }
    async  connect() {
        this._ws = new WebSocket(this._url);
        this._ws.onopen = this.onOpen;
        this._ws.onmessage = this.onMessage;
        this._ws.onclose = this.onClose;
        this._ws.onerror = this.onError;
    }

    private onOpen(event: any) {
        console.debug("WS connected");

    }

    private onMessage(event: any) {
        

    }

    private onClose() {

    }

    private onError() {

    }

}


