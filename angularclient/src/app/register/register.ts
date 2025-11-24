// src/app/register/register.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // 1. Import Router
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { ChangeDetectorRef } from '@angular/core'; // 2. Import CDR

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,          // 3. Inject Router
    private cdr: ChangeDetectorRef   // 4. Inject ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    // 5. Clear previous error before new attempt
    this.errorMessage = '';

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: User) => {
          console.log('Registration successful');
          // 6. Navigate to login on success
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {

          // 7. Check for the 400 Bad Request
          if (err.status === 400) {
            // "Email already in use" is inside err.error
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }

          console.error(err);

          // 8. Force the UI to update so the red box appears
          this.cdr.detectChanges();
        }
      });
    }
  }
}
