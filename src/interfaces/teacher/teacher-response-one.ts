import { Teacher } from './teacher';

export interface TeacherResponseOne {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: Teacher;
  totalCount: number;
}
