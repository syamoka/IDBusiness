import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuth = inject(AuthService).isAuthenticated();
  const router = inject(Router);
  if (isAuth) {
    return true;
  }
  return router.parseUrl('/login');
};
