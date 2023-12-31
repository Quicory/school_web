import { api } from 'src/boot/axios';
import {
  TeacherResponse,
  Paging,
  TeacherResponseOne,
  TeacherNew,
} from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getTeacher = async (paging: Paging): Promise<TeacherResponse> => {
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
    const { data } = await api.get<TeacherResponse>('/api/Teacher' + query);
    console.log('Teachear', data);
    return data;
  } catch (error) {
    console.error(error);
    return <TeacherResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getTeacherID = async (id: number): Promise<TeacherResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.get<TeacherResponseOne>(`/api/Teacher/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <TeacherResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getTeacherNew = async (
  teacher: TeacherNew
): Promise<TeacherResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.post<TeacherResponseOne>(
      '/api/Teacher',
      teacher
    );
    return data;
  } catch (error) {
    console.error(error);
    return <TeacherResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getTeacherEdit = async (
  id: number,
  teacher: TeacherNew
): Promise<TeacherResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.put<TeacherResponseOne>(
      `/api/Teacher/${id}`,
      teacher
    );
    return data;
  } catch (error) {
    console.error(error);
    return <TeacherResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getTeacherDelete = async (
  id: number
): Promise<TeacherResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.delete<TeacherResponseOne>(`/api/Teacher/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <TeacherResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
