import { UserComplete } from './user';

export interface UserResponse {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  items: UserComplete[];
  totalCount: number;
}
