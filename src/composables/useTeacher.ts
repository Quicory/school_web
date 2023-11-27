import { useQuasar } from 'quasar';
import {
  Paging,
  TeacherResponse,
  TeacherResponseOne,
  TeacherNew,
} from 'src/interfaces';

import {
  getTeacher as getTeacherResponse,
  getTeacherDelete,
  getTeacherEdit,
  getTeacherID,
  getTeacherNew,
} from 'src/helpers/get-teacher';

export const useTeacher = () => {
  const $q = useQuasar();

  const getTeacher = async (paging: Paging): Promise<TeacherResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getTeacherResponse(paging);

    $q.loading.hide();

    return rep;
  };

  const getTeacherByID = async (id: number): Promise<TeacherResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getTeacherID(id);

    $q.loading.hide();

    return rep;
  };

  const teacherSave = async (
    newTeacher: TeacherNew
  ): Promise<TeacherResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getTeacherNew(newTeacher);

    $q.loading.hide();

    return rep;
  };

  const teacherUpdate = async (
    id: number,
    newTeacher: TeacherNew
  ): Promise<TeacherResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getTeacherEdit(id, newTeacher);

    $q.loading.hide();

    return rep;
  };

  const getTeacherDelByID = async (id: number): Promise<TeacherResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getTeacherDelete(id);

    $q.loading.hide();

    return rep;
  };

  return {
    getTeacher,
    getTeacherByID,
    teacherSave,
    teacherUpdate,
    getTeacherDelByID,
  };
};
