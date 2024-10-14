<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form action="#" method="POST">
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        v-model="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Login Button -->
    <button
      type="button"
      @click="onLogin"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>

    <h2 v-if="loginFailed" class="full-w text-center mt-5 text-xl text-red-500">
      {{ messageError }}
    </h2>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const email = ref<string>('');
const password = ref<string>('');
const messageError = ref<string>('Credenciales incorrectas');
const loginFailed = ref<boolean>(false);
const authStore = useAuthStore();

const router = useRouter();
const onLogin = async () => {
  const response = await authStore.login(email.value, password.value);

  if (!response.data.status) {
    loginFailed.value = true;
    email.value = '';
    password.value = '';
    return;
  }

  const lastPath = localStorage.getItem('lastPath') ?? '/';
  router.replace(lastPath);
};
</script>
