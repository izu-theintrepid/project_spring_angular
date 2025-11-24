// src/app/auth.guard.ts

import { inject, PLATFORM_ID } from '@angular/core'; // 1. Import PLATFORM_ID
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // 2. Import isPlatformBrowser

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); // 3. Inject Platform ID

  // 4. Only check localStorage if we are in the Browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      return true; // Allow access
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  // 5. If on the Server, we allow it to render (or return false depending on preference)
  // Usually, returning true allows the basic HTML to generate without crashing.
  // The client-side guard will run again immediately after and block the user if needed.
  return true;
};
