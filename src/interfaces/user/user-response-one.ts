import { UserComplete } from './user';

export interface UserResponseOne {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: UserComplete;
  totalCount: number;
}
