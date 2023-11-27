<template>
  <div class="q-pa-md">
    <div class="q-table__title q-ml-md">Asignación de Aulas</div>
    <q-table
      flat
      bordered
      title="Asignación de Aulas"
      :rows-per-page-options="[5, 10, 20, 30, 0]"
      v-model:pagination="pagination"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      binary-state-sort
      @request="onRequest"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Agregar"
          @click="showDialog('NEW', <AssignClassroom>{})"
        >
          <q-tooltip> Utilizado para agregar un registro </q-tooltip>
        </q-btn>

        <q-space />
        <q-input
          filled
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <template v-for="{ name, label } in props.cols" :key="name">
            <q-th :props="props" class="text-bold">
              <template v-if="name != 'id'">{{ label }}</template>
            </q-th>
          </template>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            :props="props"
            v-for="{ name, value } in props.cols"
            :key="name"
          >
            <template v-if="name != 'id'">{{ value }}</template>
            <template v-else>
              <div>
                <q-btn
                  dense
                  round
                  flat
                  color="blue"
                  @click="showDialog('EDIT', props.row)"
                  icon="edit"
                  class="q-mr-sm"
                  v-if="getIsAdmin"
                >
                  <q-tooltip> Utilizado para editar el registro </q-tooltip>
                </q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="red"
                  @click="showDialog('DELETE', props.row)"
                  icon="delete"
                >
                  <q-tooltip> Utilizado para eliminar el registro </q-tooltip>
                </q-btn>
              </div>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn, QTableProps, useQuasar, date } from 'quasar';
import { Notify } from 'quasar';
import { ref, onMounted } from 'vue';

import { AssignClassroom, Paging } from 'src/interfaces';
import { useAssignClassroom } from 'src/composables/useAssignClassroom';
import { userStore } from 'src/stores/userStore';
import AssignClassroomCard from 'src/components/AssignClassroomCard.vue';

const $q = useQuasar();
const { getIsAdmin } = userStore();

const { getAssignClassroom } = useAssignClassroom();

const columns = ref<QTableColumn[]>([
  {
    name: 'firstname',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.firstname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'lastname',
    required: true,
    label: 'Apellido',
    align: 'left',
    field: (row) => row.lastname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'email',
    label: 'Correo',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'profession',
    label: 'Profesión',
    align: 'left',
    field: 'profession',
  },
  {
    name: 'create_at',
    required: true,
    label: 'Fecha Creación',
    align: 'left',
    field: (row) => row.create_at,
    format: (val) => date.formatDate(val, 'DD-MM-YYYY HH:mm'),
    sortable: true,
  },
  {
    name: 'update_at',
    required: true,
    label: 'Fecha Editada',
    align: 'left',
    field: (row) => row.create_at,
    format: (val) => date.formatDate(val, 'DD-MM-YYYY HH:mm'),
    sortable: true,
  },
  {
    name: 'id',
    label: 'id',
    field: 'id',
  },
]);

const loading = ref(false);
const filter = ref('');
// const rowCount = ref(10);
const rows = ref<AssignClassroom[]>([]);
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const showDialog = (modo: string, data: AssignClassroom) => {
  $q.dialog({
    component: AssignClassroomCard,
    // props forwarded to your custom component
    componentProps: {
      modo: modo,
      registro: data,
    },
    persistent: true,
  })
    .onOk((/* data: AssignClassroom */) => {
      console.info('OK');
      callServer();
    })
    .onCancel(() => {
      console.info('Cancel');
    })
    .onDismiss(() => {
      console.info('Called on OK or Cancel');
    });
};

onMounted(async () => {
  await callServer();
});

const callServer = async () => {
  const { page, rowsPerPage, sortBy, descending } = pagination.value;
  await fetchFromServer(page, rowsPerPage, filter.value, sortBy, descending);
};

async function fetchFromServer(
  startRow: number,
  count: number,
  filter: string,
  sortBy: string,
  descending: boolean
) {
  loading.value = true;

  const resp = await getAssignClassroom(<Paging>{
    Page: startRow,
    PageSize: count,
    FieldOrder: sortBy,
    IsAsc: descending,
    Filter: filter,
  });

  loading.value = false;

  if (resp.isValid) {
    rows.value = resp.result.items;
    pagination.value.rowsNumber = resp.result.totalCount;
  } else {
    Notify.create({
      message: resp.message,
    });
  }
}

async function onRequest(
  props: Parameters<NonNullable<QTableProps['onRequest']>>[0]
) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;

  await fetchFromServer(page, rowsPerPage, filter, sortBy, descending);

  // don't forget to update local pagination object
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
}
</script>

<style scoped></style>
