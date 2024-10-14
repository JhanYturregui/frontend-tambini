import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const isAuthenticatedGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const user = useAuthStore().userAuth;
  localStorage.setItem('lastPath', to.path);
  if (!user) {
    return next({ name: 'login' });
  }
  return next();
};

export default isAuthenticatedGuard;
