import AbsHandler from "./AbsHandler";
import router from "@/router";
import type {PacketWrapper} from "@/proto/Proto";
import {showWarningAlert} from "@/service/Alert";
import {useReportStore} from "@/states/ReportStore";

export class ReportHandler extends AbsHandler {
    constructor() {
        super();
    }
    onMessageHandle(packets: PacketWrapper) {
        const reportStore = useReportStore();
        for (const packet of packets.packet) {
            console.log(packet.data.oneofKind);
            if (packet.data.oneofKind === "resGetAllReportByHostId") {
                const reports = packet.data.resGetAllReportByHostId.reports;
                const hostReports = reportStore.getAllreports;
                console.log(reports);
                if (reports.length === 0 && router.currentRoute.value.path === '/UserReportsPage') {
                    showWarningAlert  ("No report found");
                } else {
                    for (const report of reports) {
                        if (hostReports.findIndex((r) => r.examSessionId === report.examSessionId) === -1) {
                            hostReports.push(report);
                        } else {
                            hostReports.splice(hostReports.findIndex((r) => r.examSessionId === report.examSessionId), 1, report);
                        }
                    }
                }
            }
            if (packet.data.oneofKind === "resGetAllReportByPlayerId") {
                const reports = packet.data.resGetAllReportByPlayerId.reports;
                const playerReports = reportStore.getAllreports;
                console.log(reports);
                if (reports.length === 0) {
                    showWarningAlert("No report found! You have not participated in any exam yet!");   
                } else {
                    for (const report of reports) {
                        if (playerReports.findIndex((r) => r.examSessionId === report.examSessionId) === -1) {
                            playerReports.push(report);
                        } else {
                            playerReports.splice(playerReports.findIndex((r) => r.examSessionId === report.examSessionId), 1, report);
                        }
                }
            }
            }
            if (packet.data.oneofKind === "resGetReport") {
                const report = packet.data.resGetReport.report;
                console.log(report);
                if (report) {
                    reportStore.setReport(report);
                    router.push({name: 'userReportsDetail'});
                } else {
                    if (router.currentRoute.value.path === '/UserReportsPage') {
                        console.log("da vao day");
                        showWarningAlert("No report found");
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