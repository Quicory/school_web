import { Classroom } from './classroom';

export interface ClassroomResponse {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: Classroom[];
  totalCount: number;
}
