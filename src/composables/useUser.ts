import { useQuasar } from 'quasar';
import {
  Paging,
  UserResponse,
  UserResponseOne,
  UserNew,
  UserEdit,
} from 'src/interfaces';

import {
  getUser as getUserResponse,
  getUserEdit,
  getUserID,
  getUserNew,
} from 'src/helpers/get-user';

export const useUser = () => {
  const $q = useQuasar();

  const getUser = async (paging: Paging): Promise<UserResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getUserResponse(paging);

    $q.loading.hide();

    return rep;
  };

  const getUserByID = async (id: string): Promise<UserResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getUserID(id);

    $q.loading.hide();

    return rep;
  };

  const userSave = async (newUser: UserNew): Promise<UserResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getUserNew(newUser);

    $q.loading.hide();

    return rep;
  };

  const userUpdate = async (newEdit: UserEdit): Promise<UserResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getUserEdit(newEdit);

    $q.loading.hide();

    return rep;
  };

  return {
    getUser,
    getUserByID,
    userSave,
    userUpdate,
  };
};
