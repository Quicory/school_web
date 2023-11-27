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
              Asignación de Aulas ({{ modoLetrero }})
            </div>
          </q-card-section>

          <q-card-section style="padding-bottom: 0 !important">
            <q-select
              filled
              emit-value
              map-options
              options-dense
              v-model="dataCard.id"
              :dense="dense"
              input-debounce="1000"
              :options="optionsTeacher"
              no-error-icon
              label="Select Maestro"
              option-value="id"
              option-label="firstname"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val > 0) || 'El nombre no deber estar en blanco.',
              ]"
              @update:model-value="(v) => selectTeacher(v)"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label
                      ><strong
                        >{{ scope.opt.firstname }}
                        {{ scope.opt.lastname }}</strong
                      ></q-item-label
                    >
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              filled
              readonly
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
              readonly
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
              readonly
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
              v-model="dataCard.classrooms"
              multiple
              :options="optionsClassrooms"
              use-chips
              stack-label
              label="Aulas"
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
import {
  Classroom,
  AssignClassroom,
  Paging,
  AssignClassroomNew,
  Teacher,
} from 'src/interfaces';
import { useAssignClassroom } from 'src/composables/useAssignClassroom';
import { getClassroom } from 'src/helpers/get-classroom';
import { getTeacher } from 'src/helpers/get-teacher';

const {
  getAssignClassroomByID,
  assignClassroomSave,
  assignClassroomUpdate,
  getAssignClassroomDelByID,
} = useAssignClassroom();

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

const cardX = <AssignClassroom>{
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  profession: '',
  classrooms: [],
};

const dataCard = ref(cardX);
const optionsClassrooms = ref<Classroom[]>([]);
const optionsTeacher = ref<Teacher[]>([]);

const selectTeacher = async (value: number) => {
  let opt = await optionsTeacher.value.filter((x) => x.id === value)[0];
  if (opt) {
    const teach = <AssignClassroom>JSON.parse(JSON.stringify(opt));
    dataCard.value.lastname = teach.lastname;
    dataCard.value.email = teach.email;
    dataCard.value.profession = teach.profession;
    dataCard.value.classrooms = teach.classrooms;
  }
};

onMounted(async () => {
  const resp = await getClassroom(<Paging>{
    Page: 1,
    PageSize: 99999999,
    FieldOrder: 'Name',
    IsAsc: true,
  });
  if (resp.isValid) {
    optionsClassrooms.value = resp.result.items;
  }

  const resp2 = await getTeacher(<Paging>{
    Page: 1,
    PageSize: 99999999,
    FieldOrder: 'Name',
    IsAsc: true,
  });
  if (resp2.isValid) {
    optionsTeacher.value = resp2.result.items;
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
    const resp = await getAssignClassroomByID(props.registro.id);
    if (resp.isValid) {
      dataCard.value = <AssignClassroom>mappingObject(d, resp.result);
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
  const payload = <AssignClassroom>JSON.parse(JSON.stringify(dataCard.value));
  if (props.modo == 'NEW') {
    // delete payload.id;
    const save = convertRecord(payload);

    const resp = await assignClassroomSave(payload.id, save);
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

    const resp = await assignClassroomUpdate(id, save);
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

const convertRecord = (payload: AssignClassroom): AssignClassroomNew => {
  return {
    detail: payload.classrooms.map((x: Classroom) => {
      return x.id;
    }),
  };
};

const callDelete = async () => {
  let payload = JSON.parse(JSON.stringify(dataCard.value));
  const resp = await getAssignClassroomDelByID(payload.id);
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
  myForm.value.validate().then((success: AssignClassroom) => {
    if (success) {
      console.info('success');
      callSave();
    } else {
      console.error('invalid');
    }
  });
};
</script>
