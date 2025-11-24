// In src/app/app.routes.ts

import { Routes } from '@angular/router';
// Check these import paths, I'm correcting one based on your image
// In src/app/app.routes.ts
import { LoginComponent } from './login/login';       // <-- IMPORT
import { RegisterComponent } from './register/register';
// ... other imports
import { UserListComponent } from './user-list/user-list/user-list'; // <-- No .ts
import { UserFormComponent } from './user-form/user-form';
import { authGuard } from './auth.guard'; //// <-- No .ts
// ... rest of your file

// This is all you need. Just export the 'routes' array.
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent,
    canActivate: [authGuard]},
  { path: 'adduser', component: UserFormComponent,
    canActivate: [authGuard] },
// Redirects
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // <-- Default to login
  //pathmatch full ensures that the exact url matches the root then it sends to login or itll go in the infinte loop
  { path: '**', redirectTo: '/login' }
];
