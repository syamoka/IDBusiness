import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  return next(req)
    .pipe(delay(2000))
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          router.navigate(['/login']);
          localStorage.removeItem('token');
        }
        return throwError(() => error);
      })
    );
};
