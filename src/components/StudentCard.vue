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
              Estudiantes ({{ modoLetrero }})
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

            <!-- <q-input
              :readonly="isRead"
              filled
              v-model="dataCard.birthdate"
              :dense="dense"
              label="Fecha Nacimiento"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Fecha de Nacimiento no debe estar en blanco.',
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="dataCard.birthdateDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dataCard.birthdate" mask="DD-MM-YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> -->

            <!-- v-model="dataCard.birthdate" -->

            <!-- <q-input
              filled
              v-model="dataCard.birthdate"
              :dense="dense"
              :readonly="isRead"
              mask="date"
              lazy-rules
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dataCard.birthdate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> -->

            <q-input
              filled
              label="Fecha Nacimiento"
              v-model="dataCard.birthdate"
              :dense="dense"
              :readonly="isRead"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Fecha Nacimiento no debe estar en blanco.',
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dataCard.birthdate" mask="DD-MM-YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              filled
              :readonly="isRead"
              label="Matrícula"
              v-model="dataCard.idnumber"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Matrícula no debe estar en blanco.',
              ]"
            />

            <q-input
              filled
              :readonly="isRead"
              label="Nombre Padre"
              v-model="dataCard.fathername"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'El Nombre Padre no debe estar en blanco.',
              ]"
            />

            <q-input
              filled
              :readonly="isRead"
              label="Nombre Madre"
              v-model="dataCard.mothername"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'El Nombre Madre no debe estar en blanco.',
              ]"
            />

            <q-input
              filled
              :readonly="isRead"
              label="Dirección"
              v-model="dataCard.address"
              type="text"
              clearable
              :dense="dense"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Dirección no debe estar en blanco.',
              ]"
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
  getFechaString,
  getFechaStringSave,
} from 'src/helpers/customFunctions';
import { Student, StudentNew } from 'src/interfaces';
import { useStudent } from 'src/composables/useStudent';

const { getStudentByID, studentSave, studentUpdate, getStudentDelByID } =
  useStudent();

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

const cardX = <Student>{
  id: 0,
  firstname: '',
  lastname: '',
  birthdate: '', //date.formatDate(now.toString(), 'DD-MM-YYYY'),
  idnumber: '',
  fathername: '',
  mothername: '',
  address: '',
};
const dataCard = ref(cardX);

onMounted(async () => {
  //
  isRead.value = await isReadOnly(props.modo);
  const d = {
    ...cardX,
  };
  if (props.modo == 'NEW') {
    dataCard.value = d;
    modoLetrero.value = 'AGREGANDO';
  } else {
    const resp = await getStudentByID(props.registro.id);
    if (resp.isValid) {
      dataCard.value = <Student>mappingObject(d, resp.result);
      console.log('fecha', dataCard.value.birthdate);
      dataCard.value.birthdate = await getFechaString(dataCard.value.birthdate);
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
  const payload = <Student>JSON.parse(JSON.stringify(dataCard.value));
  if (props.modo == 'NEW') {
    // delete payload.id;
    const save = convertRecord(payload);

    const resp = await studentSave(save);
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

    const resp = await studentUpdate(id, save);
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

const convertRecord = (payload: Student): StudentNew => {
  return {
    firstname: payload.firstname,
    lastname: payload.lastname,
    birthdate: getFechaStringSave(payload.birthdate),
    idnumber: payload.idnumber,
    fathername: payload.fathername,
    mothername: payload.mothername,
    address: payload.address,
  };
};

const callDelete = async () => {
  let payload = JSON.parse(JSON.stringify(dataCard.value));

  const resp = await getStudentDelByID(payload.id);
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
  myForm.value.validate().then((success: Student) => {
    if (success) {
      console.info('success');
      callSave();
    } else {
      console.error('invalid');
    }
  });
};
</script>
