import { User } from 'src/interfaces';
import { defineStore } from 'pinia';

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
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth;
    },
  },
});
