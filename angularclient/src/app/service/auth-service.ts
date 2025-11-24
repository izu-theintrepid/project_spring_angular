import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../model/login-response';
import { User } from '../model/user';
import { isPlatformBrowser } from '@angular/common';
import {environment} from '../../environments/environment';

// You already have this

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * Logs the user in, saves the token, and navigates to the /users page
   */
  public login(loginDto: any): Observable<LoginResponse> {
    // FIX: Clear any old tokens before attempting to log in
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');
    }

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginDto)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt_token', response.token);
          this.router.navigate(['/users']);
        })
      );
  }

  /**
   * Registers a new user and navigates to the login page
   */
  public register(registerDto: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, registerDto)
      .pipe(
        tap(() => {
          // After successful registration, send them to the login page
          this.router.navigate(['/login']);
        })
      );
  }

  /**
   * Logs the user out, clears the token, and navigates to login
   */
  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');
    }
    this.router.navigate(['/login']);
  }

  /**
   * A simple check to see if the user is authenticated
   */
  public isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('jwt_token');
    }
    // If on the server, assume not authenticated to prevent crash
    return false;
  }
}
