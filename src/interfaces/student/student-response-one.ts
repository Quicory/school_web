import { Student } from './student';

export interface StudentResponseOne {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: Student;
  totalCount: number;
}
