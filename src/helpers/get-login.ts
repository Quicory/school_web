import { api } from 'src/boot/axios';
import { LoginResponse } from '../interfaces';

export const getLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/api/Auth/login', {
    username,
    password,
  });

  return data;
};
