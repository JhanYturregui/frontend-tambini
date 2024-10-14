<template>
  <div>
    <h3 class="text-xl text-primary">Bienvenido, {{ user.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const user = useAuthStore().userAuth;
</script>
