export interface TrainingDetails {
    id: number;
    title: string;
    details: string;
    createdAt: string;
    dirPortrait: string;
    dirFileTraining: string;
    workTypeId: number;
  }

export interface EvaluationDetails {
  id:number;
  workRequestId: number;
  userCompanyEmployeeId: number;
  questionId: number;
  answer: number
  correct: number;
  scoring: number;
  createdAt: string;

}

export interface SelectedAnswer {
  question:number;
  anwser: number;
}

