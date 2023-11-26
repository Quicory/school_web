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

  return {
    Login,
  };
};
