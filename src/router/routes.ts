import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/IndexPage.vue'),
        meta: { title: 'Inicio', requiresAuth: true },
      },
      {
        path: 'Teachers',
        name: 'Teachers',
        component: () => import('pages/Teachers.vue'),
        meta: { title: 'Maestros', requiresAuth: true },
      },
      {
        path: 'Subjects',
        name: 'Subjects',
        component: () => import('pages/Subjects.vue'),
        meta: { title: 'Asignaturas', requiresAuth: true },
      },
    ],
  },
  {
    path: '/Auth/Login',
    name: 'Auth',
    meta: { requiresAuth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: { title: 'Acceso', requiresAuth: false },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
