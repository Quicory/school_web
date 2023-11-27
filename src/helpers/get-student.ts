import { api } from 'src/boot/axios';
import {
  StudentResponse,
  Paging,
  StudentResponseOne,
  StudentNew,
} from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getStudent = async (paging: Paging): Promise<StudentResponse> => {
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
    const { data } = await api.get<StudentResponse>('/api/Student' + query);
    return data;
  } catch (error) {
    console.error(error);
    return <StudentResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getStudentID = async (id: number): Promise<StudentResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.get<StudentResponseOne>(`/api/Student/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <StudentResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getStudentNew = async (
  student: StudentNew
): Promise<StudentResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.post<StudentResponseOne>(
      '/api/Student',
      student
    );
    return data;
  } catch (error) {
    console.error(error);
    return <StudentResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getStudentEdit = async (
  id: number,
  student: StudentNew
): Promise<StudentResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.put<StudentResponseOne>(
      `/api/Student/${id}`,
      student
    );
    return data;
  } catch (error) {
    console.error(error);
    return <StudentResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getStudentDelete = async (
  id: number
): Promise<StudentResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.delete<StudentResponseOne>(`/api/Student/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <StudentResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
