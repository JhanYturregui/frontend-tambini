<template>
  <textarea
    type="text"
    placeholder="Escriba aquí"
    class="textarea textarea-bordered m-5 w-full"
    v-model="content"
  >
  </textarea>

  <button class="btn btn-primary" @click="createPost">Registrar</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { usePostsStore } from '@/stores/posts.store';

const postsStore = usePostsStore();
const content = ref('');
const router = useRouter();

const createPost = async () => {
  const response = await postsStore.createPost(content.value);
  if (response.data.status) {
    router.replace('/posts');
  }
  alert(response.data.message);
};
</script>
