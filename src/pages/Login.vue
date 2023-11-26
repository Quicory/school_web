<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-form @submit="onSubmit" class="my-card">
        <q-card class="my-card s-mt-20">
          <!-- <div>
            <img
              src="~assets/BILLTicketHorizontal.svg"
              style="max-width: 350px"
              class="q-pa-md"
            />
          </div> -->

          <q-card-section>
            <q-input
              filled
              v-model="username"
              label="Usuario"
              type="text"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'El Nombre de Usuario no deber estar en blanco.',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Contraseña"
              @keydown.enter.prevent="onSubmit"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Contraseña no deber estar en blanco.',
              ]"
            />
          </q-card-section>
          <div
            v-if="errorMessage"
            class="text-center justify-center"
            style="color: red"
          >
            {{ errorMessage }}
          </div>

          <q-separator inset />
          <q-card-actions>
            <q-btn
              class="full-width s-button-fore-color s-button-back-color"
              icon-right="send"
              label="Inicia sesión"
              type="submit"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { userStore } from 'src/stores/userStore';

const router = useRouter();
const { Login: LoginAuth } = useAuth();
const user = userStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const onSubmit = async () => {
  const response = await LoginAuth(username.value, password.value);
  if (response.isValid) {
    LocalStorage.set('token', response.result.token);
    const { username, completename, roles } = response.result;
    user.setUser({ username, completename, roles });
    user.setIsAuth(true);

    router.push({ name: 'Teachers' });
  } else {
    errorMessage.value = response.message;
  }
};

// export default {
//   setup() {
//     const username = ref('');
//     const password = ref('');

//     const $q = useQuasar();
//     const store = useStore();
//     const router = useRouter();

//     const { getLogin, errorMessage } = useAuth();

//     const onSubmit = async () => {
//       let isAdminSystem = await getLogin(username.value, password.value);
//       if (isAdminSystem == true) {
//         //Hay que seleccionar el estadio cuando es AdminSystem
//         showEstadios();
//       }
//     };

//     const showEstadios = () => {
//       $q.dialog({
//         component: EstadiosRecintosSelection,

//         componentProps: {},
//         persistent: true,
//       })
//         .onOk(async (data) => {
//           // await store.commit("auth/setIDTipoEvento", data.IDTipoEvento);
//           router.push({ name: 'Home' });
//         })
//         .onCancel(() => {
//           console.info('Cancel');
//         })
//         .onDismiss(() => {
//           console.info('Called on OK or Cancel');
//         });
//     };

//     return {
//       username,
//       password,
//       errorMessage,

//       onSubmit,
//       showEstadios,
//     };
//   },
// };
</script>

<style lang="sass" scoped>
.my-card
  background-color: white
  width: 100%
  max-width: 350px
</style>
