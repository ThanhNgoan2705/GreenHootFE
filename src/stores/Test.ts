import Question from './Question';
export default interface Test{
    id: String;
    testName: String;
    testDescription: String;
    testTimeLimit: Number;
    testPoints: Number;
    testQuestions: Array<Question>;
}