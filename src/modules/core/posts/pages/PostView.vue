<template>
  <textarea
    type="text"
    placeholder="Escriba aquí"
    class="textarea textarea-bordered m-5 w-full"
    v-model="content"
  >
  </textarea>

  <button class="btn btn-primary" @click="updatePost">Actualizar</button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { usePostsStore } from '@/stores/posts.store';
import type { PostInterface } from '../interfaces/post.interface';

interface Props {
  id: number;
}
const props = defineProps<Props>();
const postsStore = usePostsStore();
const post = ref<PostInterface | null>();
const content = ref('');
const router = useRouter();

watch(
  () => props.id,
  () => {
    post.value = postsStore.postsList.find((post) => post.id === props.id);
    if (!post.value) {
      router.replace('/posts');
    }
    content.value = post.value!.content;
  },
  { immediate: true },
);

const updatePost = async () => {
  const response = await postsStore.updatePost(props.id, content.value);
  if (response.data.status) {
    router.replace('/posts');
  }
  alert(response.data.message);
};
</script>
