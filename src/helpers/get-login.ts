import { api } from 'src/boot/axios';
import { LoginResponse } from '../interfaces';

export const getLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>('/api/Auth/login', {
      username,
      password,
    });
    return data;
  } catch (error) {
    return <LoginResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getChangePassword = async (
  username: string,
  password: string,
  passwordNew: string
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>('/api/Auth/ChangePassword', {
      username,
      password,
      passwordNew,
    });
    return data;
  } catch (error) {
    return <LoginResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
