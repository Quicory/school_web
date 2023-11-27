import { getChangePassword } from './../helpers/get-login';
// import { ref } from 'vue';
import { useQuasar } from 'quasar';

// import { LoginResponse } from './../interfaces';
import { getLogin } from './../helpers/get-login';

export const useAuth = () => {
  const $q = useQuasar();
  // const Response = ref<LoginResponse>();

  const Login = async (username: string, password: string) => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Accesando...',
      html: true,
    });

    const rep = await getLogin(username, password);
    // Response.value = rep;

    $q.loading.hide();

    return rep;
  };

  const ChangePassword = async (
    username: string,
    password: string,
    passwordNew: string
  ) => {
    $q.loading.show({
      delay: 400, // ms
      message: 'Accesando...',
      html: true,
    });

    const rep = await getChangePassword(username, password, passwordNew);
    // Response.value = rep;

    $q.loading.hide();

    return rep;
  };

  return {
    Login,
    ChangePassword,
  };
};
