import { AssignClassroom } from './assign-classroom';

export interface AssignClassroomResponseOne {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: AssignClassroom;
  totalCount: number;
}
