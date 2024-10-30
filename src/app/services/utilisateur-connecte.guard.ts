import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const utilisateurConnecteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwt = localStorage.getItem('jwt');

  if (jwt == null) {
    return router.parseUrl('/connexion');
  }

  return true;
};
