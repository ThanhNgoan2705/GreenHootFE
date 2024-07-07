import AbsHandler from "./AbsHandler";
import router from "@/router";
import type { PacketWrapper } from "@/proto/Proto";
import { showInfoAlert, showToastTopRight, showWarningAlert } from "@/service/Alert";
import { useReportStore } from "@/states/ReportStore";

export class ReportHandler extends AbsHandler {
    constructor() {
        super();
    }
    onMessageHandle(packets: PacketWrapper) {
        let respone = 0;
        const reportStore = useReportStore();
        for (let packet of packets.packet) {
            console.log(packet.data.oneofKind);
            if (packet.data.oneofKind === "resGetAllReportByHostId") {
                const reports = packet.data.resGetAllReportByHostId.reports;
                console.log(reports);
                if (reports.length === 0) {
                    showWarningAlert("No report found");
                } else {
                    reportStore.setReports(reports);
                }
            }
            if (packet.data.oneofKind === "resGetAllReportByPlayerId") {
                const reports = packet.data.resGetAllReportByPlayerId.reports;
                console.log(reports);
                if (reports.length === 0) {
                    showWarningAlert("No report found! You have not participated in any exam yet!");
                    router.push('/UserReportsPage');
                }else{
                    reportStore.setReports(reports);
                }
            }
            if (packet.data.oneofKind === "resGetReport") {
                const report = packet.data.resGetReport.report;
                console.log(report);
                if (report) {
                    reportStore.setReport(report);
                    router.push('/UserReportDetailPage');
                }else{
                    showWarningAlert("No report found");
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