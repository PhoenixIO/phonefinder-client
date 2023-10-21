export enum CabinetPages {
  ExamTemplates = 'exam-template',
  CreateTemplate = 'create-template',
  Exams = 'exams',
  CreateExam = 'create-exam',
}

export type PagesSliceState = {
  cabinetPage: CabinetPages;
}
