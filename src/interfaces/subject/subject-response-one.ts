import { Subject } from './subject';

export interface SubjectResponseOne {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: Subject;
  totalCount: number;
}
