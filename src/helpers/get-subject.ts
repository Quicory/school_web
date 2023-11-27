import { api } from 'src/boot/axios';
import {
  SubjectResponse,
  Paging,
  SubjectResponseOne,
  SubjectNew,
} from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getSubject = async (paging: Paging): Promise<SubjectResponse> => {
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
    const { data } = await api.get<SubjectResponse>('/api/Subject' + query);
    return data;
  } catch (error) {
    console.error(error);
    return <SubjectResponse>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getSubjectID = async (id: number): Promise<SubjectResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.get<SubjectResponseOne>(`/api/Subject/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <SubjectResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getSubjectNew = async (
  Subject: SubjectNew
): Promise<SubjectResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.post<SubjectResponseOne>(
      '/api/Subject',
      Subject
    );
    return data;
  } catch (error) {
    console.error(error);
    return <SubjectResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getSubjectEdit = async (
  id: number,
  Subject: SubjectNew
): Promise<SubjectResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.put<SubjectResponseOne>(
      `/api/Subject/${id}`,
      Subject
    );
    return data;
  } catch (error) {
    console.error(error);
    return <SubjectResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};

export const getSubjectDelete = async (
  id: number
): Promise<SubjectResponseOne> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const { data } = await api.delete<SubjectResponseOne>(`/api/Subject/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return <SubjectResponseOne>{
      isValid: false,
      message: 'Error buscando datos...',
      errorMessages: error,
    };
  }
};
