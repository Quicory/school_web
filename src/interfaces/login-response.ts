export interface LoginResponse {
  statusCode: number;
  isValid: boolean;
  message: string;
  errorMessages: null;
  result: Result;
}

export interface Result {
  token: string;
  roles: string[];
  username: string;
  completename: string;
}
