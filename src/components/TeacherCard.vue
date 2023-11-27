<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    @escape-key="onDialogCancel"
  >
    <div class="q-dialog-plugin" style="max-width: 800px; width: 500px">
      <q-form ref="myForm">
        <q-card
          style="background: radial-gradient(circle, #cfd8dc 0%, #e0f7fa 100%)"
        >
          <q-card-section class="row">
            <div class="col-1.5 col-md-12">
              <q-checkbox
                left-label
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                v-model="dense"
                :label="dense ? 'Agradar' : 'Disminuir'"
              />
            </div>
            <div class="col-10.5 col-md-12 text-h6">
              Maestros ({{ modoLetrero }})
            </div>
          </q-card-section>

          <q-card-section style="padding-bottom: 0 !important">
            <q-input
              filled
              :readonly="isRead"
              label="Nombre"
              v-model="dataCard.firstname"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'El nombre no deber estar en blanco.',
              ]"
            />

            <q-input
              filled
              :readonly="isRead"
              label="Apellido"
              v-model="dataCard.lastname"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'El apellido no deber estar en blanco.',
              ]"
            />

            <q-input
              filled
              :readonly="isRead"
              label="Correo"
              v-model="dataCard.email"
              type="email"
              clearable
              :dense="dense"
              :rules="[
                (val) => !!val || 'El Correo no debe estar en blanco.',
                (val) =>
                  (!!val && val.length <= 600) ||
                  'El Correo no de tener mas de 600 caracteres.',
                (val) =>
                  (!!val && validateEmail(val)) || 'Debe ser un correo válido.',
              ]"
              lazy-rules
            />

            <q-input
              filled
              :readonly="isRead"
              label="Profesión"
              v-model="dataCard.profession"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Profesión no debe estar en blanco.',
              ]"
            />

            <q-select
              filled
              :readonly="isRead"
              v-model="dataCard.subjects"
              multiple
              :options="optionsSubjects"
              use-chips
              stack-label
              label="Asignatura"
              option-value="id"
              option-label="name"
            />
          </q-card-section>

          <q-card-actions align="center" class="bg-white">
            <q-btn
              outline
              label="Cancel"
              color="primary"
              icon="cancel"
              @click="onDialogCancel"
            />
            <q-btn
              label="Grabar"
              color="primary"
              icon="save"
              @click="onOKClick"
              v-if="!isRead"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';

import {
  isReadOnly,
  mappingObject,
  validateEmail,
} from 'src/helpers/customFunctions';
import { Subject, Teacher, Paging, TeacherNew } from 'src/interfaces';
import { useTeacher } from 'src/composables/useTeacher';
import { getSubject } from 'src/helpers/get-subject';

const { getTeacherByID, teacherSave, teacherUpdate, getTeacherDelByID } =
  useTeacher();

const props = defineProps({
  modo: {
    type: String,
    required: true,
  },
  registro: {
    type: Object,
    default: () => ({}),
  },
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const isRead = ref<boolean>(false);
const dense = ref(true);
const $q = useQuasar();

const myForm = ref();
const modoLetrero = ref('');

function confirm() {
  $q.dialog({
    dark: true,
    title: 'Confirmar',
    message: '¿Esta seguro que desea eliminar el registro?',
    cancel: true,
    persistent: true,
    position: 'bottom',
  })
    .onOk(() => {
      console.info('>>>> OK');
      callDelete();
    })
    .onOk(() => {
      // console.info('>>>> second OK catcher')
    })
    .onCancel(() => {
      console.info('>>>> Cancel');
      onDialogCancel();
    })
    .onDismiss(() => {
      // console.info('I am triggered on both OK and Cancel')
    });
}

const cardX = <Teacher>{
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  profession: '',
  subjects: [],
};

const dataCard = ref(cardX);
const optionsSubjects = ref<Subject[]>([]);

onMounted(async () => {
  const resp = await getSubject(<Paging>{
    Page: 1,
    PageSize: 99999999,
    FieldOrder: 'Name',
    IsAsc: true,
  });
  if (resp.isValid) {
    optionsSubjects.value = resp.result.items;
  }

  //
  isRead.value = await isReadOnly(props.modo);
  const d = {
    ...cardX,
  };
  if (props.modo == 'NEW') {
    dataCard.value = d;
    modoLetrero.value = 'AGREGANDO';
  } else {
    const resp = await getTeacherByID(props.registro.id);
    if (resp.isValid) {
      dataCard.value = <Teacher>mappingObject(d, resp.result);
    } else dataCard.value = d;

    if (props.modo == 'EDIT') {
      modoLetrero.value = 'MODIFICANDO';
    } else if (props.modo == 'DELETE') {
      modoLetrero.value = 'BORRANDO';
      confirm();
    } else {
      modoLetrero.value = 'CONSULTANDO';
    }
  }
});

// REQUIRED; must be called inside of setup()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*.../* }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

const callSave = async () => {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  const payload = <Teacher>JSON.parse(JSON.stringify(dataCard.value));
  if (props.modo == 'NEW') {
    // delete payload.id;
    const save = convertRecord(payload);

    const resp = await teacherSave(save);
    if (resp.isValid) {
      onDialogOK(resp.result);
    } else {
      $q.notify({
        type: 'negative',
        message: resp.message,
      });
    }
  } else {
    const id = payload.id;
    const save = convertRecord(payload);

    const resp = await teacherUpdate(id, save);
    if (resp.isValid) {
      onDialogOK(resp.result);
    } else {
      $q.notify({
        type: 'negative',
        message: resp.message,
      });
    }
  }
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
};

const convertRecord = (payload: Teacher): TeacherNew => {
  return {
    firstName: payload.firstname,
    lastName: payload.lastname,
    email: payload.email,
    profession: payload.profession,
    detail: payload.subjects.map((x: Subject) => {
      return x.id;
    }),
  };
};

const callDelete = async () => {
  console.log('Estoy en callDelete');
  let payload = JSON.parse(JSON.stringify(dataCard.value));
  console.log(payload);
  const resp = await getTeacherDelByID(payload.id);
  if (resp.isValid) {
    onDialogOK(resp.result);
  } else {
    $q.notify({
      type: 'negative',
      message: resp.message,
    });
  }
};

const onOKClick = () => {
  myForm.value.validate().then((success: Teacher) => {
    if (success) {
      console.info('success');
      callSave();
    } else {
      console.error('invalid');
    }
  });
};
</script>
