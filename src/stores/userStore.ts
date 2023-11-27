import { User } from 'src/interfaces';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

interface UserStateOption {
  user: User;
  isAuth: boolean;
}
export const userStore = defineStore('user', {
  state: () =>
    ({
      user: {},
      isAuth: false,
    } as UserStateOption),
  getters: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getIsAdmin: (state): boolean => state.user.roles.includes('Admin'),
  },
  actions: {
    setUser(user: User) {
      this.user = user;
      LocalStorage.set('user', user);
    },
    setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth;
    },
    getOut() {
      this.user = {} as User;
      this.isAuth = false;
      LocalStorage.remove('token');
      LocalStorage.remove('user');
    },
  },
});
