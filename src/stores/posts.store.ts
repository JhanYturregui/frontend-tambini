import { computed, onMounted, ref } from 'vue';
import { defineStore } from 'pinia';

import { useLocalStorage } from '@vueuse/core';
import tambiniApi from '@/modules/api/tambiniApi';
import type { PostInterface } from '@/modules/core/posts/interfaces/post.interface';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref(useLocalStorage<PostInterface[]>('posts', []));
  const token = localStorage.getItem('token');

  const getPosts = async (): Promise<PostInterface[]> => {
    const response = await tambiniApi.get(`/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      posts.value = response.data.data;
    }

    return response.data.data;
  };

  const createPost = async (content: string) => {
    const response = await tambiniApi.post(
      `/posts`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    getPosts();
    return response;
  };

  const updatePost = async (id: number, content: string) => {
    const response = await tambiniApi.put(
      `/posts/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    getPosts();
    return response;
  };

  const deletePost = async (id: number) => {
    const response = await tambiniApi.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getPosts();
    return response;
  };

  onMounted(async () => {
    posts.value = await getPosts();
  });

  return {
    posts,
    postsList: computed(() => [...posts.value]),
    getPosts,
    createPost,
    updatePost,
    deletePost,
  };
});
