import { api } from 'src/boot/axios';
import {
  ClassroomResponse,
  Paging,
  ClassroomResponseOne,
  ClassroomNew,
} from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getClassroom = async (
  paging: Paging
): Promise<ClassroomResponse> => {
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
    const { data } = await api.get<ClassroomResponse>('/api/Classroom' + query);
    return data;
  } catch (error) {
    console.error(error);
    return <ClassroomResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getClassroomID = async (
  id: number
): Promise<ClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.get<ClassroomResponseOne>(
      `/api/Classroom/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return <ClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getClassroomNew = async (
  Classroom: ClassroomNew
): Promise<ClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.post<ClassroomResponseOne>(
      '/api/Classroom',
      Classroom
    );
    return data;
  } catch (error) {
    console.error(error);
    return <ClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getClassroomEdit = async (
  id: number,
  Classroom: ClassroomNew
): Promise<ClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.put<ClassroomResponseOne>(
      `/api/Classroom/${id}`,
      Classroom
    );
    return data;
  } catch (error) {
    console.error(error);
    return <ClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getClassroomDelete = async (
  id: number
): Promise<ClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.delete<ClassroomResponseOne>(
      `/api/Classroom/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return <ClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
