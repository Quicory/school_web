import { UserEdit } from './../interfaces/user/user-edit';
import { api } from 'src/boot/axios';
import {
  UserResponse,
  Paging,
  UserResponseOne,
  UserNew,
  UserComplete,
} from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getUser = async (paging: Paging): Promise<UserResponse> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  if (paging.PageSize == 0) {
    paging.PageSize = 99999999;
  }

  let query = `?Page=${paging.Page}&PageSize=${paging.PageSize}&FieldOrder=${paging.FieldOrder}&IsAsc=${paging.IsAsc}`;
  if (paging.Filter) {
    query += `&Filter=${paging.Filter}`;
  }

  try {
    const { data } = await api.get<UserResponse>('/api/User' + query);
    return data;
  } catch (error) {
    console.error(error);
    return <UserResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getUserID = async (id: string): Promise<UserResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.get<UserResponseOne>(`/api/User/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <UserResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getUserNew = async (User: UserNew): Promise<UserResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.post<UserResponseOne>(
      '/api/Auth/registration',
      User
    );
    return data;
  } catch (error) {
    console.error(error);
    return <UserResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getUserEdit = async (
  UserComplete: UserEdit
): Promise<UserResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.put<UserResponseOne>('/api/User', UserComplete);
    return data;
  } catch (error) {
    console.error(error);
    return <UserResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
