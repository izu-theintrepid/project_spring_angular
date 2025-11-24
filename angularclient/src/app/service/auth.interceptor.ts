
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core'; // <-- Import PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // <-- Import isPlatformBrowser
import { catchError, throwError } from 'rxjs'; // Import RxJS operators
import { Router } from '@angular/router';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router); // Inject Router

  // Check if we are in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('jwt_token');

    // Clone request if token exists
    let clonedReq = req;
    if (token) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // Pass the request, but LISTEN for errors
    return next(clonedReq).pipe(
      catchError((err: HttpErrorResponse) => {

        // If the error is 401 (Unauthorized) or 403 (Forbidden)
        if (err.status === 401 || err.status === 403) {

          // Token is likely invalid or expired.
          // 1. Remove the bad token
          localStorage.removeItem('jwt_token');

          // 2. Redirect to login
          router.navigate(['/login']);
        }

        // Re-throw the error so your components still know it failed
        return throwError(() => err);
      })
    );
  }

  return next(req);
};
