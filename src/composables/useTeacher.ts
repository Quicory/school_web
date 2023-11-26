import { TeacherResponse } from 'src/interfaces';
import { useQuasar } from 'quasar';
import { Paging } from 'src/interfaces';

import { getTeacher as getTeacherResponse } from 'src/helpers/get-teacher';

export const useTeacher = () => {
  const $q = useQuasar();

  const getTeacher = async (paging: Paging): Promise<TeacherResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Accesando...',
      html: true,
    });

    const rep = await getTeacherResponse(paging);

    $q.loading.hide();

    return rep;
  };

  return {
    getTeacher,
  };
};
