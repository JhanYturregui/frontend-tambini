import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useLocalStorage } from '@vueuse/core';
import tambiniApi from '@/modules/api/tambiniApi';
import type { userAuthInterface } from '@/modules/auth/interfaces/user-auth.interface';

export const useAuthStore = defineStore('auth', () => {
  const userAuth = ref(useLocalStorage<userAuthInterface>('userAuth', null));

  const login = async (email: string, password: string) => {
    const response = await tambiniApi.post(`/login`, {
      email,
      password,
    });

    if (response.data.status) {
      const data = response.data.data;
      data.token = response.data.access_token;
      localStorage.setItem('id', response.data.data.id);
      localStorage.setItem('name', response.data.data.name);
      localStorage.setItem('email', response.data.data.email);
      localStorage.setItem('role', response.data.data.role);
      localStorage.setItem('token', response.data.access_token);
      userAuth.value = {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        role: response.data.data.role,
        token: response.data.access_token,
      };
    }

    return response;
  };

  return {
    userAuth,
    login,
  };
});
