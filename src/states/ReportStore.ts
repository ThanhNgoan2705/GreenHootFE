import  { Report } from "@/proto/Proto";
import {defineStore} from "pinia";
export const useReportStore = defineStore('report', {
    state: () => ({
        reports: [] as Report[],
        report: {} as Report,
        examSessionId: 0,
        hostname: ''
    }),
    actions: {
        setReport(report: Report) {
            this.report = report;
        },
        setReports(reports: Report[]) {
            this.reports = reports;
        },
        deleteReport(reportExamSessionId: number) {
            this.reports = this.reports.filter(report => report.examSessionId !== reportExamSessionId);
        }
    },
    getters: {
        getAllreports: (state) => state.reports,
        getReport: (state) => state.report,
        getExamSessionId: (state) => state.examSessionId,
    }
})
