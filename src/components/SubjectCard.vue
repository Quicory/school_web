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
              Asignaturas ({{ modoLetrero }})
            </div>
          </q-card-section>

          <q-card-section style="padding-bottom: 0 !important">
            <q-input
              filled
              :readonly="isRead"
              label="Nombre"
              v-model="dataCard.name"
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

import { isReadOnly, mappingObject } from 'src/helpers/customFunctions';
import { Subject, Paging, SubjectNew } from 'src/interfaces';
import { useSubject } from 'src/composables/useSubject';

const {
  getSubject,
  getSubjectByID,
  subjectSave,
  subjectUpdate,
  getSubjectDelByID,
} = useSubject();

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

const cardX = <Subject>{
  id: 0,
  name: '',
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
    const resp = await getSubjectByID(props.registro.id);
    if (resp.isValid) {
      dataCard.value = <Subject>mappingObject(d, resp.result);
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
  const payload = <Subject>JSON.parse(JSON.stringify(dataCard.value));
  if (props.modo == 'NEW') {
    // delete payload.id;
    const save = convertRecord(payload);

    const resp = await subjectSave(save);
    if (resp.isValid) {
      onDialogOK(resp.result);
    }
  } else {
    const id = payload.id;
    const save = convertRecord(payload);

    const resp = await subjectUpdate(id, save);
    if (resp.isValid) {
      onDialogOK(resp.result);
    }
  }
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
};

const convertRecord = (payload: Subject): SubjectNew => {
  return {
    name: payload.name,
  };
};

const callDelete = async () => {
  console.log('Estoy en callDelete');
  let payload = JSON.parse(JSON.stringify(dataCard.value));
  console.log(payload);
  const resp = await getSubjectDelByID(payload.id);
  if (resp.isValid) {
    onDialogOK(resp.result);
  }
};

const onOKClick = () => {
  myForm.value.validate().then((success: Subject) => {
    if (success) {
      console.info('success');
      callSave();
    } else {
      console.error('invalid');
    }
  });
};
</script>
