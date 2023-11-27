import { useQuasar } from 'quasar';
import {
  Paging,
  StudentResponse,
  StudentResponseOne,
  StudentNew,
} from 'src/interfaces';

import {
  getStudent as getStudentResponse,
  getStudentDelete,
  getStudentEdit,
  getStudentID,
  getStudentNew,
} from 'src/helpers/get-student';

export const useStudent = () => {
  const $q = useQuasar();

  const getStudent = async (paging: Paging): Promise<StudentResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getStudentResponse(paging);

    $q.loading.hide();

    return rep;
  };

  const getStudentByID = async (id: number): Promise<StudentResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getStudentID(id);

    $q.loading.hide();

    return rep;
  };

  const studentSave = async (
    newStudent: StudentNew
  ): Promise<StudentResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getStudentNew(newStudent);

    $q.loading.hide();

    return rep;
  };

  const studentUpdate = async (
    id: number,
    newStudent: StudentNew
  ): Promise<StudentResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getStudentEdit(id, newStudent);

    $q.loading.hide();

    return rep;
  };

  const getStudentDelByID = async (id: number): Promise<StudentResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getStudentDelete(id);

    $q.loading.hide();

    return rep;
  };

  return {
    getStudent,
    getStudentByID,
    studentSave,
    studentUpdate,
    getStudentDelByID,
  };
};
