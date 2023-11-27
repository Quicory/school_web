import { Subject } from './subject';

export interface SubjectResponse {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: Subject[];
  totalCount: number;
}
