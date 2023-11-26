<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Maestros"
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
          @click="addRow"
        />

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
                  color="grey"
                  @click="onEdit(props.row)"
                  icon="edit"
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  @click="onDelete(props.row)"
                  icon="delete"
                ></q-btn>
              </div>
            </template>
          </q-td>
        </q-tr>
      </template>

      <!-- <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="firstname" :props="props">
            {{ props.row.firstname }}
          </q-td>
          <q-td key="lastname" :props="props">
            {{ props.row.lastname }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="profession" :props="props">
            {{ props.row.profession }}
          </q-td>
          <q-td key="id" :props="props">
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="onEdit(props.row)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="onDelete(props.row)"
              icon="delete"
            ></q-btn>
          </q-td>
        </q-tr>
      </template> -->

      <!-- <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="onEdit(props.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="onDelete(props.row)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template> -->

      <!-- <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
          <q-btn icon="delete" @click="onDelete(props.row)"></q-btn>
        </q-td>
      </template> -->

      <!-- <template v-slot:body-cell-your_button_column_name="props">
        <q-td :props="props">
          <q-btn
            round
            unelevated
            color="red"
            @click="onDelete(props.row.id)"
            label="Your Button Label"
          ></q-btn>
        </q-td>
      </template> -->

      <!-- <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="purple"
              :label="props.value"
              @click="onEdit(props.row)"
            ></q-btn>
          </div>
          <div class="my-table-details">
            {{ props.row.name }}
          </div>
        </q-td>
      </template> -->

      <!-- <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            class="action-btn"
            color="green"
            icon="mdi-pen"
            @click="onEdit(props.row)"
          />
        </q-td>
      </template> -->

      <!-- <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="onEdit(props.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="onDelete(props.row)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template> -->
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn, QTableProps } from 'quasar';
import { Notify } from 'quasar';
import { Teacher, Paging } from 'src/interfaces';
import { ref, onMounted } from 'vue';
import { useTeacher } from 'src/composables/useTeacher';

const { getTeacher } = useTeacher();

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
    name: 'id',
    label: 'id',
    field: 'id',
  },
]);

const loading = ref(false);
const filter = ref('');
// const rowCount = ref(10);
const rows = ref<Teacher[]>([]);
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

onMounted(async () => {
  console.log('onMounted');
  const { page, rowsPerPage, sortBy, descending } = pagination.value;
  await fetchFromServer(page, rowsPerPage, '', sortBy, descending);
});

async function fetchFromServer(
  startRow: number,
  count: number,
  filter: string,
  sortBy: string,
  descending: boolean
) {
  loading.value = true;

  const resp = await getTeacher(<Paging>{
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
  // PageSize: rowCount.value,
  // FieldOrder: string;
  // IsAsc: boolean,
  // Filter?: string;  })
  // loading.value = false
  // const data = filter
  //       ? originalRows.filter(row => row.name.includes(filter))
  //       : originalRows.slice()
  //     // handle sortBy
  //     if (sortBy) {
  //       const sortFn = sortBy === 'desc'
  //         ? (descending
  //             ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
  //             : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  //           )
  //         : (descending
  //             ? (a, b) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
  //             : (a, b) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
  //           )
  //       data.sort(sortFn)
  //     }
  //     return data.slice(startRow, startRow + count)
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

function addRow() {
  // loading.value = true;
  // setTimeout(() => {
  //   const index = Math.floor(Math.random() * (rows.value.length + 1)),
  //     row = originalRows[Math.floor(Math.random() * originalRows.value.length)];
  //   if (rows.value.length === 0) {
  //     rowCount.value = 0;
  //   }
  //   row.id = ++rowCount.value;
  //   const newRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
  //   rows.value = [
  //     ...rows.value.slice(0, index),
  //     newRow,
  //     ...rows.value.slice(index),
  //   ];
  //   loading.value = false;
  // }, 500);
}
function onEdit(row: object) {
  console.log(row);
}

function onDelete(row: object) {
  console.log(row);
  // loading.value = true;
  // setTimeout(() => {
  //   const index = Math.floor(Math.random() * rows.value.length);
  //   rows.value = [
  //     ...rows.value.slice(0, index),
  //     ...rows.value.slice(index + 1),
  //   ];
  //   loading.value = false;
  // }, 500);
}
</script>

<style scoped></style>
