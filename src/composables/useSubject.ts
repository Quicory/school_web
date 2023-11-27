import { useQuasar } from 'quasar';
import {
  Paging,
  SubjectResponse,
  SubjectResponseOne,
  SubjectNew,
} from 'src/interfaces';

import {
  getSubject as getSubjectResponse,
  getSubjectDelete,
  getSubjectEdit,
  getSubjectID,
  getSubjectNew,
} from 'src/helpers/get-subject';

export const useSubject = () => {
  const $q = useQuasar();

  const getSubject = async (paging: Paging): Promise<SubjectResponse> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getSubjectResponse(paging);

    $q.loading.hide();

    return rep;
  };

  const getSubjectByID = async (id: number): Promise<SubjectResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getSubjectID(id);

    $q.loading.hide();

    return rep;
  };

  const subjectSave = async (
    newSubject: SubjectNew
  ): Promise<SubjectResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getSubjectNew(newSubject);

    $q.loading.hide();

    return rep;
  };

  const subjectUpdate = async (
    id: number,
    newSubject: SubjectNew
  ): Promise<SubjectResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getSubjectEdit(id, newSubject);

    $q.loading.hide();

    return rep;
  };

  const getSubjectDelByID = async (id: number): Promise<SubjectResponseOne> => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Procesando...',
      html: true,
    });

    const rep = await getSubjectDelete(id);

    $q.loading.hide();

    return rep;
  };

  return {
    getSubject,
    getSubjectByID,
    subjectSave,
    subjectUpdate,
    getSubjectDelByID,
  };
};
