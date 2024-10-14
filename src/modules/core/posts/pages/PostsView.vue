<template>
  <div class="overflow-x-auto w-full">
    <RouterLink class="btn btn-primary" to="posts/create">Agregar</RouterLink>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Id</th>
          <th>Post</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 2 -->
        <tr class="hover" v-for="post in postsStore.postsList" :key="post.id">
          <th>{{ post.id }}</th>
          <td>{{ post.content }}</td>
          <td>
            <template
              v-if="
                userRole === 'admin' ||
                (userRole === 'standard' && post.user_id == parseInt(userId!))
              "
            >
              <RouterLink class="btn btn-accent" :to="`posts/${post.id}`">Editar</RouterLink>
              <button class="btn btn-neutral" @click="deletePost(post.id)">Eliminar</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts.store';
import { useRouter } from 'vue-router';

const postsStore = usePostsStore();
const userId = localStorage.getItem('id');
const userRole = localStorage.getItem('role');
const router = useRouter();

const deletePost = async (postId: number) => {
  const response = await postsStore.deletePost(postId);
  if (response.data.status) {
    router.replace('/posts');
  }
  alert(response.data.message);
};
</script>
