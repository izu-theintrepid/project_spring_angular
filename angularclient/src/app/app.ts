// In src/app/app.ts

import { Component } from '@angular/core';
 // <-- Import RouterOutlet
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './service/auth-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,                // <-- Add this
  imports: [CommonModule,RouterOutlet, RouterLink, RouterLinkActive],// <-- Add this
  templateUrl: './app.html',
  styleUrl: './app.scss'           // <-- Changed to styleUrl (singular)
})
export class App {                 // <-- Renamed from AppComponent to App
  title: string;

  constructor(public authService: AuthService, private router: Router) {
    this.title = 'Spring Boot - Angular Application';
  }


  logout() {
    this.authService.logout(); // Clears token
    this.router.navigate(['/login']); // Redirects to login
  }
}
