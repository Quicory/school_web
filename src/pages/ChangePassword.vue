<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-form @submit="onSubmit" class="my-card">
        <q-card class="my-card s-mt-20">
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

            <q-input
              filled
              type="password"
              v-model="passwordNew"
              label="Nueva Contraseña"
              @keydown.enter.prevent="onSubmit"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Contraseña no deber estar en blanco.',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="ConfirmPassword"
              label="Confirmar Nueva Contraseña"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'La Confirmación de Contraseña no deber estar en blanco.',
                (val) =>
                  (val && val == passwordNew) ||
                  'La Confirmación es diferente a la nueva contraseña.',
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
              icon-right="save"
              label="Grabar cambios"
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
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const $q = useQuasar();
const { ChangePassword } = useAuth();

const username = ref('');
const password = ref('');
const passwordNew = ref('');
const ConfirmPassword = ref('');
const errorMessage = ref('');

const onSubmit = async () => {
  const response = await ChangePassword(
    username.value,
    password.value,
    passwordNew.value
  );
  if (response.isValid) {
    $q.notify({
      type: 'positive',
      message: response.message,
    });
    router.push({ name: 'Home' });
  } else {
    errorMessage.value = response.message;
  }
};
</script>

<style lang="sass" scoped>
.my-card
  background-color: white
  width: 100%
  max-width: 350px
</style>
