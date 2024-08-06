import { GetAllExamRequest, Packet, ReqGetAllReportByHostId, ReqGetAllReportByPlayerId } from "@/proto/Proto";
import { WS } from "@/socket/WS";
export const handleRequestListExam = ( userId: number) => {
    console.log("userId" + userId);
    let getAllExamByUserId = GetAllExamRequest.create({
      userId: userId,
    });
    let packet = Packet.create();
    packet.data = { oneofKind: 'getAllExamRequest', getAllExamRequest: getAllExamByUserId };
    console.log(packet);
    console.log("sent get all exam request to server");
    WS.send(packet);
  }

  export const getAllExameJoinedReport = (userId:number) => {
    console.log('get all report request');
      let getAllReportRequest = ReqGetAllReportByPlayerId.create();
      getAllReportRequest.userId = userId;
      let packet = Packet.create();
      packet.data = { oneofKind: 'reqGetAllReportByPlayerId', reqGetAllReportByPlayerId: getAllReportRequest };
      console.log(packet);
      console.log('sent get all report');
      WS.send(packet);
  };
  export const getAllHostedReport = ( userId:number) => {
    console.log('get all report request');
    let getAllReportRequest = ReqGetAllReportByHostId.create();
      getAllReportRequest.hostId = userId;
      let packet = Packet.create();
      packet.data = { oneofKind: 'reqGetAllReportByHostId', reqGetAllReportByHostId: getAllReportRequest };
      console.log(packet);
      console.log('sent get all report');
      WS.send(packet);
  };
