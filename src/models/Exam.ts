import type { Question } from "@/proto/Proto";
 export interface Exam {
    examId: number,
    title: string,
    description: string,
    questions: Question[],
    imageUrl: string,
    status: number,
    createdDate: Date, 
    userId: number
}
