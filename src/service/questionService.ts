import { Question } from "@/proto/Proto";
import type { List } from "postcss/lib/list";

// const saveQuestion = (event: Event, questionDate:Question,answers:Array<string>, ) => {
//     event.preventDefault();
//     let question = Question.create();
//     const examId = sessionStorage.getItem('examId');
//     question.questionId = props.questionId;
//     question.questionText = props.questionTitle;
//     question.examId = parseInt(examId);
//     question.imageUrl = sessionStorage.getItem('imageQuestion') as string;
//     question.questionIndex = props.questionIndex;
    
//     question.choices = Array.from(answers).map((answer, index) => {
//       let choice = Choice.create();
//       choice.choiceText = answer;
//       choice.choiceIndex = index + 1;
//       choice.isCorrect = correctAnswerIndex.value === index;
//       choice.questionId = props.questionId;
//       return choice;
//     });
//     let requestUpdateQuestion = UpdateQuestionRequest.create();
//     requestUpdateQuestion.question = question;
//     let packet = Packet.create();
//     packet.data = { oneofKind: "updateQuestionRequest", updateQuestionRequest: requestUpdateQuestion };
//     WS.send(packet);
//     sessionStorage.setItem('question', JSON.stringify(question));
//   }