import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// 2. Import your new interceptor
import { authInterceptor } from './service/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),//centralised error handling
    provideZonelessChangeDetection(),//more understanding
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),//This makes Angular's HttpClient service available for injection, allowing the application to make HTTP requests to external APIs.
    provideHttpClient(withInterceptors([
          authInterceptor
        ]))//interceptors can be used for injecting tokens like in this case or handling errors
  ]
};
