import * as proto from '../proto/Proto';
export default class AbsHandler {

    constructor() {}
    onMessageHandle(packets: proto.PacketWrapper ) {};
    onError() {};
    onClosed() {};

}