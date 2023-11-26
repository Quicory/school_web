import { api } from 'src/boot/axios';
import { TeacherResponse, Paging } from 'src/interfaces';
import { LocalStorage } from 'quasar';

export const getTeacher = async (paging: Paging): Promise<TeacherResponse> => {
  const token = LocalStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  if (paging.PageSize == 0) {
    paging.PageSize = 99999999;
  }

  let query = `?Page=${paging.Page}&PageSize=${paging.PageSize}&FieldOrder=${paging.FieldOrder}&IsAsc=${paging.IsAsc}`;
  if (paging.Filter) {
    query += `Filter=${paging.Filter}`;
  }

  const { data } = await api.get<TeacherResponse>('/api/Teacher' + query);

  return data;
};
