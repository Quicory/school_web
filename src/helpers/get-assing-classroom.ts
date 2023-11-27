import { api } from 'src/boot/axios';
import {
  AssignClassroomResponse,
  Paging,
  AssignClassroomResponseOne,
  AssignClassroomNew,
} from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getAssignClassroom = async (
  paging: Paging
): Promise<AssignClassroomResponse> => {
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
    const { data } = await api.get<AssignClassroomResponse>(
      '/api/AssignClassroom' + query
    );
    console.log('Teachear', data);
    return data;
  } catch (error) {
    console.error(error);
    return <AssignClassroomResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getAssignClassroomID = async (
  id: number
): Promise<AssignClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.get<AssignClassroomResponseOne>(
      `/api/AssignClassroom/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return <AssignClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getAssignClassroomNew = async (
  teacher: AssignClassroomNew
): Promise<AssignClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.post<AssignClassroomResponseOne>(
      '/api/AssignClassroom',
      teacher
    );
    return data;
  } catch (error) {
    console.error(error);
    return <AssignClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getAssignClassroomEdit = async (
  id: number,
  teacher: AssignClassroomNew
): Promise<AssignClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.put<AssignClassroomResponseOne>(
      `/api/AssignClassroom/${id}`,
      teacher
    );
    return data;
  } catch (error) {
    console.error(error);
    return <AssignClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getAssignClassroomDelete = async (
  id: number
): Promise<AssignClassroomResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.delete<AssignClassroomResponseOne>(
      `/api/AssignClassroom/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return <AssignClassroomResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
