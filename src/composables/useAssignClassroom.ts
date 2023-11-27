import { useQuasar } from 'quasar';
import {
  Paging,
  AssignClassroomResponse,
  AssignClassroomResponseOne,
  AssignClassroomNew,
} from 'src/interfaces';

import {
  getAssignClassroom as getAssignClassroomResponse,
  getAssignClassroomDelete,
  getAssignClassroomEdit,
  getAssignClassroomID,
  getAssignClassroomNew,
} from 'src/helpers/get-assign-classroom';

export const useAssignClassroom = () => {
  const $q = useQuasar();

  const getAssignClassroom = async (
    paging: Paging
  ): Promise<AssignClassroomResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getAssignClassroomResponse(paging);

    $q.loading.hide();

    return rep;
  };

  const getAssignClassroomByID = async (
    id: number
  ): Promise<AssignClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getAssignClassroomID(id);

    $q.loading.hide();

    return rep;
  };

  const assignClassroomSave = async (
    id: number,
    newAssignClassroom: AssignClassroomNew
  ): Promise<AssignClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });
    const rep = await getAssignClassroomNew(id, newAssignClassroom);

    $q.loading.hide();

    return rep;
  };

  const assignClassroomUpdate = async (
    id: number,
    newAssignClassroom: AssignClassroomNew
  ): Promise<AssignClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getAssignClassroomEdit(id, newAssignClassroom);

    $q.loading.hide();

    return rep;
  };

  const getAssignClassroomDelByID = async (
    id: number
  ): Promise<AssignClassroomResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getAssignClassroomDelete(id);

    $q.loading.hide();

    return rep;
  };

  return {
    getAssignClassroom,
    getAssignClassroomByID,
    assignClassroomSave,
    assignClassroomUpdate,
    getAssignClassroomDelByID,
  };
};
