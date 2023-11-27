<template>
  <!-- <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

  <!-- <q-layout
    view="hHh Lpr lff"
    container
    style="height: 300px"
    class="shadow-2 rounded-borders"
  >
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title> School Web</q-toolbar-title>

        <div>{{ user.username }} {{ user.completename }}</div>
      </q-toolbar>
    </q-header> -->

  <!-- <q-toolbar-title> School Web </q-toolbar-title> -->

  <!-- <div>{{ user.username }} {{ user.completename }}</div>
      </q-toolbar>
    </q-header> -->

  <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list dense bordered padding class="rounded-borders">
        <q-item-label header v-ripple
          ><strong>Enlaces de la Escuela</strong>
        </q-item-label>
        <q-separator />
        <q-item clickable v-ripple>
          <q-item-section> Maestros </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

  <!-- <div class="q-pa-md">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100%"
      class="shadow-2 rounded-borders"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar>
          <q-btn
            flat
            @click="leftDrawerOpen = !leftDrawerOpen"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title> School Web </q-toolbar-title>

          <div>{{ user.username }} {{ user.completename }}</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div> -->
  <div class="q-pa-xs">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 99vh"
      class="shadow-2 rounded-borders"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar>
          <q-btn
            flat
            @click="leftDrawerOpen = !leftDrawerOpen"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title @click="$router.push({ name: 'Home' })">
            School Web
          </q-toolbar-title>

          <div>{{ user.username }} ({{ user.completename }})</div>
          <q-btn
            flat
            @click="
              () => {
                getOut;
                $router.push({ name: 'Login' });
              }
            "
            round
            dense
            icon="fa-solid fa-right-from-bracket"
            class="q-ml-md"
          >
            <q-tooltip> Salir del Sistema </q-tooltip>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                :active="menuItem.label === 'Outbox'"
                v-ripple
                :to="{ name: menuItem.name }"
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userStore } from 'src/stores/userStore';

const { user, getOut } = userStore();

const leftDrawerOpen = ref(false);

const menuList = [
  {
    icon: 'fa-solid fa-chalkboard-user',
    label: 'Maestros',
    name: 'Teachers',
    separator: false,
  },
  {
    icon: 'fa-solid fa-file-signature',
    label: 'Asignaturas',
    name: 'Subjects',
    separator: true,
  },
  {
    icon: 'fa-solid fa-user-graduate',
    label: 'Estudiantes',
    name: 'Students',
    separator: false,
  },
  {
    icon: 'fa-solid fa-school-flag',
    label: 'Aulas',
    name: 'Classrooms',
    separator: true,
  },
  {
    icon: 'fa-solid fa-pencil',
    label: 'Asignación de Maestros a Aulas',
    name: 'AssignClassrooms',
    separator: true,
  },
  {
    icon: 'fa-solid fa-unlock-keyhole',
    label: 'Cambiar Clave',
    name: 'Change',
    separator: true,
  },
  {
    icon: 'fa-solid fa-user-check',
    label: 'Usuarios',
    name: 'User',
    separator: true,
  },
];
</script>
