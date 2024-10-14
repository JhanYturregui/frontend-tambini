<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <ul class="menu">
      <li>
        <RouterLink to="/">Inicio</RouterLink>
      </li>
      <li>
        <RouterLink to="/posts">Posts</RouterLink>
      </li>
      <li v-if="authStore.userAuth.role === 'admin'">
        <RouterLink to="/users">Usuarios</RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
</script>
