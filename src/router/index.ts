import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import CoreLayout from '@/modules/core/layouts/CoreLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      beforeEnter: [isAuthenticatedGuard],
      component: CoreLayout,
      children: [
        {
          path: '/',
          name: '',
          component: () => import('@/modules/core/landing/pages/LandingView.vue'),
        },
        {
          path: '/posts',
          name: 'posts',
          component: () => import('@/modules/core/posts/pages/PostsView.vue'),
        },
        {
          path: 'posts/create',
          name: 'create_post',
          component: () => import('@/modules/core/posts/pages/PostCreate.vue'),
        },
        {
          path: 'posts/:id',
          name: 'edit_post',
          props(route) {
            let id = +route.params.id;
            id = isNaN(id) ? 1 : id;
            return { id };
          },
          component: () => import('@/modules/core/posts/pages/PostView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/modules/auth/pages/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/modules/auth/pages/RegisterPage.vue'),
        },
      ],
    },
  ],
});

export default router;
