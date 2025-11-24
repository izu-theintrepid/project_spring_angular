import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../model/login-response';

import { ChangeDetectorRef } from '@angular/core'; // 1. Import this
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Import for forms
    RouterLink           // Import for routerLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
          // Add types to response and err
          next: (response: LoginResponse) => {
            console.log('Login successful');
          },
          error: (err: HttpErrorResponse) => {
            // 2. Handle the error specifically
            console.log('Error Status:', err.status);
            if (err.status === 401 || err.status === 403) {
              this.errorMessage = 'Invalid email or password.';
              console.log('Message set to:', this.errorMessage);
            } else {
              this.errorMessage = 'System error. Please try again later.';
              console.log('Message set to:', this.errorMessage);
            }
            console.error('Login Error:', err);
            this.cdr.detectChanges();
          }
        });
      }
    }
  }
