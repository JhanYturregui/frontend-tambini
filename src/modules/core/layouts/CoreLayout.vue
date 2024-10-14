<template>
  <main class="flex flex-row">
    <!-- Side menu -->
    <side-menu></side-menu>

    <!-- ViewRouter -->
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import SideMenu from '../common/components/SideMenu.vue';
</script>
