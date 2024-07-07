import type { Choice } from "@/proto/Proto";

 export interface Question {
     questionText: string,
     imageUrl: string,
     choices: Choice[];
    Questionid: number,
    questionType: string,
    questionTimeLimit: number,
    questionPoints: number,
}
