import { useQuasar } from 'quasar';
import {
  Paging,
  ClassroomResponse,
  ClassroomResponseOne,
  ClassroomNew,
} from 'src/interfaces';

import {
  getClassroom as getClassroomResponse,
  getClassroomDelete,
  getClassroomEdit,
  getClassroomID,
  getClassroomNew,
} from 'src/helpers/get-classroom';

export const useClassroom = () => {
  const $q = useQuasar();

  const getClassroom = async (paging: Paging): Promise<ClassroomResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getClassroomResponse(paging);

    $q.loading.hide();

    return rep;
  };

  const getClassroomByID = async (
    id: number
  ): Promise<ClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getClassroomID(id);

    $q.loading.hide();

    return rep;
  };

  const classroomSave = async (
    newClassroom: ClassroomNew
  ): Promise<ClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getClassroomNew(newClassroom);

    $q.loading.hide();

    return rep;
  };

  const classroomUpdate = async (
    id: number,
    newClassroom: ClassroomNew
  ): Promise<ClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getClassroomEdit(id, newClassroom);

    $q.loading.hide();

    return rep;
  };

  const getClassroomDelByID = async (
    id: number
  ): Promise<ClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getClassroomDelete(id);

    $q.loading.hide();

    return rep;
  };

  return {
    getClassroom,
    getClassroomByID,
    classroomSave,
    classroomUpdate,
    getClassroomDelByID,
  };
};
